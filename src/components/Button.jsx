const btnClasses = "w-32 md:w-32 text-lg rounded-md duration-200";

const colors = {
  blue: "border-blue-600 bg-blue-600 hover:bg-blue-500 hover:border-blue-500",
  orange:
    "border-orange-600 bg-orange-600 hover:bg-orange-500 hover:border-orange-500 text-white",
  pink: "border-pink-600 bg-pink-600 hover:bg-pink-500 hover:border-pink-500",
};

const sizes = {
  small: " p-1 text-md",
  default: "p-3 text-sm",
  large: "px-5 py-2",
};

const Button = ({
  children,
  href,
  className,
  title,
  color = "orange",
  size = "default",
  isExternal = false,
  outlined = false,
  onClick,
}) => {
  let colorClasses = colors[color];
  let sizeClasses = sizes[size];

  if (href)
    return (
      <a
        href={href}
        className={`${btnClasses} ${colorClasses} ${sizeClasses} ${className}`}
        title={title}
        target={isExternal ? "_blank" : ""}
        rel={isExternal ? "noopener noreferrer" : ""}
      >
        {children}
      </a>
    );

  return (
    <button
      title={title}
      className={`border-1 ${btnClasses} ${colorClasses} ${sizeClasses} ${
        outlined
          ? "bg-transparent hover:bg-red-400 "
          : ""
      } ${className}`}
      onClick={() => onClick && onClick()}
    >
      {children}
    </button>
  );
};

export default Button;
