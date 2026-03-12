import React from "react";
import { Outlet } from "react-router-dom";
import Navbar from "../FrontEnd/Common/Navbar";
import Footer from "../FrontEnd/Common/Footer";
import { useCss, useScript } from "../../hook/customHook";

const FrontendLayout = () => {
  let cssAssets = [
    "/flaticon.css",
    "/all.min.css",
    "/themify-icons.css",
    "/animate.min.css",
    "/style.css",
    "/swiper-bundle.min.css",
  ];
  for (const value of cssAssets) {
    useCss(`front-end/assets/css${value}`);
  }

  let jsAssets = ["/swiper-bundle.min.js", "/main.js"];

  for (const value of jsAssets) {
    useScript(`front-end/assets/js${value}`);
  }

  return (
    <>
      <Navbar />
      <Outlet />
      <Footer />
    </>
  );
};

export default FrontendLayout;
