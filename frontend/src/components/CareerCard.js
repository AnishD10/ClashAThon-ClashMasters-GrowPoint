import React from "react";

export default function CareerCard({ career, onViewDetails, onPursue }) {
  return (
    <div className="card hover:shadow-lg transition-shadow duration-200 cursor-pointer">
      <div className="mb-4">
        <h3 className="text-xl font-bold text-gray-900 mb-2">{career.title}</h3>
        <p className="text-sm text-gray-600">{career.category}</p>
      </div>

      <p className="text-gray-600 text-sm mb-4 line-clamp-2">{career.description}</p>

      <div className="grid grid-cols-3 gap-3 mb-4">
        <div className="bg-gray-50 rounded p-3 text-center">
          <p className="text-xs text-gray-500 mb-1">Demand</p>
          <p className="text-sm font-semibold text-gray-800">{career.demand_indicator}</p>
        </div>
        <div className="bg-gray-50 rounded p-3 text-center">
          <p className="text-xs text-gray-500 mb-1">Risk</p>
          <p className="text-sm font-semibold text-gray-800">{career.risk_index}</p>
        </div>
        <div className="bg-gray-50 rounded p-3 text-center">
          <p className="text-xs text-gray-500 mb-1">Time</p>
          <p className="text-sm font-semibold text-gray-800">
            {career.time_to_employment_months || "-"} mo
          </p>
        </div>
      </div>

      {career.salary_range && (
        <div className="mb-4 text-sm text-gray-600">
          <p className="font-semibold mb-1">Entry Salary</p>
          <p>
            NPR {career.salary_range.entry_min?.toLocaleString()} - {career.salary_range.entry_max?.toLocaleString()}
          </p>
        </div>
      )}

      <div className="flex gap-2">
        <button
          onClick={onViewDetails}
          className="flex-1 btn-primary text-sm"
        >
          View Scope
        </button>
        <button
          onClick={onPursue}
          className="flex-1 btn-secondary text-sm"
        >
          Pursue
        </button>
      </div>
    </div>
  );
}
