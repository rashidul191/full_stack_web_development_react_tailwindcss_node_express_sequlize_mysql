
import React from "react";
import '../FrontEnd/assets/css/flaticon.css';
import '../FrontEnd/assets/css/all.min.css';
import '../FrontEnd/assets/css/themify-icons.css';
import '../FrontEnd/assets/css/animate.min.css';
import '../FrontEnd/assets/css/style.css';
import '../FrontEnd/assets/css/swiper-bundle.min.css';
import '../FrontEnd/assets/css/glightbox.min.css';
import '../FrontEnd/assets/css/aos.css';
  
    // <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/@fortawesome/fontawesome-free@7.1.0/css/all.min.css"
    //     fetchpriority="high">
    // <link rel="stylesheet" href="/assets/css/themify-icons.css">
    // <link rel="stylesheet" href="/assets/css/animate.min.css">
    // <link rel="stylesheet" href="/assets/css/style.css">

 
    // <link rel="stylesheet" href="/assets/css/swiper-bundle.min.css" media="print" onload="this.media='all'">
    // <link rel="stylesheet" href="/assets/css/glightbox.min.css" media="print" onload="this.media='all'">
    // <link rel="stylesheet" href="/assets/css/aos.css" media="print" onload="this.media='all'"></link>
import { Outlet } from "react-router-dom";
import Navbar from "../FrontEnd/Common/Navbar";
import Footer from "../FrontEnd/Common/Footer";

const FrontLayout = () => {
  return (
    <>
      <Navbar />
      <Outlet />
      <Footer />
    </>
  );
};

export default FrontLayout;
