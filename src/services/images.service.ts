import { ImageType } from "../types";
import axios from "../utils/axios";

const imagesService = {
  create: async (data: unknown) => {
    try {
      const response = await axios.post(
        "http://localhost:3000/resources",
        data
      );
      return response.data;
    } catch (error) {
      console.error("Error creating resource:", error);
      return null;
    }
  },

  getAll: async (): Promise<ImageType[]> => {
    try {
      const response = await axios.get("http://localhost:3000/resources");
      return response.data;
    } catch (error) {
      console.error("Error fetching resources:", error);
      return [];
    }
  },

  update: async (data: ImageType | null) => {
    if (!data) return new Error("Data is null");
    try {
      const response = await axios.patch(
        `http://localhost:3000/resources/${data._id}`,
        data
      );
      return response.data;
    } catch (error) {
      console.error("Error updating resource:", error);
      return null;
    }
  },

  upload: async (
    formData: FormData,
    setUploadProgress: (progress: number) => void
  ) => {
    try {
      const response = await axios.post(
        "http://localhost:3000/resources/upload",
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
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
      console.error("Error uploading file:", error);
      return null;
    }
  },
};

export default imagesService;
