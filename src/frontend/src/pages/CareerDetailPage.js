import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { careerAPI } from "../services/api";

export default function CareerDetailPage() {
  const navigate = useNavigate();
  const { careerId } = useParams();
  const [career, setCareer] = useState(null);
  const [skills, setSkills] = useState([]);
  const [learningPaths, setLearningPaths] = useState([]);
  const [missingSkills, setMissingSkills] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchCareer = async () => {
      try {
        const res = await careerAPI.getCareerDetail(careerId);
        setCareer(res.data.career);
        setSkills(res.data.skills || []);
        setLearningPaths(res.data.learning_paths || []);
        setMissingSkills(res.data.missing_skills || []);
      } catch (err) {
        setError(err.response?.data?.error || "Failed to load career details");
      } finally {
        setLoading(false);
      }
    };

    fetchCareer();
  }, [careerId]);

  if (loading) {
    return <div className="page-container text-center py-8">Loading...</div>;
  }

  if (error) {
    return (
      <div className="page-container text-center py-8 text-red-600">
        {error}
      </div>
    );
  }

  if (!career) {
    return (
      <div className="page-container text-center py-8 text-gray-500">
        Career not found.
      </div>
    );
  }

  return (
    <div className="page-container">
      <h1 className="text-4xl font-bold mb-4">{career.title}</h1>
      <p className="text-gray-600 mb-6">{career.description}</p>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        <div className="card">
          <p className="text-sm text-gray-500">Demand</p>
          <p className="text-xl font-semibold">{career.demand_indicator}</p>
        </div>
        <div className="card">
          <p className="text-sm text-gray-500">Risk</p>
          <p className="text-xl font-semibold">{career.risk_index}</p>
        </div>
        <div className="card">
          <p className="text-sm text-gray-500">Time to Employment</p>
          <p className="text-xl font-semibold">
            {career.time_to_employment_months || "-"} months
          </p>
        </div>
      </div>

      <div className="card mb-8">
        <h2 className="text-2xl font-bold mb-4">Required Skills</h2>
        {skills.length === 0 ? (
          <p className="text-gray-500">No skills mapped yet.</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {skills.map((skill) => (
              <div key={skill._id} className="border rounded-lg p-4">
                <h3 className="font-semibold mb-2">{skill.name}</h3>
                <p className="text-sm text-gray-600 mb-3">{skill.description}</p>
                <button
                  className="btn-primary text-sm"
                  onClick={() => navigate(`/skills/${skill._id}`)}
                >
                  Learn
                </button>
              </div>
            ))}
          </div>
        )}
        {missingSkills.length > 0 && (
          <div className="mt-4 text-sm text-amber-600">
            Missing skill data for: {missingSkills.join(", ")}
          </div>
        )}
      </div>

      <div className="card">
        <h2 className="text-2xl font-bold mb-4">Career Roadmap</h2>
        {learningPaths.length === 0 ? (
          <p className="text-gray-500">No roadmap available yet.</p>
        ) : (
          <div className="space-y-4">
            {learningPaths.map((path) => (
              <div key={path._id} className="border rounded-lg p-4">
                <h3 className="font-semibold mb-2">{path.title}</h3>
                <p className="text-sm text-gray-600">{path.description}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
