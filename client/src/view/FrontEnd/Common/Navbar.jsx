import React, { useContext } from "react";
import { NavLink } from "react-router-dom";
import { AuthContext } from "../../../context/AuthContext";
import ApplicationLogo from "../../Components/ApplicationLogo";
import { useApiHook } from "../../../hook/customHook";
import { CommonStatus } from "../../../enum/commonStatus";

const Navbar = () => {
  // const userInfo = useContext(AuthContext);
  // const email = userInfo?.auth?.auth?.email;
  const { data: menus } = useApiHook("/admin/menu");
  const topMenus = menus
    ?.sort((a, b) => a.serial - b.serial)
    ?.filter(
      (item) => item.parent_id === null && item?.status === CommonStatus.Active,
    );
  // const { auth, logoutUser } = userInfo;

  const menuLinks = (
    <>
      <li>
        <NavLink to="/">Home</NavLink>
      </li>

      {topMenus?.map((item) => (
        <li key={item?.id}>
          <NavLink to={item?.slug}>{item?.name}</NavLink>
          {item?.children?.length > 0 ? (
            <ul className="submenu">
              <li key={item?.id}>
                {item?.children
                  ?.sort((x, y) => x.serial - y.serial)
                  ?.map((subMenu) => (
                    <NavLink to={`${item.slug}/${subMenu.slug}`}>
                      {subMenu?.name}
                    </NavLink>
                  ))}
              </li>
            </ul>
          ) : (
            ""
          )}
        </li>
      ))}

      <li>
        <NavLink to="/blog">Blog</NavLink>
      </li>
      <li>
        <NavLink to="/contact-us">Contact</NavLink>
        {/* <ul className="submenu">
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
        </ul> */}
      </li>
    </>
  );

  // console.log(menuLinks, logoutUser);

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
          <div className="main-header">
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
                      <NavLink to="/">
                        {/* <img
                          src="https://preview.colorlib.com/theme/consultingbiz/assets/img/logo/logo.webp"
                          alt=""
                          width="150"
                          height="30"
                          fetchPriority="high"
                          decoding="sync"
                        /> */}
                        <ApplicationLogo className="h-24"></ApplicationLogo>
                      </NavLink>
                    </div>
                  </div>
                  <div className="col-xl-10 col-lg-10">
                    <div className="menu-wrapper  d-flex align-items-center justify-content-end">
                      <div className="main-menu d-none d-lg-block">
                        <nav>
                          <ul id="navigation">{menuLinks}</ul>
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
