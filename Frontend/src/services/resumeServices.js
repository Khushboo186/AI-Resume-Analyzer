import axiosInstance from "./authServices";

const API_URL = "http://localhost:8081/api/resumes";

/**
 * Upload a resume and get AI ATS analysis
 */
export const uploadResume = async (file) => {
  try {
    const formData = new FormData();
    formData.append("file", file);

    const response = await axiosInstance.post(
      `${API_URL}/upload`,
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );

    return response.data;
  } catch (error) {
    throw error.response?.data || { message: "Upload failed" };
  }
};

/**
 * Get all user resumes
 */
export const getUserResumes = async () => {
  try {
    const response = await axiosInstance.get(API_URL);
    return response.data;
  } catch (error) {
    throw error.response?.data || { message: "Failed to fetch resumes" };
  }
};

/**
 * Get dashboard aggregated metrics
 */
export const getDashboardStats = async () => {
  try {
    const response = await axiosInstance.get(`${API_URL}/stats`);
    return response.data;
  } catch (error) {
    throw error.response?.data || { message: "Failed to fetch dashboard stats" };
  }
};

/**
 * Get a specific resume analysis by ID
 */
export const getResumeById = async (resumeId) => {
  try {
    const response = await axiosInstance.get(`${API_URL}/${resumeId}`);
    return response.data;
  } catch (error) {
    throw error.response?.data || { message: "Failed to fetch resume" };
  }
};

/**
 * Delete a resume
 */
export const deleteResume = async (resumeId) => {
  try {
    const response = await axiosInstance.delete(`${API_URL}/${resumeId}`);
    return response.data;
  } catch (error) {
    throw error.response?.data || { message: "Failed to delete resume" };
  }
};

export default {
  uploadResume,
  getUserResumes,
  getDashboardStats,
  getResumeById,
  deleteResume,
};
