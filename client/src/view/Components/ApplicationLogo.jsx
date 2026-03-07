import React from "react";
import logo from "../../assets/logo.png";

const ApplicationLogo = (props) => {
  const { className = "" } = props;
  return (
    <>
      <div className="w-full flex justify-center items-center">
        <img
          className={`w-auto p-4 ${className}`}
          src={logo}
          alt="Company Logo"
        />
      </div>
    </>
  );
};

export default ApplicationLogo;
