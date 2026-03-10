import React, { useContext } from "react";
import { NavLink } from "react-router-dom";
import { AuthContext } from "../../../context/AuthContext";

const Navbar = () => {
  const userInfo = useContext(AuthContext);
  // const email = userInfo?.auth?.auth?.email;
  const { auth, logoutUser } = userInfo;

  console.log(auth);

  const menuLinks = (
    <>
      <li>
        <NavLink to="/">Home</NavLink>
      </li>

      <li>
        <details>
          <summary>Parent</summary>
          <ul className="p-2 bg-base-100 w-40 z-1">
            <li>
              <a>Submenu 1</a>
            </li>
            <li>
              <a>Submenu 2</a>
            </li>
          </ul>
        </details>
      </li>

      <li>
        <NavLink to="/about">About</NavLink>
      </li>
    </>
  );

  console.log(menuLinks, logoutUser);

  return (
    <>
      {/* <div id="preloader-active">
        <div className="preloader d-flex align-items-center justify-content-center">
          <div className="preloader-inner position-relative">
            <div className="preloader-circle"></div>
            <div className="preloader-img pere-text">
              <img
                src="https://preview.colorlib.com/theme/consultingbiz/assets/img/logo/loder.webp"
                alt="Loading"
                width="150"
                height="30"
                fetchPriority="high"
                decoding="sync"
              />
            </div>
          </div>
        </div>
      </div> */}
      <header>
        <div className="header-area">
          <div className="main-header ">
            <div className="header-top d-none d-lg-block">
              <div className="container">
                <div className="row align-items-center">
                  <div className="col-xl-6 col-lg-6">
                    <div className="header-info-left">
                      <ul>
                        <li>
                          <i className="far fa-clock"></i> Mon - SAT: 6.00 am -
                          10.00 pm
                        </li>
                        <li>Sun: Closed</li>
                      </ul>
                    </div>
                  </div>
                  <div className="col-xl-6 col-lg-6">
                    <div className="header-info-right">
                      <ul className="header-social">
                        <li>
                          <a href="#" aria-label="Facebook">
                            <i className="fab fa-facebook-f"></i>
                          </a>
                        </li>
                        <li>
                          <a href="#" aria-label="Twitter">
                            <i className="fab fa-twitter"></i>
                          </a>
                        </li>
                        <li>
                          <a href="#" aria-label="LinkedIn">
                            <i className="fab fa-linkedin-in"></i>
                          </a>
                        </li>
                        <li>
                          <a href="#" aria-label="Google Plus">
                            <i className="fab fa-google-plus-g"></i>
                          </a>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="header-bottom  header-sticky">
              <div className="container">
                <div className="row align-items-center">
                  <div className="col-xl-2 col-lg-2">
                    <div className="logo">
                      <a
                        href="https://preview.colorlib.com/theme/consultingbiz/index.html"
                        aria-label="ConsultingBiz Home"
                      >
                        <img
                          src="https://preview.colorlib.com/theme/consultingbiz/assets/img/logo/logo.webp"
                          alt="ConsultingBiz"
                          width="150"
                          height="30"
                          fetchPriority="high"
                          decoding="sync"
                        />
                      </a>
                    </div>
                  </div>
                  <div className="col-xl-10 col-lg-10">
                    <div className="menu-wrapper  d-flex align-items-center justify-content-end">
                      <div className="main-menu d-none d-lg-block">
                        <nav>
                          <ul id="navigation">
                            <li>
                              <a href="https://preview.colorlib.com/theme/consultingbiz/index.html">
                                Home
                              </a>
                            </li>
                            <li>
                              <a href="https://preview.colorlib.com/theme/consultingbiz/about.html">
                                About
                              </a>
                              <ul className="submenu">
                                <li>
                                  <a href="https://preview.colorlib.com/theme/consultingbiz/about.html">
                                    About Us
                                  </a>
                                </li>
                                <li>
                                  <a href="https://preview.colorlib.com/theme/consultingbiz/testimonials.html">
                                    Testimonials
                                  </a>
                                </li>
                              </ul>
                            </li>
                            <li>
                              <a href="https://preview.colorlib.com/theme/consultingbiz/services.html">
                                Services
                              </a>
                              <ul className="submenu">
                                <li>
                                  <a href="https://preview.colorlib.com/theme/consultingbiz/services.html">
                                    All Services
                                  </a>
                                </li>
                                <li>
                                  <a href="https://preview.colorlib.com/theme/consultingbiz/service_details.html">
                                    Service Details
                                  </a>
                                </li>
                              </ul>
                            </li>
                            <li>
                              <a href="https://preview.colorlib.com/theme/consultingbiz/portfolio.html">
                                Portfolio
                              </a>
                            </li>
                            <li>
                              <a href="https://preview.colorlib.com/theme/consultingbiz/blog.html">
                                Blog
                              </a>
                              <ul className="submenu">
                                <li>
                                  <a href="https://preview.colorlib.com/theme/consultingbiz/blog.html">
                                    Blog
                                  </a>
                                </li>
                                <li>
                                  <a href="https://preview.colorlib.com/theme/consultingbiz/blog_details.html">
                                    Blog Details
                                  </a>
                                </li>
                              </ul>
                            </li>
                            <li>
                              <a href="https://preview.colorlib.com/theme/consultingbiz/contact.html">
                                Contact
                              </a>
                              <ul className="submenu">
                                <li>
                                  <a href="https://preview.colorlib.com/theme/consultingbiz/contact.html">
                                    Contact
                                  </a>
                                </li>
                                <li>
                                  <a href="https://preview.colorlib.com/theme/consultingbiz/careers.html">
                                    Careers
                                  </a>
                                </li>
                              </ul>
                            </li>
                          </ul>
                        </nav>
                      </div>
                    </div>
                  </div>

                  <div className="col-12">
                    <div className="mobile_menu d-block d-lg-none"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>
    </>
  );
};

export default Navbar;
