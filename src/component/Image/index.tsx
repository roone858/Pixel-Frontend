import axios from "../../utils/axios";
import { useEffect, useState } from "react";
import blur from "../../assets/images.jfif";

const Image = ({ src, ...props }) => {
  const [imagePreview, setImagePreview] = useState("");

  useEffect(() => {
    axios
      .get(src, {
        responseType: "blob",
      })
      .then((response) => URL.createObjectURL(response.data))
      .then((imageUrl) => setImagePreview(imageUrl));
  }, [src]);
  return blur ? (
    imagePreview ? (
      <img src={imagePreview} loading="lazy" {...props} />
    ) : (
      <img src={blur} loading="lazy" {...props} />
    )
  ) : (
    <div>loading ..</div>
  );
};

export default Image;
