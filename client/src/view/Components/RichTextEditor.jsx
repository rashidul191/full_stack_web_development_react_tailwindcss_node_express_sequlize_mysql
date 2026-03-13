import React from "react";
import { Controller } from "react-hook-form";
import JoditEditor from "jodit-react";

export default function RichTextEditor({
  name,
  label,
  control,
  errors,
  required = false,
  className = "",
}) {
  return (
    <div className={`w-full p-1 ${className}`}>
      {label && <label className="block mb-1 font-medium">{label}</label>}

      <Controller
        name={name}
        control={control}
        defaultValue=""
        rules={{
          validate: required
            ? (value) =>
                (value && value !== "<p><br></p>") ||
                `${label || name} is required`
            : undefined,
        }}
        render={({ field }) => (
          <JoditEditor
            value={field.value}
            onBlur={(newContent) => field.onChange(newContent)}
          />
        )}
      />

      {errors?.[name] && (
        <p className="text-red-500 text-sm mt-1">{errors[name].message}</p>
      )}
    </div>
  );
}
