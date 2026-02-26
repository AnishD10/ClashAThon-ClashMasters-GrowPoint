import React from "react";
import { Link } from "react-router-dom";

export default function Footer() {
  const scrollToTop = () => window.scrollTo({ top: 0, behavior: "smooth" });

  return (
    <footer className="bg-white px-6 md:px-16 py-6">
      <div className="bg-[#071642] rounded-3xl px-10 md:px-16 py-14 text-white">

        {/* ── Top: CTA ── */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center border-b border-white/10 pb-12 mb-12 gap-8">
          {/* Left label */}
          <p className="text-sm text-white/50 font-medium">Let's connect</p>

          {/* Right: heading + buttons */}
          <div>
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-2 leading-tight">
              Start your journey
            </h2>
            <h2 className="text-4xl md:text-5xl font-bold text-white/40 mb-8 leading-tight">
              to learn more
            </h2>
            <div className="flex items-center gap-3">
              <Link
                to="/register"
                className="bg-white text-[#0f1f18] text-sm font-semibold px-6 py-2.5 rounded-full hover:bg-gray-100 transition-colors"
              >
                Get Started
              </Link>
              <Link
                to="/login"
                className="bg-white/10 text-white text-sm font-semibold px-6 py-2.5 rounded-full hover:bg-white/20 transition-colors"
              >
                Login
              </Link>
            </div>
          </div>
        </div>

        {/* ── Middle: Links ── */}
        <div className="flex flex-col md:flex-row justify-between gap-10 border-b border-white/10 pb-12 mb-12">

          {/* Logo */}
          <div className="md:w-1/3">
            <p className="text-base font-bold leading-tight">Know Your</p>
            <p className="text-base font-bold leading-tight text-white/50">Potential</p>
          </div>

          {/* Platform links */}
          <div>
            <p className="text-xs text-white/30 uppercase tracking-widest font-semibold mb-4">Platform</p>
            <ul className="space-y-2.5">
              {["Skill Assessments", "Learning Paths", "Progress Tracking", "Market Insights", "Internships"].map((item) => (
                <li key={item}>
                  <Link to="#" className="text-sm text-white/70 hover:text-white transition-colors">
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company links */}
          <div>
            <p className="text-xs text-white/30 uppercase tracking-widest font-semibold mb-4">Company</p>
            <ul className="space-y-2.5">
              {["About Us", "Dashboard", "Assessments", "Skills", "Contact"].map((item) => (
                <li key={item}>
                  <Link to="#" className="text-sm text-white/70 hover:text-white transition-colors">
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Scroll to top */}
          <div className="flex items-start justify-end">
            <button
              onClick={scrollToTop}
              className="w-10 h-10 rounded-full border border-white/20 flex items-center justify-center hover:bg-white/10 transition-colors"
            >
              <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
              </svg>
            </button>
          </div>
        </div>

        {/* ── Tagline ── */}
        <div className="border-b border-white/10 pb-12 mb-12">
          <p className="text-sm font-semibold text-white/70">Empowering career decisions</p>
          <p className="text-sm text-white/30 mt-1 max-w-xs">
            We help students and professionals discover their potential and build meaningful careers.
          </p>
        </div>

        {/* ── Bottom: Copyright ── */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-white/30">
          <p>© 2025 Know Your Potential. All rights reserved.</p>
          <Link to="#" className="hover:text-white/60 transition-colors">Privacy Policy</Link>
        </div>

      </div>
    </footer>
  );
}