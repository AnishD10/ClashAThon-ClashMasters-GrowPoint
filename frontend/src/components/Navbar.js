import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

/**
 * Navigation Bar Component
 * WHY: Persistent header with links and user menu
 * Shows different options for authenticated vs non-authenticated users
 */

export default function Navbar() {
  const { user, logout, isAuthenticated } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <nav className="bg-blue-600 text-white p-4 shadow-md">
      <div className="max-w-6xl mx-auto flex justify-between items-center">
        <Link to="/" className="text-2xl font-bold">
          🎯 Know Your Potential
        </Link>

        <div className="flex gap-6 items-center">
          {isAuthenticated ? (
            <>
              <Link to="/dashboard" className="hover:text-blue-200">
                Dashboard
              </Link>
              <Link to="/skills" className="hover:text-blue-200">
                Skills
              </Link>
              <Link to="/assessments" className="hover:text-blue-200">
                Assessments
              </Link>
              <div className="flex items-center gap-3">
                <span>{user?.name}</span>
                <button
                  onClick={handleLogout}
                  className="bg-red-500 px-4 py-2 rounded hover:bg-red-600"
                >
                  Logout
                </button>
              </div>
            </>
          ) : (
            <>
              <Link to="/login" className="hover:text-blue-200">
                Login
              </Link>
              <Link
                to="/register"
                className="bg-white text-blue-600 px-4 py-2 rounded hover:bg-blue-100"
              >
                Register
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}
