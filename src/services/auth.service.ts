// import { AxiosError } from "axios";

import axios from "../utils/axios";
import { clearSessionStorage } from "../utils/sessionStorage";

const authService = {
  register: async (data: unknown) => {
    try {
      const response = await axios.post(
        "http://localhost:3000/auth/signup",
        data
      );

      return response.data;
    } catch (error) {
      // const axiosError = error as AxiosError;
      console.log(axios);
      // return thunkAPI.rejectWithValue(axiosError?.response?.data);
    }
  },
  login: async (credentials: { identifier: string; password: string }) => {
    try {
      const response = await axios.post("http://localhost:3000/auth/login", {
        identifier: credentials.identifier,
        password: credentials.password,
      });

      return response.data;
    } catch (error) {
      // const axiosError = error as AxiosError;
      console.log(axios);
      // return thunkAPI.rejectWithValue(axiosError?.response?.data);
    }
  },
  logout: () => {
    clearSessionStorage();
    window.location.href = "/";
  },
  getProfile: async () => {
    //
    try {
      const response = await axios.get("http://localhost:3000/auth/profile");

      return response.data;
    } catch (error) {
      // const axiosError = error as AxiosError;
      console.log(axios);
      // return thunkAPI.rejectWithValue(axiosError?.response?.data);
    }
  },
  checkUsernameExists: async (newUsername: string) => {
    try {
      const response = await axios.post(
        "http://localhost:3000/auth/check-username",
        {
          username: newUsername,
        }
      );
      return response.data.isTaken;
    } catch (error) {
      console.error("Error checking username:", error);
    }
  },
  checkEmailExists: async (email: string) => {
    try {
      const response = await axios.post(
        "http://localhost:3000/auth/check-email",
        {
          email: email,
        }
      );
      return response.data.isExists;
    } catch (error) {
      console.error("Error checking email:", error);
    }
  },
  verifyToken: async () => {
    const res = await axios.get("http://localhost:3000/auth/verify-token");
    return res;
  },
};
export default authService;
