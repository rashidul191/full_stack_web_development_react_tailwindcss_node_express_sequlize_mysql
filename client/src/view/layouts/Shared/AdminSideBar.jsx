import React from "react";
import { NavLink } from "react-router-dom";

export default function AdminSideBar() {
  return (
    <ul className="menu w-full grow">
      {/* Dashboard */}
      <li>
        <NavLink
          to="dashboard"
          className={({ isActive }) =>
            `hover:bg-gray-600 hover:text-white ${
              isActive ? "bg-gray-600 text-white" : ""
            }`
          }
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            strokeWidth="2"
            fill="none"
            stroke="currentColor"
            className="size-4"
          >
            <path d="M3 10l9-7 9 7v11a2 2 0 0 1-2 2h-4v-7H9v7H5a2 2 0 0 1-2-2z" />
          </svg>

          <span>Dashboard</span>
        </NavLink>
      </li>

      {/* Settings Dropdown */}
      <li>
        <details>
          <summary>
            {/* icon */}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              strokeWidth="2"
              fill="none"
              stroke="currentColor"
              className="size-4"
            >
              <circle cx="12" cy="12" r="3" />
              <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 1 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 1 1-4 0v-.09a1.65 1.65 0 0 0-1-1.51 1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 1 1-2.83-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 1 1 0-4h.09a1.65 1.65 0 0 0 1.51-1 1.65 1.65 0 0 0-.33-1.82l-.06-.06A2 2 0 1 1 7.04 3.3l.06.06c.5.5 1.24.66 1.82.33h0A1.65 1.65 0 0 0 10 2.18V2a2 2 0 1 1 4 0v.09c0 .69.39 1.31 1 1.51.58.24 1.32.17 1.82-.33l.06-.06A2 2 0 1 1 21.7 7.04l-.06.06c-.5.5-.66 1.24-.33 1.82.2.61.82 1 1.51 1H22a2 2 0 1 1 0 4h-.09c-.69 0-1.31.39-1.51 1z" />
            </svg>

            <span>Settings</span>
          </summary>

          <ul>
            <li>
              <NavLink
                to="setting/general"
                className={({ isActive }) =>
                  `hover:bg-gray-600 hover:text-white ${
                    isActive ? "bg-gray-600 text-white" : ""
                  }`
                }
              >
                General Setting
              </NavLink>
            </li>
            <li>
              <NavLink
                to="setting/social-links"
                className={({ isActive }) =>
                  `hover:bg-gray-600 hover:text-white ${
                    isActive ? "bg-gray-600 text-white" : ""
                  }`
                }
              >
                Social Links
              </NavLink>
            </li>
            <li>
              <NavLink
                to="setting/profile"
                className={({ isActive }) =>
                  `hover:bg-gray-600 hover:text-white ${
                    isActive ? "bg-gray-600 text-white" : ""
                  }`
                }
              >
                Profile Setting
              </NavLink>
            </li>
          </ul>
        </details>
      </li>
    </ul>
  );
}
