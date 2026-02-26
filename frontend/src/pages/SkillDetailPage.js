import React, { useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { courseAPI, skillAPI } from "../services/api";

export default function SkillDetailPage() {
  const { skillId } = useParams();
  const navigate = useNavigate();
  const [skill, setSkill] = useState(null);
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchSkill = async () => {
      try {
        const [skillRes, courseRes] = await Promise.all([
          skillAPI.getSkillById(skillId),
          courseAPI.getAllCourses({ skill_id: skillId }),
        ]);
        setSkill(skillRes.data.skill);
        setCourses(courseRes.data.courses || []);
      } catch (err) {
        setError(err.response?.data?.error || "Failed to load skill details");
      } finally {
        setLoading(false);
      }
    };

    fetchSkill();
  }, [skillId]);

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

  if (!skill) {
    return (
      <div className="page-container text-center py-8 text-gray-500">
        Skill not found.
      </div>
    );
  }

  return (
    <div className="page-container">
      <h1 className="text-4xl font-bold mb-4">{skill.name}</h1>
      <p className="text-gray-600 mb-6">{skill.description}</p>

      <div className="card mb-8">
        <h2 className="text-2xl font-bold mb-4">Courses for this skill</h2>
        {courses.length === 0 ? (
          <div className="text-gray-500">
            <p>No courses available yet.</p>
            <Link to="/courses" className="text-blue-600 underline">
              Browse all courses
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {courses.map((course) => (
              <div key={course._id} className="border rounded-lg p-4">
                <h3 className="font-semibold mb-2">{course.title}</h3>
                <p className="text-sm text-gray-600 mb-3">{course.description}</p>
                <button
                  className="btn-primary"
                  onClick={() => {
                    if (course.url) {
                      window.open(course.url, "_blank", "noopener,noreferrer");
                      return;
                    }
                    navigate(`/courses?skill=${skillId}`);
                  }}
                >
                  Start Learning
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
