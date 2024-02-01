import  { useEffect, useState } from "react";
import ImageGrid from "../../component/ImageGrid";
import { useSearchParams } from "react-router-dom";

const Search = () => {
  const [searchParams] = useSearchParams();

  const query = searchParams.get("query");
  const [images, setImages] = useState([]);
  useEffect(() => {
    const fetchImages = async () => {
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
  }, [query, searchParams]);

  return (
    <div>
     <div className="header px-20 py-10">

      <h2 className="text-center">ألنتائج المتعلقة ب "{query}"</h2>
     </div>
      <ImageGrid images={images} />
    </div>
  );
};

export default Search;
