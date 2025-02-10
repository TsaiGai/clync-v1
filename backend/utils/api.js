import axios from "axios";
import { getAuth } from "firebase/auth";

const API_BASE_URL = "http://localhost:5000/api"; // Change this to your backend URL

const api = axios.create({
  baseURL: API_BASE_URL,
});

// Add Firebase authentication token to every request
api.interceptors.request.use(async (config) => {
  const auth = getAuth();
  const user = auth.currentUser;

  if (user) {
    const token = await user.getIdToken(); // Get the Firebase authentication token
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
}, (error) => {
  return Promise.reject(error);
});

export default api;
