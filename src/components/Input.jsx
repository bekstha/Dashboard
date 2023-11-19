import React from "react";

const inputClasses =
  "bg-gray-100 rounded-md py-1.5 px-2 w-full border-0 outline outline-1 outline-gray-600 focus:outline-blue-400 transition-all duration-100";

const InputLabel = ({ label }) => (
  <label className="block mb-1 text-md text-left">{label}</label>
);

const Input = ({ type = "text", onChange, value, placeholder }) => (
  <input
    type={type}
    className={inputClasses}
    placeholder={placeholder}
    value={value}
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