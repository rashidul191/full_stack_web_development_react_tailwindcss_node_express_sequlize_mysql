import React from "react";

import defaultAvatar from "../../../../src/assets/avatar.png";
import { getRoleName } from "../../../utility/roles";

export default function Navbar(props) {
  const { auth, logoutUser } = props.userInfo;
  const user = auth?.auth;
  return (
    <nav className="navbar w-full bg-base-300 px-3">
      {/* Sidebar toggle */}
      <label htmlFor="my-drawer-4" className="btn btn-square btn-ghost">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          strokeLinejoin="round"
          strokeLinecap="round"
          strokeWidth="2"
          fill="none"
          stroke="currentColor"
          className="size-6"
        >
          <path d="M4 4m0 2a2 2 0 0 1 2 -2h12a2 2 0 0 1 2 2v12a2 2 0 0 1 -2 2h-12a2 2 0 0 1 -2 -2z"></path>
          <path d="M9 4v16"></path>
          <path d="M14 10l2 2l-2 2"></path>
        </svg>
      </label>

      {/* Right side */}
      <div className="flex w-full justify-end items-center">
        <div className="dropdown dropdown-end">
          {/* Profile Button */}
          <div
            tabIndex={0}
            role="button"
            className="flex items-center gap-3 cursor-pointer"
          >
            <div className="avatar">
              <div className="w-10 rounded-full">
                <img src={user?.avatar ?? defaultAvatar} alt="profile" />
              </div>
            </div>

            <div className="hidden md:block text-left">
              <p className="font-semibold leading-none">{user?.name}</p>
              <span className="text-xs opacity-70">
                {getRoleName(user?.role)}
              </span>
            </div>
          </div>

          {/* Dropdown menu */}
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content mt-3 w-52 rounded-box bg-base-100 shadow"
          >
            {/* <li>
              <span>{user?.username}</span>
            </li> */}
            {/* <li>
              <span>{user?.email}</span>
            </li> */}
            <li>
              <button className="bg-red-500 text-white" onClick={logoutUser}>
                Logout
              </button>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}
