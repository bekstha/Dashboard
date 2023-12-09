const inputClasses =
  "bg-gray-100 rounded-md py-3 px-2 w-full border border-[#e0e0e0] text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md";

const InputLabel = ({ label }) => (
  <label className="block mb-2 text-sm sm:text-base font-medium text-left w-32">
    {label}
  </label>
);

const Input = ({
  type = "text",
  onChange,
  defaultValue,
  value,
  name,
  placeholder,
}) => (
  <input
    type={type}
    className={inputClasses}
    placeholder={placeholder}
    value={value}
    name={name}
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
