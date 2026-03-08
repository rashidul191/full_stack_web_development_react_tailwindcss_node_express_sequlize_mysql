import { useState } from "react";

const useImagePreview = () => {
  const [previewImage, setPreviewImage] = useState({});

  const handleImageChange = (e) => {
    const { name, files } = e.target;

    if (files && files[0]) {
      setPreviewImage((prev) => ({
        ...prev,
        [name]: URL.createObjectURL(files[0]),
      }));
    }
  };

  return { previewImage, handleImageChange };
};

export default useImagePreview;
