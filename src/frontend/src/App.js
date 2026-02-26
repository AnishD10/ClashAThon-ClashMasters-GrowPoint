import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider, useAuth } from "./context/AuthContext";
import Navbar from "./components/Navbar";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import DashboardPage from "./pages/DashboardPage";
import SkillsPage from "./pages/SkillsPage";
import AssessmentsPage from "./pages/AssessmentsPage";
import CareerRecommendationsPage from "./pages/CareerRecommendationsPage";
import CareerDetailPage from "./pages/CareerDetailPage";
import CareerScopePage from "./pages/CareerScopePage";
import SkillDetailPage from "./pages/SkillDetailPage";
import CoursesPage from "./pages/CoursesPage";
import ProfilePage from "./pages/ProfilePage";
import OnboardingInterestsPage from "./pages/OnboardingInterestsPage";
import "./styles/index.css";

/**
 * Protected Route Component
 * WHY: Ensures only authenticated users can access certain routes
 */
function ProtectedRoute({ children }) {
  const { isAuthenticated, loading } = useAuth();

  if (loading) {
    return <div className="flex items-center justify-center h-screen">Loading...</div>;
  }

  return isAuthenticated ? children : <Navigate to="/login" />;
}

/**
 * App Component
 * WHY: Main app component that sets up routing and authentication
 * All routes and pages are connected here
 */
function AppRoutes() {
  const { isAuthenticated } = useAuth();

  return (
    <Router>
      <Navbar />
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<HomePage />} />
        <Route
          path="/login"
          element={isAuthenticated ? <Navigate to="/dashboard" /> : <LoginPage />}
        />
        <Route
          path="/register"
          element={isAuthenticated ? <Navigate to="/dashboard" /> : <RegisterPage />}
        />

        {/* Protected Routes */}
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <DashboardPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/onboarding/interests"
          element={
            <ProtectedRoute>
              <OnboardingInterestsPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/skills"
          element={
            <ProtectedRoute>
              <SkillsPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/assessments"
          element={
            <ProtectedRoute>
              <AssessmentsPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/careers"
          element={
            <ProtectedRoute>
              <CareerRecommendationsPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/careers/:careerId"
          element={
            <ProtectedRoute>
              <CareerDetailPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/careers/:careerId/scope"
          element={
            <ProtectedRoute>
              <CareerScopePage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/skills/:skillId"
          element={
            <ProtectedRoute>
              <SkillDetailPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/courses"
          element={
            <ProtectedRoute>
              <CoursesPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/profile"
          element={
            <ProtectedRoute>
              <ProfilePage />
            </ProtectedRoute>
          }
        />

        {/* 404 */}
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </Router>
  );
}

function App() {
  return (
    <AuthProvider>
      <AppRoutes />
    </AuthProvider>
  );
}

export default App;
