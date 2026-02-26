import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Modal from "../components/Modal";
import { userAPI } from "../services/api";

const INTEREST_OPTIONS = [
  "Technology",
  "Business",
  "Finance",
  "Engineering",
  "Healthcare",
  "Education",
  "Creative",
  "Hospitality",
  "Agriculture",
  "Other",
];

export default function OnboardingInterestsPage() {
  const navigate = useNavigate();
  const [selected, setSelected] = useState([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await userAPI.getUserProfile();
        const interests = res.data?.user?.interests || [];
        if (interests.length > 0) {
          navigate("/");
          return;
        }
      } catch (err) {
        setError(err.response?.data?.error || "Failed to load profile");
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, [navigate]);

  const toggleInterest = (value) => {
    setSelected((prev) =>
      prev.includes(value)
        ? prev.filter((item) => item !== value)
        : [...prev, value]
    );
  };

  const handleSubmit = async () => {
    if (selected.length === 0) {
      setError("Please select at least one interest");
      return;
    }

    setSaving(true);
    setError("");

    try {
      await userAPI.updateUserProfile({
        interests: selected,
        profile_completed: true,
      });
      navigate("/");
    } catch (err) {
      setError(err.response?.data?.error || "Failed to save interests");
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return <div className="page-container text-center py-8">Loading...</div>;
  }

  return (
    <Modal isOpen onClose={() => {}} title="Select Your Interests" showClose={false}>
      <div className="space-y-6">
        <p className="text-gray-600">
          Choose the areas you are curious about. We use this to personalize
          your career recommendations.
        </p>

        {error && (
          <div className="bg-red-100 text-red-700 p-3 rounded">{error}</div>
        )}

        <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
          {INTEREST_OPTIONS.map((option) => (
            <label
              key={option}
              className={`border rounded-lg px-3 py-2 text-sm cursor-pointer flex items-center gap-2 ${
                selected.includes(option)
                  ? "border-blue-600 bg-blue-50"
                  : "border-gray-200"
              }`}
            >
              <input
                type="checkbox"
                checked={selected.includes(option)}
                onChange={() => toggleInterest(option)}
              />
              <span>{option}</span>
            </label>
          ))}
        </div>

        <div className="flex justify-end">
          <button
            className="btn-primary"
            onClick={handleSubmit}
            disabled={saving}
          >
            {saving ? "Saving..." : "Next"}
          </button>
        </div>
      </div>
    </Modal>
  );
}
