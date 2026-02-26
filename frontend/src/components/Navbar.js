import React, { useState, useRef, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function Navbar() {
  const { user, logout, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const [openDropdown, setOpenDropdown] = useState(null);
  const [profileOpen, setProfileOpen] = useState(false);
  const [visible, setVisible] = useState(true);
  const profileRef = useRef(null);
  const lastScrollY = useRef(0);

  const handleLogout = () => {
    logout();
    navigate("/");
    setProfileOpen(false);
  };

  const toggleDropdown = (name) => {
    setOpenDropdown(openDropdown === name ? null : name);
  };

  // Hide on scroll down, show on scroll up
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      if (currentScrollY < lastScrollY.current || currentScrollY < 10) {
        setVisible(true);
      } else {
        setVisible(false);
      }
      lastScrollY.current = currentScrollY;
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close profile dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(e) {
      if (profileRef.current && !profileRef.current.contains(e.target)) {
        setProfileOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Get initials from user name
  const getInitials = (name) => {
    if (!name) return "U";
    return name.split(" ").map((n) => n[0]).join("").toUpperCase().slice(0, 2);
  };

  return (
    <nav className={`bg-white border-b border-gray-100 px-4 py-4 sticky top-0 z-50 transition-transform duration-300 ${
      visible ? "translate-y-0" : "-translate-y-full"
    }`}>
      <div className="max-w-7xl mx-auto flex items-center justify-between">

        {/* ── LEFT: Logo ── */}
        <Link to="/" className="text-base font-bold text-[#1a1a1a] flex-shrink-0">
          Know Your Potential
        </Link>

        {/* ── MIDDLE: Nav Links (authenticated only) ── */}
        {isAuthenticated && (
          <div className="flex items-center gap-10 absolute left-1/2 -translate-x-1/2">

            {/* Dashboard dropdown */}
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
                <div className="absolute top-9 left-0 bg-white border border-gray-100 rounded-xl shadow-lg py-2 w-44 z-50">
                  <Link to="/dashboard" onClick={() => setOpenDropdown(null)} className="block px-4 py-2 text-sm text-gray-600 hover:bg-gray-50 hover:text-[#1a1a1a]">Overview</Link>
                  <Link to="/dashboard/progress" onClick={() => setOpenDropdown(null)} className="block px-4 py-2 text-sm text-gray-600 hover:bg-gray-50 hover:text-[#1a1a1a]">My Progress</Link>
                </div>
              )}
            </div>

            {/* Skills dropdown */}
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
                <div className="absolute top-9 left-0 bg-white border border-gray-100 rounded-xl shadow-lg py-2 w-44 z-50">
                  <Link to="/skills" onClick={() => setOpenDropdown(null)} className="block px-4 py-2 text-sm text-gray-600 hover:bg-gray-50 hover:text-[#1a1a1a]">Browse Skills</Link>
                  <Link to="/skills/recommended" onClick={() => setOpenDropdown(null)} className="block px-4 py-2 text-sm text-gray-600 hover:bg-gray-50 hover:text-[#1a1a1a]">Recommended</Link>
                </div>
              )}
            </div>

            {/* Assessments */}
            <Link
              to="/assessments"
              className="text-sm text-gray-600 hover:text-[#1a1a1a] font-medium transition-colors"
            >
              Assessments
            </Link>

          </div>
        )}

        {/* ── RIGHT: Auth ── */}
        <div className="flex items-center gap-4 flex-shrink-0">
          {isAuthenticated ? (
            <div className="relative" ref={profileRef}>
              <button
                onClick={() => setProfileOpen(!profileOpen)}
                className="w-9 h-9 rounded-full bg-[#0f1f18] text-white text-sm font-bold flex items-center justify-center hover:bg-[#2d4a3e] transition-colors"
              >
                {getInitials(user?.name)}
              </button>

              {profileOpen && (
                <div className="absolute right-0 top-12 bg-white border border-gray-100 rounded-2xl shadow-xl py-3 w-56 z-50">

                  {/* User info header */}
                  <div className="px-4 pb-3 border-b border-gray-100 flex items-center gap-3">
                    <div className="w-9 h-9 rounded-full bg-[#0f1f18] text-white text-sm font-bold flex items-center justify-center flex-shrink-0">
                      {getInitials(user?.name)}
                    </div>
                    <div className="min-w-0">
                      <p className="text-sm font-semibold text-[#1a1a1a] truncate">{user?.name}</p>
                      <p className="text-xs text-gray-400 truncate">{user?.email}</p>
                    </div>
                  </div>

                  {/* Menu items */}
                  <div className="pt-2">
                    {[
                      { icon: "📊", label: "My Dashboard", to: "/dashboard" },
                      { icon: "🎯", label: "My Assessments", to: "/assessments" },
                      { icon: "📚", label: "My Learning Path", to: "/skills" },
                    ].map((item) => (
                      <Link
                        key={item.label}
                        to={item.to}
                        onClick={() => setProfileOpen(false)}
                        className="flex items-center justify-between px-4 py-2.5 text-sm text-gray-600 hover:bg-gray-50 hover:text-[#1a1a1a] transition-colors group"
                      >
                        <div className="flex items-center gap-3">
                          <span className="text-base">{item.icon}</span>
                          <span>{item.label}</span>
                        </div>
                        <svg className="w-4 h-4 text-gray-300 group-hover:text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                      </Link>
                    ))}
                  </div>

                  {/* Logout */}
                  <div className="border-t border-gray-100 mt-2 pt-2 px-4">
                    <button
                      onClick={handleLogout}
                      className="w-full flex items-center gap-3 py-2.5 text-sm text-red-500 hover:text-red-600 transition-colors"
                    >
                      <span className="text-base">🚪</span>
                      <span>Logout</span>
                    </button>
                  </div>

                </div>
              )}
            </div>
          ) : (
            <>
              <Link
                to="/login"
                className="text-sm text-gray-600 hover:text-[#1a1a1a] font-medium transition-colors"
              >
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
    </nav>
  );
}