import axios from "axios";

const API_URL = process.env.REACT_APP_API_URL || "http://localhost:5000/api";

const api = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const authAPI = {
  register: (data) => api.post("/auth/register", data),
  login: (data) => api.post("/auth/login", data),
  getCurrentUser: () => api.get("/auth/me"),
};

export const skillAPI = {
  getAllSkills: (params) => api.get("/skills", { params }),
  getSkillById: (id) => api.get(`/skills/${id}`),
  getCategories: () => api.get("/skills/categories/list"),
  getLearningPaths: (params) => api.get("/skills/paths/all", { params }),
  getLearningPathById: (id) => api.get(`/skills/paths/${id}`),
};

export const assessmentAPI = {
  getAllAssessments: () => api.get("/assessments"),
  startAssessment: (data) => api.post("/assessments/start", data),
  submitAssessment: (data) => api.post("/assessments/submit", data),
  getRecommendations: () => api.get("/assessments/recommendations/personalized"),
  getAssessmentHistory: () => api.get("/assessments/history/user"),
};

export const userAPI = {
  getUserProfile: () => api.get("/users/profile"),
  updateUserProfile: (data) => api.patch("/users/profile", data),
  getUserDashboard: () => api.get("/users/dashboard"),
  getUserProgress: (params) => api.get("/users/progress", { params }),
};

export default api;
