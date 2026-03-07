import React, { useContext, useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import ApplicationLogo from "../Components/ApplicationLogo";
import Navbar from "./Shared/Navbar";
import { AuthContext } from "../../context/AuthContext";
import AdminSideBar from "./Shared/AdminSideBar";

const AdminLayout = () => {
  const userInfo = useContext(AuthContext);
  const [drawerOpen, setDrawerOpen] = useState(false);

  useEffect(() => {
    if (window.innerWidth >= 1024) {
      setDrawerOpen(true); // large screen open
    }
  }, []);
  return (
    <>
      <div className="drawer lg:drawer-open">
        <input
          id="my-drawer-4"
          type="checkbox"
          className="drawer-toggle"
          checked={drawerOpen}
          onChange={() => setDrawerOpen(!drawerOpen)}
        />
        <div className="drawer-content">
          {/* Navbar */}
          <Navbar userInfo={userInfo}></Navbar>
          {/* Page content here */}
          <div className="p-5">
            <Outlet />
          </div>
        </div>

        <div className="drawer-side is-drawer-close:overflow-visible">
          <label
            htmlFor="my-drawer-4"
            aria-label="close sidebar"
            className="drawer-overlay"
          ></label>
          <div className="flex min-h-full flex-col items-start bg-base-200 is-drawer-close:w-14 is-drawer-open:w-64">
            <div className="w-full flex justify-end p-3  md:hidden">
              <button
                className="bg-red-500 text-white rounded-full"
                onClick={() => setDrawerOpen(!drawerOpen)}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke-width="1.5"
                  stroke="currentColor"
                  class="size-6"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="m9.75 9.75 4.5 4.5m0-4.5-4.5 4.5M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                  />
                </svg>
              </button>
            </div>
            <ApplicationLogo className="h-24" />

            {/* Sidebar content here */}
            <AdminSideBar />
          </div>
        </div>
      </div>
    </>
  );
};

export default AdminLayout;
