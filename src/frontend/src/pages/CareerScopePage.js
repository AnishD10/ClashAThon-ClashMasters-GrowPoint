import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { careerAPI } from "../services/api";

export default function CareerScopePage() {
  const { careerId } = useParams();
  const [career, setCareer] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchCareer = async () => {
      try {
        const res = await careerAPI.getCareerById(careerId);
        setCareer(res.data.career);
      } catch (err) {
        setError(err.response?.data?.error || "Failed to load career scope");
      } finally {
        setLoading(false);
      }
    };

    fetchCareer();
  }, [careerId]);

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

  if (!career) {
    return (
      <div className="page-container text-center py-8 text-gray-500">
        Career not found.
      </div>
    );
  }

  return (
    <div className="page-container">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-4xl font-bold">{career.title}</h1>
        <Link to={`/careers/${career._id}`} className="btn-primary">
          Pursue This Career
        </Link>
      </div>
      <p className="text-gray-600 mb-8">{career.description}</p>

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
        <h2 className="text-2xl font-bold mb-4">Salary Range (NPR)</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <p className="text-sm text-gray-500">Entry Level</p>
            <p className="font-semibold">
              {formatSalary(career.salary_range?.entry_min)} - {formatSalary(career.salary_range?.entry_max)}
            </p>
          </div>
          <div>
            <p className="text-sm text-gray-500">Mid Level</p>
            <p className="font-semibold">
              {formatSalary(career.salary_range?.mid_min)} - {formatSalary(career.salary_range?.mid_max)}
            </p>
          </div>
          <div>
            <p className="text-sm text-gray-500">Senior Level</p>
            <p className="font-semibold">
              {formatSalary(career.salary_range?.senior_min)} - {formatSalary(career.salary_range?.senior_max)}
            </p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
        <div className="card">
          <h2 className="text-xl font-bold mb-3">Education Details</h2>
          <p className="text-sm text-gray-600 mb-2">
            Duration: {career.education_duration_years || "-"} years
          </p>
          <p className="text-sm text-gray-600">
            Cost Range: {formatSalary(career.education_cost_range?.min)} - {formatSalary(career.education_cost_range?.max)}
          </p>
        </div>
        <div className="card">
          <h2 className="text-xl font-bold mb-3">Qualifications</h2>
          {career.qualification_required?.length ? (
            <ul className="text-sm text-gray-600 list-disc list-inside">
              {career.qualification_required.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          ) : (
            <p className="text-sm text-gray-500">Not specified yet.</p>
          )}
        </div>
      </div>

      <div className="card">
        <h2 className="text-xl font-bold mb-3">Locations</h2>
        {career.locations?.length ? (
          <div className="flex flex-wrap gap-2">
            {career.locations.map((location) => (
              <span
                key={location}
                className="text-sm bg-gray-100 px-3 py-1 rounded-full"
              >
                {location}
              </span>
            ))}
          </div>
        ) : (
          <p className="text-sm text-gray-500">No location data yet.</p>
        )}
      </div>
    </div>
  );
}
