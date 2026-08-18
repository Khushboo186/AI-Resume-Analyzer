import axios from "axios";

const API_URL = "http://localhost:8081/api/auth";

// Create axios instance with default config
const axiosInstance = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Add token to requests if it exists
axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("authToken");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Handle response and errors
axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Token expired or invalid, clear storage
      localStorage.removeItem("authToken");
      localStorage.removeItem("user");
      window.location.href = "/login";
    }
    return Promise.reject(error);
  }
);

/**
 * Register new user
 */
export const registerUser = async (registerData) => {
  try {
    const response = await axiosInstance.post("/register", registerData);
    return response.data;
  } catch (error) {
    throw error.response?.data || { message: "Registration failed" };
  }
};

/**
 * Login user
 */
export const loginUser = async (loginData) => {
  try {
    const response = await axiosInstance.post("/login", loginData);
    
    if (response.data.token) {
      // Store token and user info
      localStorage.setItem("authToken", response.data.token);
      localStorage.setItem("user", JSON.stringify({
        email: response.data.email,
        userId: response.data.userId,
      }));
    }
    
    return response.data;
  } catch (error) {
    throw error.response?.data || { message: "Login failed" };
  }
};

/**
 * Logout user
 */
export const logoutUser = async () => {
  try {
    await axiosInstance.post("/logout");
    // Clear stored data
    localStorage.removeItem("authToken");
    localStorage.removeItem("user");
    return { message: "Logout successful" };
  } catch (error) {
    // Even if logout fails, clear local storage
    localStorage.removeItem("authToken");
    localStorage.removeItem("user");
    return { message: "Logout successful" };
  }
};

/**
 * Get current user from storage
 */
export const getCurrentUser = () => {
  const userStr = localStorage.getItem("user");
  return userStr ? JSON.parse(userStr) : null;
};

/**
 * Check if user is authenticated
 */
export const isAuthenticated = () => {
  return !!localStorage.getItem("authToken");
};

/**
 * Get auth token
 */
export const getAuthToken = () => {
  return localStorage.getItem("authToken");
};

export default axiosInstance;