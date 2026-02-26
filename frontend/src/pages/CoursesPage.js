import React, { useEffect, useState } from "react";
import { useLocation, Link } from "react-router-dom";
import { courseAPI } from "../services/api";

export default function CoursesPage() {
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const skillId = params.get("skill");
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const res = await courseAPI.getAllCourses({
          skill_id: skillId || undefined,
        });
        setCourses(res.data.courses || []);
      } catch (err) {
        setError(err.response?.data?.error || "Failed to load courses");
      } finally {
        setLoading(false);
      }
    };

    fetchCourses();
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

  return (
    <div className="page-container">
      <h1 className="text-4xl font-bold mb-6">Courses</h1>
      {courses.length === 0 ? (
        <div className="text-gray-500 text-center py-12">
          {skillId ? "No courses found for this skill yet." : "No courses available yet."}
          <div className="mt-3">
            <Link to="/skills" className="text-blue-600 underline">
              Browse skills
            </Link>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {courses.map((course) => (
            <div key={course._id} className="card">
              <h3 className="text-xl font-bold mb-2">{course.title}</h3>
              <p className="text-gray-600 mb-4">{course.description}</p>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-500">
                  {course.provider || "Provider"}
                </span>
                <button
                  className="btn-primary"
                  onClick={() => {
                    if (course.url) {
                      window.open(course.url, "_blank", "noopener,noreferrer");
                    }
                  }}
                  disabled={!course.url}
                >
                  Start Learning
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
