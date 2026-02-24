import React, { useEffect, useState } from "react";
import { assessmentAPI } from "../services/api";

export default function AssessmentsPage() {
  const [assessments, setAssessments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedAssessment, setSelectedAssessment] = useState(null);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState([]);

  useEffect(() => {
    const fetchAssessments = async () => {
      try {
        const res = await assessmentAPI.getAllAssessments();
        setAssessments(res.data.assessments);
      } catch (err) {
        console.error("Error fetching assessments:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchAssessments();
  }, []);

  const handleStartAssessment = async (assessmentId) => {
    try {
      const res = await assessmentAPI.startAssessment({
        assessment_id: assessmentId,
      });
      setSelectedAssessment(res.data);
      setAnswers(new Array(res.data.total_questions).fill(null));
      setCurrentQuestion(0);
    } catch (err) {
      console.error("Error starting assessment:", err);
    }
  };

  const handleAnswerSelect = (answer) => {
    const newAnswers = [...answers];
    newAnswers[currentQuestion] = answer;
    setAnswers(newAnswers);
  };

  const handleSubmitAssessment = async () => {
    try {
      const res = await assessmentAPI.submitAssessment({
        assessment_id: selectedAssessment._id,
        progress_id: selectedAssessment.progress_id,
        answers,
      });

      alert(`Score: ${res.data.score}/${100}\nResult: ${res.data.passed ? "PASSED ✅" : "TRY AGAIN 📚"}`);
      setSelectedAssessment(null);
      setAnswers([]);
      setCurrentQuestion(0);
    } catch (err) {
      console.error("Error submitting assessment:", err);
    }
  };

  if (loading) return <div className="page-container text-center py-8">Loading...</div>;

  if (selectedAssessment) {
    const question = selectedAssessment.questions[currentQuestion];

    return (
      <div className="page-container max-w-2xl">
        <div className="card">
          <div className="mb-6">
            <h2 className="text-2xl font-bold mb-2">
              {selectedAssessment.assessment.title}
            </h2>
            <div className="flex justify-between text-gray-600 text-sm">
              <span>
                Question {currentQuestion + 1} of {selectedAssessment.total_questions}
              </span>
              {selectedAssessment.assessment.duration_minutes && (
                <span>⏱️ {selectedAssessment.assessment.duration_minutes} minutes</span>
              )}
            </div>

            <div className="mt-4 w-full bg-gray-200 rounded-full h-2">
              <div
                className="bg-blue-600 h-2 rounded-full transition-all"
                style={{
                  width: `${((currentQuestion + 1) / selectedAssessment.total_questions) * 100}%`,
                }}
              ></div>
            </div>
          </div>

          <div className="mb-6">
            <h3 className="text-xl font-semibold mb-4">{question.question}</h3>

            <div className="space-y-3">
              {question.options.map((option, idx) => (
                <label key={idx} className="flex items-center p-3 border-2 rounded-lg cursor-pointer hover:bg-gray-50"
                  style={{
                    borderColor: answers[currentQuestion] === option ? "#2563eb" : "#e5e7eb",
                  }}
                >
                  <input
                    type="radio"
                    name="answer"
                    value={option}
                    checked={answers[currentQuestion] === option}
                    onChange={() => handleAnswerSelect(option)}
                    className="w-4 h-4"
                  />
                  <span className="ml-3">{option}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Navigation Buttons */}
          <div className="flex justify-between gap-4">
            <button
              onClick={() => setCurrentQuestion(Math.max(0, currentQuestion - 1))}
              disabled={currentQuestion === 0}
              className="btn-secondary disabled:opacity-50"
            >
              ← Previous
            </button>

            {currentQuestion === selectedAssessment.total_questions - 1 ? (
              <button
                onClick={handleSubmitAssessment}
                disabled={answers.some((a) => a === null)}
                className="btn-primary disabled:opacity-50"
              >
                Submit Assessment
              </button>
            ) : (
              <button
                onClick={() => setCurrentQuestion(currentQuestion + 1)}
                disabled={answers[currentQuestion] === null}
                className="btn-primary disabled:opacity-50"
              >
                Next →
              </button>
            )}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="page-container">
      <h1 className="text-4xl font-bold mb-8">📝 Skill Assessments</h1>

      {assessments.length === 0 ? (
        <div className="text-center py-12 text-gray-500">
          No assessments available yet.
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {assessments.map((assessment) => (
            <div key={assessment._id} className="card">
              <h3 className="text-xl font-bold mb-2">{assessment.title}</h3>
              <p className="text-gray-600 mb-4">
                {assessment.questions.length} questions
              </p>

              {assessment.duration_minutes && (
                <p className="text-sm text-gray-500 mb-4">
                  ⏱️ Duration: {assessment.duration_minutes} minutes
                </p>
              )}

              <div className="flex items-center justify-between">
                <span className="text-sm bg-green-100 text-green-700 px-3 py-1 rounded-full">
                  Pass Score: {assessment.passing_score}%
                </span>
                <button
                  onClick={() => handleStartAssessment(assessment._id)}
                  className="btn-primary"
                >
                  Start
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
