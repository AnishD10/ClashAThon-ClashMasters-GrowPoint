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

// Import questionnaires
const questionnaires = require("./questionnaires");

const seedDatabase = async () => {
  try {
    // Connect to MongoDB
    console.log("🔗 Connecting to MongoDB...");
    await mongoose.connect(process.env.MONGODB_URI || "mongodb://127.0.0.1:27017/knowyourpotential", {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("✅ Connected to MongoDB");

    // Check if assessments already exist
    const existingCount = await Assessment.countDocuments();
    if (existingCount > 0) {
      console.log(
        `⚠️  Found ${existingCount} existing assessments. Clearing database...`
      );
      await Assessment.deleteMany({});
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

    console.log("\n🎉 Database seeding completed successfully!");
    console.log(
      `📊 Total assessments: ${await Assessment.countDocuments()}`
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

    process.exit(0);
  } catch (error) {
    console.error("❌ Error during seeding:", error);
    process.exit(1);
  }
};

// Run the seeding function
seedDatabase();
