#!/usr/bin/env node

/**
 * Database Seeding Script
 * Populates the Assessment collection with psychometric questionnaires
 *
 * Usage: node seedDb.js
 * Environment: Make sure .env file is configured with MongoDB connection string
 */

const path = require("path");
const mongoose = require("mongoose");

// Load environment variables
require("dotenv").config({
  path: path.resolve(__dirname, "../../.env"),
  override: false,
});

// Import models
const Assessment = require("../models/Assessment");
const LearningPath = require("../models/LearningPath");
const CareerProfile = require("../models/CareerProfile");
const Skill = require("../models/Skill");
const Course = require("../models/Course");

// Import questionnaires
const questionnaires = require("./questionnaires");
const learningPaths = require("./learningPaths");
const careerProfiles = require("./careerProfiles");
const skills = require("./skills");
const courses = require("./courses");

const redactMongoUri = (uri) =>
  uri.replace(/(mongodb(?:\+srv)?:\/\/[^:]+:)([^@]+)@/i, "$1***@");

const logMongoTarget = (uri) => {
  try {
    const parsed = new URL(uri);
    const dbName = parsed.pathname ? parsed.pathname.replace("/", "") : "";
    console.log(`🔍 MongoDB Host: ${parsed.hostname}`);
    if (dbName) {
      console.log(`🔍 MongoDB Database: ${dbName}`);
    }
  } catch {
    // Ignore parsing errors for non-standard URI forms.
  }
};

