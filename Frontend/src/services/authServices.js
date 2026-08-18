import axios from "axios";

const API_URL = "http://localhost:8081/api/auth";

export const loginUser = async (loginData) => {
  return axios.post(`${API_URL}/login`, loginData);
};