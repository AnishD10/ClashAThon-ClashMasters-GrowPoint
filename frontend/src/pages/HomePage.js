import React from "react";
import { Link } from "react-router-dom";

/**
 * Home Page Component
 * WHY: Landing page explaining the platform's value proposition
 * Motivates users to join and start their learning journey
 */

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-500 to-blue-700 text-white">
      {/* Hero Section */}
      <div className="page-container text-center py-20">
        <h1 className="text-5xl md:text-6xl font-bold mb-6">
          Know Your Potential 🎯
        </h1>
        <p className="text-xl md:text-2xl mb-8 max-w-2xl mx-auto">
          End decision paralysis. Discover which skills match YOUR strengths and
          get a personalized learning roadmap.
        </p>

        <div className="flex justify-center gap-4 mb-12">
          <Link
            to="/register"
            className="bg-white text-blue-600 px-8 py-3 rounded-lg font-bold hover:bg-blue-50 transition"
          >
            Get Started Now
          </Link>
          <Link
            to="/login"
            className="border-2 border-white text-white px-8 py-3 rounded-lg font-bold hover:bg-white hover:text-blue-600 transition"
          >
            Already have an account?
          </Link>
        </div>
      </div>

      {/* Features Section */}
      <div className="bg-white text-gray-800 py-20">
        <div className="page-container">
          <h2 className="text-4xl font-bold text-center mb-12">
            How It Works
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Feature 1 */}
            <div className="text-center">
              <div className="text-5xl mb-4">📊</div>
              <h3 className="text-2xl font-bold mb-3">Take Assessments</h3>
              <p className="text-gray-600">
                Complete skill assessments that measure your aptitude in
                different areas.
              </p>
            </div>

            {/* Feature 2 */}
            <div className="text-center">
              <div className="text-5xl mb-4">🔍</div>
              <h3 className="text-2xl font-bold mb-3">Get Recommendations</h3>
              <p className="text-gray-600">
                Receive personalized learning paths based on your strengths and
                interests.
              </p>
            </div>

            {/* Feature 3 */}
            <div className="text-center">
              <div className="text-5xl mb-4">📚</div>
              <h3 className="text-2xl font-bold mb-3">Start Learning</h3>
              <p className="text-gray-600">
                Follow curated courses designed to make you job-ready for your
                chosen career.
              </p>
            </div>

            {/* Feature 4 */}
            <div className="text-center">
              <div className="text-5xl mb-4">📈</div>
              <h3 className="text-2xl font-bold mb-3">Track Progress</h3>
              <p className="text-gray-600">
                Monitor your learning journey with detailed progress analytics.
              </p>
            </div>

            {/* Feature 5 */}
            <div className="text-center">
              <div className="text-5xl mb-4">💡</div>
              <h3 className="text-2xl font-bold mb-3">Market Insights</h3>
              <p className="text-gray-600">
                Discover trending skills and job market demand for your field.
              </p>
            </div>

            {/* Feature 6 */}
            <div className="text-center">
              <div className="text-5xl mb-4">🚀</div>
              <h3 className="text-2xl font-bold mb-3">Internships (Coming Soon)</h3>
              <p className="text-gray-600">
                Get practical experience through curated internship opportunities.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Target Audience */}
      <div className="bg-gray-50 text-gray-800 py-20">
        <div className="page-container">
          <h2 className="text-4xl font-bold text-center mb-12">
            Perfect For
          </h2>

          <div className="max-w-2xl mx-auto text-center">
            <p className="text-lg text-gray-600 mb-6">
              🎓 <strong>+2 Graduates</strong> confused about career choices
            </p>
            <p className="text-lg text-gray-600 mb-6">
              🔄 Career switchers wondering which path to take
            </p>
            <p className="text-lg text-gray-600 mb-6">
              📚 Self-learners wanting a structured approach
            </p>
            <p className="text-lg text-gray-600">
              💼 Job seekers looking to upskill
            </p>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-gradient-to-br from-blue-600 to-blue-800 text-white py-20">
        <div className="page-container text-center">
          <h2 className="text-4xl font-bold mb-6">
            Ready to Discover Your Potential?
          </h2>
          <Link
            to="/register"
            className="bg-white text-blue-600 px-8 py-3 rounded-lg font-bold hover:bg-blue-50 transition text-lg"
          >
            Start Your Journey Now 🚀
          </Link>
        </div>
      </div>
    </div>
  );
}
