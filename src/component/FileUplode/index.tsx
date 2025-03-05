import { useState } from "react";
import axios from "../../utils/axios";

const MultipleFileUpload = () => {
  const [selectedFiles, setSelectedFiles] = useState<
    { file: File; title: string; description: string }[]
  >([]);
  const [uploading, setUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);

  // Handle file selection
  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (!event.target.files) return;

    const newFiles = Array.from(event.target.files).map((file) => ({
      file,
      title: "",
      description: "",
    }));

    // Preserve existing files when adding new ones
    setSelectedFiles((prevFiles) => [...prevFiles, ...newFiles]);
  };

  // Handle input changes (title & description)
  const handleInputChange = (
    index: number,
    field: "title" | "description",
    value: string
  ) => {
    setSelectedFiles((prevFiles) =>
      prevFiles.map((fileData, i) =>
        i === index ? { ...fileData, [field]: value } : fileData
      )
    );
  };

  // Handle file upload
  const handleUpload = async () => {
    if (selectedFiles.length === 0) {
      alert("Please select files first!");
      return;
    }

    const formData = new FormData();
    selectedFiles.forEach(({ file, title, description }) => {
      if (!title.trim() || !description.trim()) {
        alert("Title and description are required for each file.");
        return;
      }

      formData.append("files", file);
      formData.append("titles", title);
      formData.append("descriptions", description);
    });

    try {
      setUploading(true);
      setUploadProgress(0);

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

      alert("Upload successful!");
      console.log("Server response:", response.data);
      setSelectedFiles([]); // Clear selected files after upload
    } catch (error) {
      console.error("Upload failed", error);
      alert("Upload failed!");
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="max-w-lg mx-auto ">
      {/* File input */}
     
      <div className="flex items-center justify-center w-full py-5">
        <label
          htmlFor="dropzone-file"
          className="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-gray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600"
        >
          <div className="flex flex-col items-center justify-center pt-5 pb-6">
            <svg
              className="w-8 h-8 mb-4 text-gray-500 dark:text-gray-400"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 20 16"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
              />
            </svg>
            <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
              <span className="font-semibold">
                {selectedFiles.length > 0
                  ? `تم اختيار ${selectedFiles.length} ملف`
                  : "اضغط لاختيار الصور"}
              </span>{" "}
              او اسحب واتركها هنا
            </p>
            <p className="text-xs text-gray-500 dark:text-gray-400">
              SVG, PNG, JPG or GIF (MAX. 800x400px)
            </p>
          </div>
          <input
            id="dropzone-file"
            type="file"
            className="hidden"
            multiple
            onChange={handleFileChange}
          />
        </label>
      </div>
      {/* Selected files list */}
      {selectedFiles.length > 0 && (
        <div className="mt-1 space-y-2">
          {selectedFiles.map((fileData, index) => (
            <div
              key={index}
              className="bg-white p-8 rounded-md shadow-md space-y-5"
            >
              <p className="text-sm font-medium">
                📂 {fileData.file.name} (
                {(fileData.file.size / 1024).toFixed(2)} KB)
              </p>

              {/* Title input */}
              <input
                type="text"
                placeholder="العنوان"
                value={fileData.title}
                onChange={(e) =>
                  handleInputChange(index, "title", e.target.value)
                }
                className="w-full py-2 px-3 border-0 border-b border-gray-300 focus:outline-none focus:border-orange-500 "
              />

              {/* Description input */}
              <textarea
                placeholder="الوصف"
                value={fileData.description}
                onChange={(e) =>
                  handleInputChange(index, "description", e.target.value)
                }
                className="w-full py-2 px-3 border-0 border-b border-gray-300 focus:outline-none focus:border-orange-500 "
                rows={2}
              />
            </div>
          ))}
        </div>
      )}

      {/* Upload button */}
      <div className="grid">
        <button
          className="bg-orange-500 text-white py-4 px-6 rounded-md"
          onClick={handleUpload}
          disabled={uploading}
        >
          {uploading ? `جارى الرفع ... ${uploadProgress}%` : "رفع الصور"}
        </button>
      </div>
      {/* Upload progress bar */}
      {uploading && (
        <div className="w-full bg-gray-200 rounded-full h-2.5 mt-2">
          <div
            className="bg-blue-600 h-2.5 rounded-full"
            style={{ width: `${uploadProgress}%` }}
          ></div>
        </div>
      )}
    </div>
  );
};

export default MultipleFileUpload;
