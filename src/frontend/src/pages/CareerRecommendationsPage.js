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
  const [filterError, setFilterError] = useState("");
  const [filtering, setFiltering] = useState(false);
  const [filters, setFilters] = useState({
    budget_max: "",
    location: "",
    education_level: "",
    academic_performance: "",
    risk_tolerance: "",
  });
  const [filterMode, setFilterMode] = useState("assessment");
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

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters((prev) => ({ ...prev, [name]: value }));
  };

  const handleApplyFilters = async (e) => {
    e.preventDefault();
    setFilterError("");
    setFiltering(true);

    const payload = {
      budget_max: filters.budget_max ? Number(filters.budget_max) : undefined,
      location: filters.location || undefined,
      education_level: filters.education_level || undefined,
      academic_performance: filters.academic_performance || undefined,
      risk_tolerance: filters.risk_tolerance || undefined,
    };

    try {
      const res = await careerAPI.getConstraintRecommendations(payload);
      setRecommendations(res.data.recommendations || []);
      setFilterMode("constraints");
    } catch (err) {
      setFilterError(err.response?.data?.error || "Failed to apply filters");
    } finally {
      setFiltering(false);
    }
  };

  const handleResetFilters = async () => {
    setFilters({
      budget_max: "",
      location: "",
      education_level: "",
      academic_performance: "",
      risk_tolerance: "",
    });
    setFilterError("");
    setFiltering(true);
    try {
      const res = await assessmentAPI.getCareerRecommendations();
      setRecommendations(res.data.recommendations || []);
      setFilterMode("assessment");
    } catch (err) {
      setFilterError(err.response?.data?.error || "Failed to reset filters");
    } finally {
      setFiltering(false);
    }
  };

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
        {filterMode === "assessment"
          ? "Based on your assessments, here are careers that match your strengths."
          : "Filtered careers based on your constraints."}
      </p>

      <div className="card mb-8">
        <h2 className="text-xl font-bold mb-4">Filter by Constraints</h2>
        <form onSubmit={handleApplyFilters} className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Budget Max (NPR)
            </label>
            <input
              type="number"
              name="budget_max"
              value={filters.budget_max}
              onChange={handleFilterChange}
              className="input-field"
              placeholder="500000"
              min="0"
            />
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Location
            </label>
            <input
              type="text"
              name="location"
              value={filters.location}
              onChange={handleFilterChange}
              className="input-field"
              placeholder="Kathmandu"
            />
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Education Level
            </label>
            <select
              name="education_level"
              value={filters.education_level}
              onChange={handleFilterChange}
              className="input-field"
            >
              <option value="">Any</option>
              <option value="+2">+2</option>
              <option value="Bachelor's">Bachelor's</option>
              <option value="Master's">Master's</option>
              <option value="Other">Other</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Academic Performance
            </label>
            <select
              name="academic_performance"
              value={filters.academic_performance}
              onChange={handleFilterChange}
              className="input-field"
            >
              <option value="">Any</option>
              <option value="High">High</option>
              <option value="Medium">Medium</option>
              <option value="Low">Low</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Risk Tolerance
            </label>
            <select
              name="risk_tolerance"
              value={filters.risk_tolerance}
              onChange={handleFilterChange}
              className="input-field"
            >
              <option value="">Any</option>
              <option value="Low">Low</option>
              <option value="Medium">Medium</option>
              <option value="High">High</option>
            </select>
          </div>
          <div className="flex items-end gap-2">
            <button
              type="submit"
              className="btn-primary"
              disabled={filtering}
            >
              {filtering ? "Applying..." : "Apply Filters"}
            </button>
            <button
              type="button"
              className="btn-secondary"
              onClick={handleResetFilters}
              disabled={filtering}
            >
              Reset
            </button>
          </div>
        </form>
        {filterError && (
          <div className="mt-4 text-sm text-red-600">{filterError}</div>
        )}
      </div>

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

      <Modal
        isOpen={!!selectedCareer}
        onClose={handleCloseModal}
        title="Career Details"
      >
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
                  navigate(`/careers/${selectedCareer?._id}/scope`);
                  handleCloseModal();
                }}
              >
                Scope
              </button>
              <button
                className="flex-1 btn-secondary"
                onClick={() => {
                  navigate(`/careers/${selectedCareer?._id}`);
                  handleCloseModal();
                }}
              >
                Pursue
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
