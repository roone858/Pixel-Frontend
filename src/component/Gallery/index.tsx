import { useContext, useState } from "react";
import { StoreContext } from "../../context/StoreContext";
import LoadingSpinner from "../LoadingSpinner";

const Gallery = () => {
  const { images, isLoading } = useContext(StoreContext);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState("");
  const authToken = `${sessionStorage.getItem("access_token") || ""}`;

  const openLightbox = (imageSrc: string) => {
    setSelectedImage(imageSrc);
    setLightboxOpen(true);
  };

  const closeLightbox = () => {
    setLightboxOpen(false);
    setSelectedImage("");
  };
  isLoading && <LoadingSpinner />;
  return (
    <section className="py-24 bg-white dark:bg-gray-800 min-h-screen">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-2.5 lg:pb-16 pb-10 text-center">
          <h2 className="text-4xl font-bold text-gray-900 dark:text-white">
            Our Gallery
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-300">
            Step into a realm where art comes to life.
          </p>
        </div>
        <div className="gallery grid md:grid-cols-3 gap-8">
          {images.map((image, index) => (
            <div
              key={index}
              className="h-[277px] w-full rounded-3xl overflow-hidden"
            >
              <img
                loading="lazy"
                src={`http://localhost:3000/resources/${image.fileName}?token=${authToken}`}
                alt="Gallery image"
                className="gallery-image object-cover rounded-3xl hover:grayscale transition-all duration-700 ease-in-out w-full h-full cursor-pointer"
                onClick={() =>
                  openLightbox(
                    `http://localhost:3000/resources/${image.fileName}?token=${authToken}`
                  )
                }
              />
            </div>
          ))}
        </div>
      </div>
      {lightboxOpen && (
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
          <img
            src={selectedImage}
            alt="Selected"
            className="max-w-full max-h-full"
          />
        </div>
      )}
    </section>
  );
};

export default Gallery;
