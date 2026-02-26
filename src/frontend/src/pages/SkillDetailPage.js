import React, { useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { courseAPI, skillAPI } from "../services/api";
import Modal from "../components/Modal";

export default function SkillDetailPage() {
  const { skillId } = useParams();
  const navigate = useNavigate();
  const [skill, setSkill] = useState(null);
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [selectedCourse, setSelectedCourse] = useState(null);

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
                  className="btn-secondary"
                  onClick={() => setSelectedCourse(course)}
                >
                  View Details
                </button>
              </div>
            ))}
          </div>
        )}
      </div>

      <Modal
        isOpen={!!selectedCourse}
        onClose={() => setSelectedCourse(null)}
        title={selectedCourse?.title || "Course Details"}
      >
        {selectedCourse && (
          <div className="space-y-4">
            <p className="text-gray-600">{selectedCourse.description}</p>
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <p className="text-gray-500">Provider</p>
                <p className="font-semibold">
                  {selectedCourse.provider || "-"}
                </p>
              </div>
              <div>
                <p className="text-gray-500">Difficulty</p>
                <p className="font-semibold">
                  {selectedCourse.difficulty_level || "-"}
                </p>
              </div>
              <div>
                <p className="text-gray-500">Duration</p>
                <p className="font-semibold">
                  {selectedCourse.duration_hours
                    ? `${selectedCourse.duration_hours} hours`
                    : "-"}
                </p>
              </div>
              <div>
                <p className="text-gray-500">Price</p>
                <p className="font-semibold">
                  {selectedCourse.is_free
                    ? "Free"
                    : selectedCourse.price || "-"}
                </p>
              </div>
            </div>

            {!selectedCourse.url && (
              <p className="text-sm text-gray-500">
                This course does not have a direct link yet. Browse all courses
                for more options.
              </p>
            )}

            <div className="flex gap-3">
              <button
                className="btn-primary"
                onClick={() => {
                  if (selectedCourse.url) {
                    window.open(selectedCourse.url, "_blank", "noopener,noreferrer");
                    return;
                  }
                  navigate(`/courses?skill=${skillId}`);
                }}
              >
                Start Learning
              </button>
              <button
                className="btn-secondary"
                onClick={() => setSelectedCourse(null)}
              >
                Close
              </button>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
}
