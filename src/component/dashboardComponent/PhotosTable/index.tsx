import { FaEdit, FaTrash } from "react-icons/fa";
import { ImageType, UserType } from "../../../types";
import { useState } from "react";
import imagesService from "../../../services/images.service";
import { useStoreContext } from "../../../context/StoreContext";
import LoadingSpinner from "../../LoadingSpinner";

const PhotosTable = ({
  images,
  users,
}: {
  images: ImageType[];
  users: UserType[];
}) => {
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState<ImageType | null>(null);
  const [input, setInput] = useState<string>("");
  const { updateImages, isLoading } = useStoreContext();
  isLoading && <LoadingSpinner />;
  const openLightbox = (image: ImageType) => {
    setSelectedImage(image);
    setLightboxOpen(true);
  };

  const closeLightbox = () => {
    setLightboxOpen(false);
    setSelectedImage(null);
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    if (selectedImage) {
      setSelectedImage({
        ...selectedImage,
        [name]: value,
      });
    }
  };

  const handleTagChange = (index: number, value: string) => {
    if (selectedImage) {
      const updatedTags = [...selectedImage.tags];
      updatedTags[index] = value;
      setSelectedImage({
        ...selectedImage,
        tags: updatedTags,
      });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (selectedImage) {
      try {
        const newImage = await imagesService.update(selectedImage);
        updateImages(
          images.map((img) => (img._id == newImage._id ? newImage : img))
        );
        closeLightbox();
      } catch (error) {
        console.error("Failed to update image:", error);
      }
    }
  };

  const addTag = (e: React.FormEvent) => {
    e.preventDefault();
    const trimmedInput = input.trim();
    if (
      trimmedInput &&
      selectedImage &&
      !selectedImage.tags.includes(trimmedInput)
    ) {
      setSelectedImage({
        ...selectedImage,
        tags: [...selectedImage.tags, trimmedInput],
      });
      setInput("");
    }
  };

  const removeTag = (tagToRemove: string) => {
    if (selectedImage) {
      setSelectedImage({
        ...selectedImage,
        tags: selectedImage.tags.filter((tag) => tag !== tagToRemove),
      });
    }
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-sm">
      <h2 className="text-xl font-bold mb-4">إدارة الصور</h2>
      <table className="w-full">
        <thead>
          <tr className="text-right border-b">
            <th className="pb-2">العنوان</th>
            <th className="pb-2">الوصف</th>
            <th className="pb-2">المنشئ</th>
            <th className="pb-2">الإجراءات</th>
          </tr>
        </thead>
        <tbody>
          {images?.map((image) => (
            <tr key={image._id} className="border-b">
              <td className="py-3">
                <div className="flex flex-row-reverse justify-end items-center">
                  <span>{image.title}</span>
                  <img
                    src={`http://localhost:3000/resources/${image.fileName}`}
                    alt={image.title}
                    className="w-24 rounded-md border-2 ml-3 border-gray-300 dark:border-gray-600"
                    loading="lazy"
                  />
                </div>
              </td>
              <td>{image.description}</td>
              <td>
                {users.find(
                  (user) => String(user._id) === String(image.uploader)
                )?.profile?.name || "غير معروف"}
              </td>
              <td className="py-3">
                <div className="relative flex gap-5">
                  <button
                    onClick={() => openLightbox(image)}
                    className="text-blue-500 hover:text-blue-700 text-xl"
                    aria-label="Edit image"
                  >
                    <FaEdit />
                  </button>
                  <button
                    className="text-red-500 hover:text-red-700 text-xl"
                    aria-label="Delete image"
                  >
                    <FaTrash />
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {lightboxOpen && selectedImage && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-80"
          onClick={closeLightbox}
        >
          <span
            className="absolute top-5 right-10 text-white text-4xl cursor-pointer"
            onClick={closeLightbox}
          >
            &times;
          </span>
          <form
            className="bg-white p-6 rounded-lg shadow-lg w-11/12 max-w-2xl max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
            onSubmit={handleSubmit}
          >
            <h3 className="text-xl font-bold mb-4">تعديل الصورة</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  العنوان
                </label>
                <input
                  type="text"
                  name="title"
                  value={selectedImage.title}
                  onChange={handleInputChange}
                  className="w-full py-2 px-3 rounded-md mt-1 border border-gray-300 focus:outline-none focus:border-orange-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  الوصف
                </label>
                <input
                  type="string"
                  name="description"
                  value={selectedImage.description || ""}
                  onChange={handleInputChange}
                  className="w-full py-2 px-3 rounded-md mt-1 border border-gray-300 focus:outline-none focus:border-orange-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  الجودة
                </label>
                <input
                  type="string"
                  name="resolution"
                  value={selectedImage.metadata?.resolution || ""}
                  onChange={handleInputChange}
                  className="w-full py-2 px-3 rounded-md mt-1 border border-gray-300 focus:outline-none focus:border-orange-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Tags
                </label>
                <div className="flex flex-row gap-2">
                  <input
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    className="w-full py-2 px-3 border-0 border-b border-gray-300 focus:outline-none focus:border-orange-500"
                    placeholder="ادخل Tag ,اضغط enter"
                  />
                  <button
                    onClick={addTag}
                    className="bg-orange-500 text-white py-1 px-2 rounded-md"
                  >
                    أضف
                  </button>
                </div>
                <div className="mt-4 flex flex-wrap gap-2">
                  {selectedImage.tags.map((tag, index) => (
                    <div
                      key={index}
                      className="bg-gray-200 px-3 py-1 rounded-lg flex items-center gap-2"
                    >
                      <input
                        type="text"
                        value={tag}
                        onChange={(e) => handleTagChange(index, e.target.value)}
                        className="bg-transparent focus:outline-none"
                      />
                      <span
                        onClick={() => removeTag(tag)}
                        className="text-red-500 cursor-pointer"
                      >
                        &times;
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            <div className="mt-6 flex justify-end space-x-4">
              <button
                type="button"
                onClick={closeLightbox}
                className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-200 rounded-md hover:bg-gray-300"
              >
                إلغاء
              </button>
              <button
                type="submit"
                className="bg-orange-500 hover:bg-orange-700 text-white py-2 px-4 rounded-md"
              >
                حفظ التغييرات
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};

export default PhotosTable;
