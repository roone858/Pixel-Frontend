import axios from "../../utils/axios";
import { useEffect, useState } from "react";
import blur from "../../assets/images.jfif";
// const arrayBufferToBase64 = (buffer: ArrayBuffer) => {
//   let binary = "";
//   const bytes = new Uint8Array(buffer);
//   for (let i = 0; i < bytes.length; i++) {
//     binary += String.fromCharCode(bytes[i]);
//   }
//   return btoa(binary);
// };

const Image = ({ src, ...props }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [imagePreview, setImagePreview] = useState("");

  useEffect(() => {
    axios
      .get(src, {
        responseType: "blob", //arraybuffer
      })
      .then((response) => URL.createObjectURL(response.data))
      .then((imageUrl) => setImagePreview(imageUrl));
    // .then((response) => {
    //   return {
    //     base64Image: arrayBufferToBase64(response.data),
    //     contentType: response.headers["content-type"],
    //   };
    // })
    // .then(({ base64Image, contentType }) =>
    //   setImagePreview(`data:${contentType};base64,${base64Image}`)
    // );
  }, [src]);
  return imagePreview ? (
    <img src={imagePreview} loading="lazy" {...props} />
  ) : (
    <img src={blur} loading="lazy" {...props} />
  );
};

export default Image;