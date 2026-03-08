import React from "react";

const SubmitBtn = (props) => {
  const { value = "Submit", className = "" } = props;
  return (
    <div className="mb-1 mt-2">
      {/* Input Submit */}
      <input
        className={`w-full bg-gray-800 hover:bg-gray-900 text-white px-5 py-2 rounded font-semibold 
          cursor-pointer ${className}`}
        type="submit"
        value={value}
      />
    </div>
  );
};

export default SubmitBtn;
