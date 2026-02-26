import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { assessmentAPI, careerAPI } from "../services/api";
import Modal from "../components/Modal";
import CareerCard from "../components/CareerCard";

export default function CareerRecommendationsPage() {
  const navigate = useNavigate();
  const [recommendations, setRecommendations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [selectedCareer, setSelectedCareer] = useState(null);
  const [careerDetail, setCareerDetail] = useState(null);
  const [loadingDetail, setLoadingDetail] = useState(false);
  const [detailError, setDetailError] = useState("");

  useEffect(() => {
    const fetchRecommendations = async () => {
      try {
        const res = await assessmentAPI.getCareerRecommendations();
        setRecommendations(res.data.recommendations || []);
      } catch (err) {
        setError(err.response?.data?.error || "Failed to load career recommendations");
      } finally {
        setLoading(false);
      }
    };

    fetchRecommendations();
  }, []);

  const handleViewDetails = async (career) => {
    setSelectedCareer(career);
    setCareerDetail(null);
    setDetailError("");
    setLoadingDetail(true);
    try {
      const res = await careerAPI.getCareerDetail(career._id);
      setCareerDetail(res.data);
    } catch (err) {
      setDetailError(err.response?.data?.error || "Failed to load career details");
    } finally {
      setLoadingDetail(false);
    }
  };

  const handlePursue = (career) => {
    navigate(`/careers/${career._id}`);
  };

  const handleCloseModal = () => {
    setSelectedCareer(null);
    setCareerDetail(null);
    setDetailError("");
  };

  const formatSalary = (value) =>
    typeof value === "number" ? value.toLocaleString() : "-";

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
      <h1 className="text-4xl font-bold mb-8">Career Recommendations</h1>
      <p className="text-gray-600 mb-6">
        Based on your assessments, here are careers that match your strengths.
      </p>

      {recommendations.length === 0 ? (
        <div className="text-gray-500 text-center py-12">
          No recommendations yet. Complete the assessments to unlock your matches.
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {recommendations.map((career) => (
            <CareerCard
              key={career._id}
              career={career}
              onViewDetails={() => handleViewDetails(career)}
              onPursue={() => handlePursue(career)}
            />
          ))}
        </div>
      )}

      <Modal isOpen={!!selectedCareer} onClose={handleCloseModal}>
        {loadingDetail ? (
          <div className="text-center py-8">Loading career details...</div>
        ) : detailError ? (
          <div className="text-center py-8 text-red-600">{detailError}</div>
        ) : careerDetail ? (
          <div className="space-y-6">
            <div>
              <h3 className="text-2xl font-bold mb-2">{selectedCareer?.title}</h3>
              <p className="text-gray-600">{selectedCareer?.description}</p>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="bg-blue-50 rounded p-4">
                <p className="text-sm text-gray-600 mb-1">Demand</p>
                <p className="text-lg font-semibold">{selectedCareer?.demand_indicator}</p>
              </div>
              <div className="bg-blue-50 rounded p-4">
                <p className="text-sm text-gray-600 mb-1">Risk Level</p>
                <p className="text-lg font-semibold">{selectedCareer?.risk_index}</p>
              </div>
              <div className="bg-blue-50 rounded p-4">
                <p className="text-sm text-gray-600 mb-1">Time to Employment</p>
                <p className="text-lg font-semibold">{selectedCareer?.time_to_employment_months || "-"} months</p>
              </div>
              <div className="bg-blue-50 rounded p-4">
                <p className="text-sm text-gray-600 mb-1">Education Duration</p>
                <p className="text-lg font-semibold">{selectedCareer?.education_duration_years || "-"} years</p>
              </div>
            </div>

            {selectedCareer?.salary_range && (
              <div className="border-t pt-4">
                <h4 className="font-semibold mb-3">Salary Range (NPR)</h4>
                <div className="grid grid-cols-3 gap-3">
                  <div>
                    <p className="text-xs text-gray-600">Entry Level</p>
                    <p className="font-semibold">
                      {formatSalary(selectedCareer.salary_range.entry_min)} - {formatSalary(selectedCareer.salary_range.entry_max)}
                    </p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-600">Mid Level</p>
                    <p className="font-semibold">
                      {formatSalary(selectedCareer.salary_range.mid_min)} - {formatSalary(selectedCareer.salary_range.mid_max)}
                    </p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-600">Senior Level</p>
                    <p className="font-semibold">
                      {formatSalary(selectedCareer.salary_range.senior_min)} - {formatSalary(selectedCareer.salary_range.senior_max)}
                    </p>
                  </div>
                </div>
              </div>
            )}

            <div className="border-t pt-4">
              <h4 className="font-semibold mb-3">Required Skills</h4>
              {careerDetail.skills && careerDetail.skills.length > 0 ? (
                <div className="grid grid-cols-2 gap-3">
                  {careerDetail.skills.map((skill) => (
                    <div key={skill._id} className="bg-gray-50 rounded p-3">
                      <p className="font-semibold text-sm">{skill.name}</p>
                      <p className="text-xs text-gray-500">{skill.difficulty_level}</p>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-gray-500 text-sm">No skills mapped yet</p>
              )}
            </div>

            <div className="border-t pt-4 flex gap-3">
              <button
                className="flex-1 btn-primary"
                onClick={() => {
                  navigate(`/careers/${selectedCareer?._id}`);
                  handleCloseModal();
                }}
              >
                View Full Roadmap
              </button>
              <button
                className="flex-1 btn-secondary"
                onClick={handleCloseModal}
              >
                Close
              </button>
            </div>
          </div>
        ) : (
          <div className="text-center py-8 text-gray-500">No details available.</div>
        )}
      </Modal>
    </div>
  );
}
