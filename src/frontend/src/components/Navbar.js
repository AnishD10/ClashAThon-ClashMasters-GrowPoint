import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function Navbar() {
  const { user, logout, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const [openDropdown, setOpenDropdown] = useState(null);

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  const toggleDropdown = (name) => {
    setOpenDropdown(openDropdown === name ? null : name);
  };

  return (
    <nav className="bg-white border-b border-gray-100 px-8 py-4 sticky top-0 z-50">
      <div className="max-w-6xl mx-auto flex justify-between items-center">

        {/* ── Logo ── */}
        <Link to="/" className="flex flex-col leading-tight">
          <span className="text-base font-bold text-[#1a1a1a]">GrowPoint</span>

        </Link>

        {/* ── Nav Links ── */}
        <div className="flex items-center gap-8">
          {isAuthenticated ? (
            <>
              {/* Dashboard — with dropdown */}
              <div className="relative">
                <button
                  onClick={() => toggleDropdown("dashboard")}
                  className="flex items-center gap-1 text-sm text-gray-600 hover:text-[#1a1a1a] font-medium transition-colors"
                >
                  Dashboard
                  <svg className="w-3.5 h-3.5 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={openDropdown === "dashboard" ? "M5 15l7-7 7 7" : "M19 9l-7 7-7-7"} />
                  </svg>
                </button>
                {openDropdown === "dashboard" && (
                  <div className="absolute top-8 left-0 bg-white border border-gray-100 rounded-xl shadow-lg py-2 w-44 z-50">
                    <Link to="/dashboard" onClick={() => setOpenDropdown(null)} className="block px-4 py-2 text-sm text-gray-600 hover:bg-gray-50 hover:text-[#1a1a1a]">Overview</Link>
                    <Link to="/profile" onClick={() => setOpenDropdown(null)} className="block px-4 py-2 text-sm text-gray-600 hover:bg-gray-50 hover:text-[#1a1a1a]">Profile</Link>
                  </div>
                )}
              </div>

              {/* Skills — with dropdown */}
              <div className="relative">
                <button
                  onClick={() => toggleDropdown("skills")}
                  className="flex items-center gap-1 text-sm text-gray-600 hover:text-[#1a1a1a] font-medium transition-colors"
                >
                  Skills
                  <svg className="w-3.5 h-3.5 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={openDropdown === "skills" ? "M5 15l7-7 7 7" : "M19 9l-7 7-7-7"} />
                  </svg>
                </button>
                {openDropdown === "skills" && (
                  <div className="absolute top-8 left-0 bg-white border border-gray-100 rounded-xl shadow-lg py-2 w-44 z-50">
                    <Link to="/skills" onClick={() => setOpenDropdown(null)} className="block px-4 py-2 text-sm text-gray-600 hover:bg-gray-50 hover:text-[#1a1a1a]">Browse Skills</Link>
                    <Link to="/careers" onClick={() => setOpenDropdown(null)} className="block px-4 py-2 text-sm text-gray-600 hover:bg-gray-50 hover:text-[#1a1a1a]">Career Matches</Link>
                  </div>
                )}
              </div>

              {/* Assessments — plain link */}
              <Link
                to="/assessments"
                className="text-sm text-gray-600 hover:text-[#1a1a1a] font-medium transition-colors"
              >
                Assessments
              </Link>

              <Link
                to="/careers"
                className="text-sm text-gray-600 hover:text-[#1a1a1a] font-medium transition-colors"
              >
                Careers
              </Link>

              <Link
                to="/courses"
                className="text-sm text-gray-600 hover:text-[#1a1a1a] font-medium transition-colors"
              >
                Courses
              </Link>

              {/* User name + Logout */}
              <div className="flex items-center gap-3">
                <Link to="/profile" className="text-sm text-gray-500 font-medium">
                  {user?.name}
                </Link>
                <button
                  onClick={handleLogout}
                  className="bg-[#1a1a1a] text-white text-sm font-medium px-5 py-2 rounded-full hover:bg-gray-800 transition-colors"
                >
                  Logout
                </button>
              </div>
            </>
          ) : (
            <>
              <Link to="/login" className="text-sm text-gray-600 hover:text-[#1a1a1a] font-medium transition-colors">
                Login
              </Link>
              <Link
                to="/register"
                className="bg-[#1a1a1a] text-white text-sm font-medium px-5 py-2 rounded-full hover:bg-gray-800 transition-colors"
              >
                Get Started
              </Link>
            </>
          )}
        </div>

      </div>

      {/* Bottom border line — like reference */}
      <div className="max-w-6xl mx-auto mt-4 border-t border-gray-100" />
    </nav>
  );
}