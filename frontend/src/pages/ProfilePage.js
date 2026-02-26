import React, { useEffect, useState } from "react";
import { userAPI } from "../services/api";

export default function ProfilePage() {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await userAPI.getUserProfile();
        setProfile(res.data.user);
      } catch (err) {
        setError(err.response?.data?.error || "Failed to load profile");
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, []);

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
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <p className="text-sm text-gray-500">Name</p>
            <p className="text-lg font-semibold">{profile.name}</p>
          </div>
          <div>
            <p className="text-sm text-gray-500">Email</p>
            <p className="text-lg font-semibold">{profile.email}</p>
          </div>
          <div>
            <p className="text-sm text-gray-500">Education Level</p>
            <p className="text-lg font-semibold">{profile.education_level}</p>
          </div>
          <div>
            <p className="text-sm text-gray-500">Interests</p>
            <p className="text-lg font-semibold">
              {(profile.interests || []).join(", ") || "-"}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
