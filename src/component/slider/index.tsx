import React, { useEffect } from "react";
import Swiper from "swiper";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { ImageType } from "../../types";

interface GallerySliderProps {
  images: ImageType[];
}

const GallerySlider: React.FC<GallerySliderProps> = ({ images }) => {
  const authToken = sessionStorage.getItem("access_token") || "";

  useEffect(() => {
    const swiper = new Swiper(".gallery-top", {
      spaceBetween: 20,
      centeredSlides: true,
      loop: true,
      autoplay: {
        delay: 200,
        disableOnInteraction: false,
      },
      navigation: {
        nextEl: ".swiper-button-next",
        prevEl: ".swiper-button-prev",
      },
      breakpoints: {
        1920: { slidesPerView: 3 },
        1400: { slidesPerView: 3, centeredSlides: true },
        900: { slidesPerView: 3, spaceBetween: 15, centeredSlides: true },
        200: { slidesPerView: 2, spaceBetween: 15 },
      },
    });

    return () => swiper.destroy();
  }, []);

  return (
    <section className="py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 overflow-hidden">
        <div className="pb-16 text-center">
          <h2 className="text-gray-900 text-4xl font-bold">Our Gallery</h2>
          <p className="text-gray-600 text-lg">
            Explore the essence of beauty in our gallery's intimate space.
          </p>
        </div>
        <div className="relative mx-auto w-auto">
          <div className="swiper-container gallery-top w-full md:w-[1028px] mx-auto pt-6">
            <div className="swiper-wrapper flex gap-3">
              {images.map((image, index) => (
                <div key={index} className="swiper-slide max-w-[319px] grid">
                  <img
                    className="w-full rounded-xl h-64 object-cover"
                    src={`http://localhost:3000/resources/${image.fileName}?token=${authToken}`}
                    alt={image.title}
                  />
                  <div className="swiper-box text-center mt-5">
                    <h5 className="text-gray-900 text-xl font-medium">
                      {image.title}
                    </h5>
                    <p className="text-gray-600 text-base">
                      {image.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default GallerySlider;
