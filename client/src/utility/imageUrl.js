import { URL } from "../config/app";
import defaultImage from "../../src/assets/no-image.png";

export const imageUrl = (path) => {
  const baseURL = URL || "http://localhost:5000/api";
  if (!path) {
    return defaultImage;
  }

  return `${baseURL}/uploads/${path}`;
};
