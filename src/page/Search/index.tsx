import React, { useEffect, useState } from "react";
import ImageGrid from "../../component/ImageGrid";
import { useSearchParams } from "react-router-dom";

const Search = () => {
  const [searchParams] = useSearchParams();

  const [images, setImages] = useState([]);
  useEffect(() => {
    const fetchImages = async () => {
      const query = searchParams.get("query");
      try {
        const response = query
          ? await fetch("http://localhost:3000/resource?query=" + query)
          : await fetch("http://localhost:3000/resource");
        const images = await response.json();

        setImages(images);
      } catch (error) {
        console.error("Error fetching images:", error);
      }
    };

    fetchImages();
  }, [searchParams]);

  return (
    <div>
      <ImageGrid images={images} />
    </div>
  );
};

export default Search;
