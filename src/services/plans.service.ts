// import { AxiosError } from "axios";

import axios from "../utils/axios";

const plansService = {
  create: async (data: unknown) => {
    try {
      const response = await axios.post("http://localhost:3000/plans", data);

      return response.data;
    } catch (error) {
      // const axiosError = error as AxiosError;
      console.log(error);
      // return thunkAPI.rejectWithValue(axiosError?.response?.data);
    }
  },
  getAll: async () => {
    try {
      const response = await axios.get("http://localhost:3000/plans");

      return response.data;
    } catch (error) {
      // const axiosError = error as AxiosError;
      console.log(axios);
      // return thunkAPI.rejectWithValue(axiosError?.response?.data);
    }
  },

  getProfile: async () => {
    //
    try {
      const response = await axios.get("http://localhost:3000/plans/profile");
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
        "http://localhost:3000/plans/check-username",
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
        "http://localhost:3000/plans/check-email",
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
    const res = await axios.get("http://localhost:3000/plans/verify-token");
    return res;
  },
};
export default plansService;
