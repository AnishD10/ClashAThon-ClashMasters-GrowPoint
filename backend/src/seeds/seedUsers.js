#!/usr/bin/env node

const path = require("path");
const mongoose = require("mongoose");

require("dotenv").config({
  path: path.resolve(__dirname, "../../.env"),
  override: false,
});

const User = require("../models/User");

const demoUsers = [
  {
    name: "Asha Sharma",
    email: "asha.demo@kyp.local",
    password: "Password123",
    education_level: "+2",
    interests: ["Technology", "Business"],
    profile_completed: true,
    city: "Kathmandu",
    academic_performance: "High",
    budget_preference: 500000,
  },
  {
    name: "Bikram Thapa",
    email: "bikram.demo@kyp.local",
    password: "Password123",
    education_level: "Bachelor's",
    interests: ["Engineering", "Technology"],
    profile_completed: true,
    city: "Pokhara",
    academic_performance: "Medium",
    budget_preference: 800000,
  },
  {
    name: "Nisha Rai",
    email: "nisha.demo@kyp.local",
    password: "Password123",
    education_level: "Bachelor's",
    interests: ["Healthcare", "Education"],
    profile_completed: true,
    city: "Dharan",
    academic_performance: "High",
    budget_preference: 600000,
  },
  {
    name: "Sagar Karki",
    email: "sagar.demo@kyp.local",
    password: "Password123",
    education_level: "+2",
    interests: ["Creative", "Hospitality"],
    profile_completed: true,
    city: "Butwal",
    academic_performance: "Low",
    budget_preference: 300000,
  },
  {
    name: "Priya Lama",
    email: "priya.demo@kyp.local",
    password: "Password123",
    education_level: "Master's",
    interests: ["Finance", "Business"],
    profile_completed: true,
    city: "Kathmandu",
    academic_performance: "High",
    budget_preference: 900000,
  },
];

const seedUsers = async () => {
  try {
    console.log("Connecting to MongoDB...");
    await mongoose.connect(
      process.env.MONGODB_URI || "mongodb://127.0.0.1:27017/knowyourpotential",
      {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      }
    );
    console.log("Connected.");

    const emails = demoUsers.map((user) => user.email);
    await User.deleteMany({ email: { $in: emails } });

    for (const user of demoUsers) {
      const doc = new User(user);
      await doc.save();
      console.log(`✅ Seeded user: ${doc.email}`);
    }

    console.log("\nDemo users seeded successfully.");
    process.exit(0);
  } catch (error) {
    console.error("Seed users failed:", error.message);
    process.exit(1);
  }
};

seedUsers();
