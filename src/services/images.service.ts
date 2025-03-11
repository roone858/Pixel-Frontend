// import { AxiosError } from "axios";

import { ImageType } from "../types";
import axios from "../utils/axios";

const imagesService = {
  create: async (data: unknown) => {
    try {
      const response = await axios.post("http://localhost:3000/resurces", data);

      return response.data;
    } catch (error) {
      // const axiosError = error as AxiosError;
      console.log(error);
      // return thunkAPI.rejectWithValue(axiosError?.response?.data);
    }
  },
  getAll: async (): Promise<ImageType[]> => {
    try {
      const response = await axios.get("http://localhost:3000/resource");

      return response.data;
    } catch (error) {
      console.error(axios);
      return [];
    }
  },
  update: async (data: ImageType | null) => {
    try {
      if (!data) return new Error("data is null");
      const response = await axios.patch(
        "http://localhost:3000/resource/" + data._id,
        data
      );

      return response.data;
    } catch (error) {
      // const axiosError = error as AxiosError;
      console.log(axios);
      // return thunkAPI.rejectWithValue(axiosError?.response?.data);
    }
  },

  upload: async (
    formData: FormData,
    setUploadProgress: (number: number) => void
  ) => {
    //
    try {
      const response = await axios.post(
        "http://localhost:3000/resource/upload",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
          onUploadProgress: (progressEvent) => {
            if (progressEvent.total) {
              setUploadProgress(
                Math.round((progressEvent.loaded * 100) / progressEvent.total)
              );
            }
          },
        }
      );
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
        "http://localhost:3000/images/check-username",
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
        "http://localhost:3000/images/check-email",
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
    const res = await axios.get("http://localhost:3000/images/verify-token");
    return res;
  },
};
export default imagesService;
