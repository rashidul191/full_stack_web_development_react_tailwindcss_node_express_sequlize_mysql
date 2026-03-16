import React from "react";

const LabeledSelected = (props) => {
  const {
    label,
    name,
    register,
    required = false,
    errors,
    className = "",
    children,
  } = props;

  const nameText = name
    .replace(/([A-Z])/g, " $1")
    .replace(/_/g, " ")
    .replace(/\b\w/g, (char) => char.toUpperCase())
    .trim();

  const finalLabel = label || nameText;

  return (
    <div className={`mb-2 ${className}`}>
      {/* Label */}
      <label htmlFor={name} className="label mb-0.5">
        <span className="label-text text-gray-800 font-semibold">
          {finalLabel}
          {required && <span className="text-red-500 ml-1">*</span>}
        </span>
      </label>

      <div className="relative">
        <select
          id={name}
          className="select select-bordered w-full border-2 border-gray-600"
          {...register(name)}
        >
          {children}
        </select>
      </div>

      {/* Error Message */}
      {errors?.[name] && (
        <label className="label w-full">
          <span className="label-text-alt text-red-500">
            {errors[name]?.message}
          </span>
        </label>
      )}
    </div>
  );
};

export default LabeledSelected;
