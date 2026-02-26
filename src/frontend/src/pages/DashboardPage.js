import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { userAPI, assessmentAPI } from "../services/api";

/**
 * Dashboard Page Component
 * WHY: Central hub showing user's learning progress and recommendations
 * Displays: Overall stats, recent assessments, recommended learning paths
 */

export default function DashboardPage() {
  const { user } = useAuth();
  const [dashboard, setDashboard] = useState(null);
  const [recommendations, setRecommendations] = useState([]);
  const [progressItems, setProgressItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const dashRes = await userAPI.getUserDashboard();
        setDashboard(dashRes.data);

        const recRes = await assessmentAPI.getRecommendations();
        setRecommendations(recRes.data.recommendations);

        const progressRes = await userAPI.getUserProgress();
        setProgressItems(progressRes.data.progress || []);
      } catch (err) {
        setError(err.response?.data?.error || "Failed to load dashboard data");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) return <div className="page-container text-center py-8">Loading...</div>;

  return (
    <div className="page-container">
      {error && (
        <div className="bg-red-100 text-red-700 p-3 rounded mb-6">
          {error}
        </div>
      )}
      <h1 className="text-4xl font-bold mb-8">Welcome, {user?.name}! <i className="fa-solid fa-hand-wave"></i></h1>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
        <div className="card">
          <h3 className="text-gray-500 text-sm mb-2">Total Attempted</h3>
          <p className="text-3xl font-bold text-blue-600">
            {dashboard?.stats.total_attempted || 0}
          </p>
        </div>

        <div className="card">
          <h3 className="text-gray-500 text-sm mb-2">Completed</h3>
          <p className="text-3xl font-bold text-green-600">
            {dashboard?.stats.completed || 0}
          </p>
        </div>

        <div className="card">
          <h3 className="text-gray-500 text-sm mb-2">In Progress</h3>
          <p className="text-3xl font-bold text-yellow-600">
            {dashboard?.stats.in_progress || 0}
          </p>
        </div>

        <div className="card">
          <h3 className="text-gray-500 text-sm mb-2">Average Score</h3>
          <p className="text-3xl font-bold text-purple-600">
            {dashboard?.stats.average_score || 0}%
          </p>
        </div>
      </div>

      {/* Overall Progress */}
      <div className="card mb-8">
        <h2 className="text-2xl font-bold mb-4">Overall Progress</h2>
        <div className="w-full bg-gray-200 rounded-full h-4">
          <div
            className="bg-blue-600 h-4 rounded-full transition-all"
            style={{
              width: `${dashboard?.stats.completion_percentage || 0}%`,
            }}
          ></div>
        </div>
        <p className="text-right mt-2 text-gray-600">
          {dashboard?.stats.completion_percentage || 0}% Complete
        </p>
      </div>

      {/* Recommendations */}
      {recommendations.length > 0 && (
        <div className="mb-8">
          <h2 className="text-2xl font-bold mb-4">
            <i className="fa-solid fa-thumbtack mr-2"></i> Recommended Learning Paths
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {recommendations.slice(0, 4).map((path) => (
              <div key={path._id} className="card">
                <h3 className="text-xl font-bold mb-2">{path.title}</h3>
                <p className="text-gray-600 mb-3">{path.description}</p>
                <div className="flex justify-between items-center">
                  <span className="text-sm bg-blue-100 text-blue-700 px-3 py-1 rounded-full">
                    {path.difficulty_level}
                  </span>
                  <Link to="/skills" className="btn-primary text-sm">
                    Start Learning
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Call to Action */}
      {recommendations.length === 0 && (
        <div className="card text-center py-12 bg-blue-50">
          <h3 className="text-xl font-bold mb-4">
            Take assessments to get personalized recommendations!
          </h3>
          <Link to="/assessments" className="btn-primary">
            Start Assessment
          </Link>
        </div>
      )}

      {progressItems.length > 0 && (
        <div className="card mt-8">
          <h2 className="text-2xl font-bold mb-4">Your Skill Progress</h2>
          <div className="space-y-3">
            {progressItems.slice(0, 5).map((item) => (
              <div key={item._id} className="flex items-center justify-between">
                <div>
                  <p className="font-semibold">
                    {item.skill_id?.name || "Skill"}
                  </p>
                  <p className="text-sm text-gray-500">{item.status}</p>
                </div>
                <div className="w-32 bg-gray-200 rounded-full h-2">
                  <div
                    className="bg-blue-600 h-2 rounded-full"
                    style={{ width: `${item.completion_percentage || 0}%` }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
