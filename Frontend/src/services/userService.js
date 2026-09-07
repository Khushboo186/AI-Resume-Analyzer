import axiosInstance from "./authServices";

const API_URL = "http://localhost:8081/api/users";

/**
 * Get user profile and analytics summary
 */
export const getUserProfile = async () => {
  try {
    const response = await axiosInstance.get(`${API_URL}/profile`);
    return response.data;
  } catch (error) {
    throw error.response?.data || { message: "Failed to fetch user profile" };
  }
};

export default {
  getUserProfile,
};
