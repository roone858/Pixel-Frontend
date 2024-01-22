import { useEffect, useState, lazy } from "react";

const Image = lazy(() => import("../Image"));

const ImageList = () => {
  const [images, setImages] = useState([]);
  useEffect(() => {
    const fetchImages = async () => {
      try {
        const response = await fetch("http://localhost:3000/resource/");
        const images = await response.json();

        setImages(images);
      } catch (error) {
        console.error("Error fetching images:", error);
      }
    };

    fetchImages();
  }, []);
  return (
    <div className="flex flex-wrap gap-5 justify-center items-center p-20">
      {/*eslint-disable-next-line @typescript-eslint/no-explicit-any */}
      {images.map((image: any, index) => (
        <div
          key={index}
          className="image-container w-60 h-60 shadow overflow-hidden  border "
        >
          <Image
            src={"http://localhost:3000/resource/" + image.fileName}
            alt={`Image ${index}`}
            loading="lazy"
            className="object-cover h-full border mx-auto"
          />
          {/* <h4>{image.title}</h4>
          <p>{image.description}</p> */}
        </div>
      ))}
    </div>
  );
};
export default ImageList;
