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

// Import questionnaires
const questionnaires = require("./questionnaires");
const learningPaths = require("./learningPaths");

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
    if (existingAssessments > 0 || existingLearningPaths > 0) {
      console.log(
        `⚠️  Found ${existingAssessments} assessments and ${existingLearningPaths} learning paths. Clearing database...`
      );
      await Assessment.deleteMany({});
      await LearningPath.deleteMany({});
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

    // Insert learning paths
    console.log(`\n🧭 Seeding ${learningPaths.length} learning path(s)...`);
    for (const learningPath of learningPaths) {
      const path = new LearningPath(learningPath);
      await path.save();
      console.log(`✅ Seeded: "${path.title}" (${path.category})`);
    }

    console.log("\n🎉 Database seeding completed successfully!");
    console.log(
      `📊 Total assessments: ${await Assessment.countDocuments()}`
    );
    console.log(
      `🧭 Total learning paths: ${await LearningPath.countDocuments()}`
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