const seedDatabase = async () => {
  try {
    // Connect to MongoDB
    console.log("🔗 Connecting to MongoDB...");
    const mongoUri =
      process.env.MONGODB_URI ||
      "mongodb://127.0.0.1:27017/knowyourpotential";
    const hasCredentials = /mongodb(?:\+srv)?:\/\/[^@]+@/i.test(mongoUri);
    console.log(`🔗 MongoDB URI: ${redactMongoUri(mongoUri)}`);
    logMongoTarget(mongoUri);
    if (!hasCredentials) {
      console.warn(
        "⚠️  MongoDB URI has no credentials. If auth is enabled, include username/password and authSource."
      );
    }

    await mongoose.connect(mongoUri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("✅ Connected to MongoDB");

    // Clear existing data
    const existingAssessments = await Assessment.countDocuments();
    const existingLearningPaths = await LearningPath.countDocuments();
    const existingCareerProfiles = await CareerProfile.countDocuments();
    const existingSkills = await Skill.countDocuments();
    const existingCourses = await Course.countDocuments();
    if (
      existingAssessments > 0 ||
      existingLearningPaths > 0 ||
      existingCareerProfiles > 0 ||
      existingSkills > 0 ||
      existingCourses > 0
    ) {
      console.log(
        `⚠️  Found ${existingAssessments} assessments, ${existingLearningPaths} learning paths, ${existingCareerProfiles} career profiles, ${existingSkills} skills, and ${existingCourses} courses. Clearing database...`
      );
      await Assessment.deleteMany({});
      await LearningPath.deleteMany({});
      await CareerProfile.deleteMany({});
      await Skill.deleteMany({});
      await Course.deleteMany({});
      console.log("🗑️  Database cleared");
    }

    // Insert questionnaires
    console.log(`\n📝 Seeding ${questionnaires.length} assessment(s)...`);

    for (const questionnaire of questionnaires) {
      const assessment = new Assessment(questionnaire);
      await assessment.save();
      console.log(`✅ Seeded: "${assessment.title}" (${assessment.category})`);
      console.log(`   - Questions: ${assessment.questions.length}`);
      console.log(`   - Duration: ${assessment.duration_minutes} minutes`);
    }

    // Insert skills
    console.log(`\n🧠 Seeding ${skills.length} skill(s)...`);
    const skillDocs = [];
    for (const skill of skills) {
      const doc = new Skill(skill);
      await doc.save();
      skillDocs.push(doc);
      console.log(`✅ Seeded: "${doc.name}" (${doc.category})`);
    }

    const skillByName = skillDocs.reduce((acc, doc) => {
      acc[doc.name] = doc._id;
      return acc;
    }, {});

    // Insert learning paths
    console.log(`\n🧭 Seeding ${learningPaths.length} learning path(s)...`);
    for (const learningPath of learningPaths) {
      const skillNames = learningPath.skill_names || [];
      const resolvedSkills = skillNames
        .map((name, index) => {
          const skillId = skillByName[name];
          if (!skillId) {
            console.warn(`⚠️  Missing skill for learning path: ${name}`);
            return null;
          }
          return {
            skill_id: skillId,
            order: index + 1,
            is_mandatory: true,
          };
        })
        .filter(Boolean);

      const payload = {
        ...learningPath,
        skills: resolvedSkills,
      };

      const path = new LearningPath(payload);
      await path.save();
      console.log(`✅ Seeded: "${path.title}" (${path.category})`);
    }

    // Insert career profiles
    console.log(`\n💼 Seeding ${careerProfiles.length} career profile(s)...`);
    for (const career of careerProfiles) {
      const profile = new CareerProfile(career);
      await profile.save();
      console.log(`✅ Seeded: "${profile.title}" (${profile.category})`);
    }

    // Insert courses
    console.log(`\n📚 Seeding ${courses.length} course(s)...`);
    for (const course of courses) {
      const skillIds = (course.skill_names || [])
        .map((name) => skillByName[name])
        .filter(Boolean);

      if (skillIds.length === 0) {
        console.warn(`⚠️  Skipping course without valid skills: ${course.title}`);
        continue;
      }

      const payload = {
        title: course.title,
        description: course.description,
        provider: course.provider,
        url: course.url,
        duration_hours: course.duration_hours,
        difficulty_level: course.difficulty_level,
        language: course.language,
        price: course.price,
        is_free: course.is_free,
        thumbnail_url: course.thumbnail_url,
        skills: skillIds,
        tags: course.tags,
        is_active: true,
      };

      const doc = new Course(payload);
      await doc.save();
      console.log(`✅ Seeded: "${doc.title}" (${doc.provider || "Provider"})`);
    }

    console.log("\n🎉 Database seeding completed successfully!");
    console.log(
      `📊 Total assessments: ${await Assessment.countDocuments()}`
    );
    console.log(
      `🧭 Total learning paths: ${await LearningPath.countDocuments()}`
    );
    console.log(
      `💼 Total career profiles: ${await CareerProfile.countDocuments()}`
    );
    console.log(
      `🧠 Total skills: ${await Skill.countDocuments()}`
    );
    console.log(
      `📚 Total courses: ${await Course.countDocuments()}`
    );

    // Display summary
    const assessments = await Assessment.find();
    console.log("\n📋 Assessment Summary:");
    assessments.forEach((assessment) => {
      console.log(`\n  ${assessment.title}`);
      console.log(`  Category: ${assessment.category}`);
      console.log(`  Questions: ${assessment.questions.length}`);
      console.log(`  Duration: ${assessment.duration_minutes} minutes`);
    });

    const paths = await LearningPath.find();
    console.log("\n🧭 Learning Path Summary:");
    paths.forEach((path) => {
      console.log(`\n  ${path.title}`);
      console.log(`  Category: ${path.category}`);
      console.log(`  Difficulty: ${path.difficulty_level}`);
      console.log(`  Hours: ${path.total_hours}`);
    });

    const profiles = await CareerProfile.find();
    console.log("\n💼 Career Profile Summary:");
    profiles.forEach((profile) => {
      console.log(`\n  ${profile.title}`);
      console.log(`  Category: ${profile.category}`);
      console.log(`  Demand: ${profile.demand_indicator}`);
      console.log(`  Risk: ${profile.risk_index}`);
      if (profile.salary_range && profile.salary_range.entry_min) {
        console.log(
          `  Entry Salary: ${profile.salary_range.entry_min}-${profile.salary_range.entry_max} ${profile.salary_range.currency}`
        );
      }
    });

    const skillList = await Skill.find();
    console.log("\n🧠 Skill Summary:");
    skillList.forEach((skill) => {
      console.log(`\n  ${skill.name}`);
      console.log(`  Category: ${skill.category}`);
      console.log(`  Difficulty: ${skill.difficulty_level}`);
    });

    const courseList = await Course.find().populate("skills");
    console.log("\n📚 Course Summary:");
    courseList.forEach((course) => {
      const skillNames = (course.skills || []).map((skill) => skill.name).join(", ");
      console.log(`\n  ${course.title}`);
      console.log(`  Provider: ${course.provider || "Provider"}`);
      console.log(`  Skills: ${skillNames || "None"}`);
    });

    process.exit(0);
  } catch (error) {
    if (error && error.codeName === "Unauthorized") {
      console.error(
        "❌ MongoDB authentication failed. Ensure MONGODB_URI includes username, password, and authSource=admin when using the Docker root user."
      );
    }
    console.error("❌ Error during seeding:", error);
    process.exit(1);
  }
};

// Run the seeding function
seedDatabase();
