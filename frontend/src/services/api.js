import axios from "axios";

const API_URL = process.env.REACT_APP_API_URL || "http://localhost:5000/api";

/**
 * API Service
 * WHY: Centralized API communication layer
 * All frontend requests go through this service
 * Handles JWT token attachment and error handling
 */

const api = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Add token to requests
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Auth APIs
export const authAPI = {
  register: (data) => api.post("/auth/register", data),
  login: (data) => api.post("/auth/login", data),
  getCurrentUser: () => api.get("/auth/me"),
};

// Skill APIs
export const skillAPI = {
  getAllSkills: (params) => api.get("/skills", { params }),
  getSkillById: (id) => api.get(`/skills/${id}`),
  getCategories: () => api.get("/skills/categories/list"),
  getLearningPaths: (params) => api.get("/skills/paths/all", { params }),
  getLearningPathById: (id) => api.get(`/skills/paths/${id}`),
};

// Assessment APIs
export const assessmentAPI = {
  getAllAssessments: () => api.get("/assessments"),
  startAssessment: (data) => api.post("/assessments/start", data),
  submitAssessment: (data) => api.post("/assessments/submit", data),
  getRecommendations: () => api.get("/assessments/recommendations/personalized"),
  getCareerRecommendations: () => api.get("/assessments/recommendations/careers"),
  getAssessmentHistory: () => api.get("/assessments/history/user"),
};

// User APIs
export const userAPI = {
  getUserProfile: () => api.get("/users/profile"),
  updateUserProfile: (data) => api.patch("/users/profile", data),
  getUserDashboard: () => api.get("/users/dashboard"),
  getUserProgress: (params) => api.get("/users/progress", { params }),
};

export const careerAPI = {
  getAllCareers: (params) => api.get("/careers", { params }),
  getCareerById: (id) => api.get(`/careers/${id}`),
  getCareerDetail: (id) => api.get(`/careers/${id}/detail`),
};

export const courseAPI = {
  getAllCourses: (params) => api.get("/courses", { params }),
  getCourseById: (id) => api.get(`/courses/${id}`),
};

export default api;
