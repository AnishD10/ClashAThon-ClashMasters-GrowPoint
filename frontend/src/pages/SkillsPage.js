import React, { useEffect, useState } from "react";
import { skillAPI } from "../services/api";

/**
 * Skills Page Component
 * WHY: Browse and explore all available skills
 * Users can filter by category and difficulty level
 */

export default function SkillsPage() {
  const [skills, setSkills] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedDifficulty, setSelectedDifficulty] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const catRes = await skillAPI.getCategories();
        setCategories(catRes.data.categories);

        const skillRes = await skillAPI.getAllSkills({
          category: selectedCategory,
          difficulty_level: selectedDifficulty,
        });
        setSkills(skillRes.data.skills);
      } catch (err) {
        console.error("Error fetching skills:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [selectedCategory, selectedDifficulty]);

  if (loading) return <div className="page-container text-center py-8">Loading...</div>;

  return (
    <div className="page-container">
      <h1 className="text-4xl font-bold mb-8">🎯 Explore Skills</h1>

      {/* Filters */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
        <div>
          <label className="block text-gray-700 font-semibold mb-2">
            Category
          </label>
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="input-field"
          >
            <option value="">All Categories</option>
            {categories.map((cat) => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-gray-700 font-semibold mb-2">
            Difficulty
          </label>
          <select
            value={selectedDifficulty}
            onChange={(e) => setSelectedDifficulty(e.target.value)}
            className="input-field"
          >
            <option value="">All Levels</option>
            <option value="Beginner">Beginner</option>
            <option value="Intermediate">Intermediate</option>
            <option value="Advanced">Advanced</option>
          </select>
        </div>
      </div>

      {/* Skills Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {skills.map((skill) => (
          <div key={skill._id} className="card">
            <h3 className="text-xl font-bold mb-2">{skill.name}</h3>
            <p className="text-gray-600 text-sm mb-3">{skill.description}</p>

            <div className="mb-4 space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-gray-500">Category:</span>
                <span className="font-semibold">{skill.category}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-500">Level:</span>
                <span className="font-semibold">{skill.difficulty_level}</span>
              </div>
              {skill.learning_time_hours && (
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500">Learning Time:</span>
                  <span className="font-semibold">
                    {skill.learning_time_hours} hours
                  </span>
                </div>
              )}
            </div>

            <div className="flex gap-2">
              {skill.trending && (
                <span className="text-xs bg-red-100 text-red-700 px-2 py-1 rounded-full">
                  🔥 Trending
                </span>
              )}
              <span className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded-full">
                {skill.job_market_demand} Demand
              </span>
            </div>

            <button className="btn-primary w-full mt-4">Learn Now</button>
          </div>
        ))}
      </div>

      {skills.length === 0 && (
        <div className="text-center py-12 text-gray-500">
          No skills found. Try adjusting filters.
        </div>
      )}
    </div>
  );
}
