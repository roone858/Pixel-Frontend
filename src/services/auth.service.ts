import axios from "../utils/axios";
import { clearSessionStorage } from "../utils/sessionStorage";

const authService = {
  register: async (data: unknown) => {
    try {
      const response = await axios.post("http://localhost:3000/auth/signup", data);
      return response.data;
    } catch (error) {
      console.error("Error during registration:", error);
      return null;
    }
  },

  login: async (credentials: { identifier: string; password: string }) => {
    try {
      const response = await axios.post("http://localhost:3000/auth/login", credentials);
      return response.data;
    } catch (error) {
      console.error("Error during login:", error);
      return null;
    }
  },

  logout: () => {
    clearSessionStorage();
    window.location.href = "/";
  },

  getProfile: async () => {
    try {
      const response = await axios.get("http://localhost:3000/auth/profile");
      return response.data;
    } catch (error) {
      console.error("Error fetching profile:", error);
      return null;
    }
  },

  checkUsernameExists: async (newUsername: string) => {
    try {
      const response = await axios.post("http://localhost:3000/auth/check-username", {
        username: newUsername,
      });
      return response.data?.isTaken ?? false;
    } catch (error) {
      console.error("Error checking username:", error);
      return false;
    }
  },

  checkEmailExists: async (email: string) => {
    try {
      const response = await axios.post("http://localhost:3000/auth/check-email", {
        email,
      });
      return response.data?.isExists ?? false;
    } catch (error) {
      console.error("Error checking email:", error);
      return false;
    }
  },

  verifyToken: async () => {
    try {
      const response = await axios.get("http://localhost:3000/auth/verify-token");
      return response.data;
    } catch (error) {
      console.error("Error verifying token:", error);
      return null;
    }
  },
};

export default authService;