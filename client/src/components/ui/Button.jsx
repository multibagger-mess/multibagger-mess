import { Link } from "react-router-dom";

export default function Button({
  children,
  to,
  variant = "primary",
  className = "",
  type = "button",
  disabled = false,
  onClick,
}) {
  const baseClasses =
"inline-flex items-center justify-center gap-2 rounded-full px-8 py-4 font-semibold transition-all duration-300 cursor-pointer active:scale-95 disabled:cursor-not-allowed disabled:opacity-60";

  const variants = {
    primary:
      "bg-gradient-to-r from-blue-600 to-blue-700 text-white shadow-lg hover:shadow-2xl hover:-translate-y-0.5",

    secondary:
      "border border-blue-600 bg-white text-blue-600 hover:bg-blue-50 hover:-translate-y-0.5",
  };

  if (to) {
    return (
      <Link
        to={to}
        className={`${baseClasses} ${variants[variant]} ${className}`}
      >
        {children}
      </Link>
    );
  }

  return (
    <button
    type={type}
    disabled={disabled}
    onClick={onClick}
    className={`${baseClasses} ${variants[variant]} ${className}`}
>
      {children}
    </button>
  );
}