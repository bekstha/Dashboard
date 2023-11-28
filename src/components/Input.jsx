import React from "react";

const inputClasses =
  "bg-gray-100 rounded-md py-3 px-2 w-full border border-[#e0e0e0] text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md";

const InputLabel = ({ label }) => (
  <label className="block mb-1 text-base font-medium text-left w-24">
    {label}
  </label>
);

const Input = ({
  type = "text",
  onChange,
  defaultValue,
  value,
  placeholder,
}) => (
  <input
    type={type}
    className={inputClasses}
    placeholder={placeholder}
    value={value}
    defaultValue={defaultValue}
    onChange={onChange}
  />
);

const Textarea = ({ rows = 3, onChange, value, placeholder }) => (
  <textarea
    rows={rows}
    className={inputClasses}
    placeholder={placeholder}
    value={value}
    onChange={onChange}
  ></textarea>
);

export { Input, InputLabel, Textarea };
