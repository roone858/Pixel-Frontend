// import { AxiosError } from "axios";

import { ImageType, UserType } from "../types";
import axios from "../utils/axios";

const usersService = {
  create: async (data: unknown) => {
    try {
      const response = await axios.post("http://localhost:3000/users", data);

      return response.data;
    } catch (error) {
      // const axiosError = error as AxiosError;
      console.log(error);
      // return thunkAPI.rejectWithValue(axiosError?.response?.data);
    }
  },
  getAll: async (): Promise<ImageType[]> => {
    try {
      const response = await axios.get("http://localhost:3000/users");

      return response.data;
    } catch (error) {
      console.error(axios);
      return [];
    }
  },
  update: async (data: UserType | null, profilePicture: File | null) => {
    try {
      if (!profilePicture) {
        if (!data) return new Error("!Data is null");
        const response = await axios.patch(
          "http://localhost:3000/users/" + data._id,
          data
        );
        return response;
      }

      const formData = new FormData();

      formData.append("image", profilePicture); // "file" should match the backend field name
      if (data) formData.append("updatedUser", JSON.stringify(data)); // "file" should match the backend field name

      const response = await axios.post(
        "http://localhost:3000/users/profile-picture",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      console.log("File uploaded successfully:", response.data);

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
        "http://localhost:3000/users/check-username",
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
        "http://localhost:3000/users/check-email",
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
    const res = await axios.get("http://localhost:3000/users/verify-token");
    return res;
  },
};
export default usersService;
