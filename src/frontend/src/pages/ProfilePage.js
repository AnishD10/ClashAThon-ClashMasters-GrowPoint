import React, { useEffect, useState } from "react";
import { userAPI } from "../services/api";

export default function ProfilePage() {
  const [profile, setProfile] = useState(null);
  const [formState, setFormState] = useState({
    name: "",
    education_level: "+2",
    interests: "",
    city: "",
    bio: "",
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [saving, setSaving] = useState(false);
  const [success, setSuccess] = useState("");

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await userAPI.getUserProfile();
        setProfile(res.data.user);
        setFormState({
          name: res.data.user.name || "",
          education_level: res.data.user.education_level || "+2",
          interests: (res.data.user.interests || []).join(", "),
          city: res.data.user.city || "",
          bio: res.data.user.bio || "",
        });
      } catch (err) {
        setError(err.response?.data?.error || "Failed to load profile");
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormState((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    setSuccess("");
    setError("");

    try {
      const payload = {
        name: formState.name,
        education_level: formState.education_level,
        interests: formState.interests
          .split(",")
          .map((item) => item.trim())
          .filter(Boolean),
        city: formState.city,
        bio: formState.bio,
        profile_completed: true,
      };

      const res = await userAPI.updateUserProfile(payload);
      setProfile(res.data.user);
      setSuccess("Profile updated successfully.");
    } catch (err) {
      setError(err.response?.data?.error || "Failed to update profile");
    } finally {
      setSaving(false);
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

  if (!profile) {
    return (
      <div className="page-container text-center py-8 text-gray-500">
        Profile not found.
      </div>
    );
  }

  return (
    <div className="page-container">
      <h1 className="text-4xl font-bold mb-6">My Profile</h1>
      <div className="card">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          <div>
            <p className="text-sm text-gray-500">Email</p>
            <p className="text-lg font-semibold">{profile.email}</p>
          </div>
          <div>
            <p className="text-sm text-gray-500">Profile Status</p>
            <p className="text-lg font-semibold">
              {profile.profile_completed ? "Complete" : "Incomplete"}
            </p>
          </div>
        </div>

        {success && (
          <div className="bg-green-100 text-green-700 p-3 rounded mb-4">
            {success}
          </div>
        )}
        {error && (
          <div className="bg-red-100 text-red-700 p-3 rounded mb-4">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Full Name
            </label>
            <input
              type="text"
              name="name"
              value={formState.name}
              onChange={handleChange}
              className="input-field"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Education Level
            </label>
            <select
              name="education_level"
              value={formState.education_level}
              onChange={handleChange}
              className="input-field"
            >
              <option value="+2">+2</option>
              <option value="Bachelor's">Bachelor's</option>
              <option value="Master's">Master's</option>
              <option value="Other">Other</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Interests (comma separated)
            </label>
            <input
              type="text"
              name="interests"
              value={formState.interests}
              onChange={handleChange}
              className="input-field"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              City
            </label>
            <input
              type="text"
              name="city"
              value={formState.city}
              onChange={handleChange}
              className="input-field"
            />
          </div>

          <div className="md:col-span-2">
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Short Bio
            </label>
            <textarea
              name="bio"
              value={formState.bio}
              onChange={handleChange}
              className="input-field min-h-[120px]"
            />
          </div>

          <div className="md:col-span-2">
            <button type="submit" className="btn-primary" disabled={saving}>
              {saving ? "Saving..." : "Save Profile"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
