import React, { useEffect, useState } from "react";
import logo from "../../assets/logo.png";
import { getBusinessSettings } from "../../utility/businessSetting";
import { imageUrl } from "../../utility/imageUrl";

const ApplicationLogo = (props) => {
  const { className = "" } = props;

  const [businessSetting, setBusinessSetting] = useState({});

  useEffect(() => {
    const fetchSettings = async () => {
      const settings = await getBusinessSettings();
      setBusinessSetting(settings);
    };
    fetchSettings();
  }, []);

  return (
    <>
      <div className="w-full flex justify-center items-center">
        <img
          className={`w-auto p-4 ${className}`}
          src={imageUrl(businessSetting.logo) ?? logo}
          alt="Logo"
        />
      </div>
    </>
  );
};

export default ApplicationLogo;
