import { useState } from "react";
import { Menu, X, House } from "lucide-react";
import { Link } from "react-router-dom";
import { ROUTES } from "../../constants/routes";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 w-full z-50 bg-white/80 backdrop-blur-md border-b border-gray-100">
      <div className="max-w-7xl mx-auto flex items-center justify-between px-4 sm:px-6 lg:px-8 py-4">

        {/* Logo */}
        <Link to={ROUTES.HOME} className="flex items-center gap-3">

          <div className="bg-blue-600 text-white p-2.5 sm:p-3 rounded-2xl shadow-md">
            <House className="w-5 h-5 sm:w-6 sm:h-6" />
          </div>

          <div>
            <h1 className="font-bold text-base sm:text-lg md:text-xl text-slate-800 leading-tight">
              The Multi-Bagger Mess
            </h1>

            <p className="hidden sm:block text-xs md:text-sm text-gray-500">
              Boys' Hostel • Near J.K. College
            </p>
          </div>

        </Link>

        {/* Desktop Menu */}

<div className="hidden md:flex items-center gap-8">

    <a
        href="#why"
        className="hover:text-blue-600 transition"
    >
        Why Us
    </a>

    <a
        href="#location"
        className="hover:text-blue-600 transition"
    >
        Location
    </a>

    <Link
    to={ROUTES.REQUEST_ACCESS}
    className="
        bg-blue-600
        hover:bg-blue-700
        hover:scale-105
        text-white
        px-6
        py-3
        rounded-full
        font-medium
        transition
        duration-300
        cursor-pointer
    "
>
    Request Access
</Link>

<Link
    to={ROUTES.ACCESS_DETAILS}
    className="
        border
        border-blue-600
        text-blue-600
        hover:bg-blue-50
        px-6
        py-3
        rounded-full
        font-medium
        transition-all
        duration-300
        hover:scale-105
        cursor-pointer
    "
>
    View Hostel Details
</Link>

</div>

        {/* Mobile Button */}

        <button
          className="md:hidden"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          {menuOpen ? <X size={28} /> : <Menu size={28} />}
        </button>

      </div>

      {/* Mobile Menu */}

      {menuOpen && (

        <div className="md:hidden bg-white border-t">

          <div className="flex flex-col px-6 py-6 gap-5">

            <a href="#why">Why Choose Us</a>

            <a href="#location">Location</a>

            <Link
    to={ROUTES.REQUEST_ACCESS}
    className="
        bg-blue-600
        text-white
        text-center
        rounded-full
        py-3
        font-medium
    "
>
    Request Access
</Link>

<Link
    to={ROUTES.ACCESS_DETAILS}
    className="
        text-center
        rounded-full
        py-3
        border
        border-blue-200
        text-blue-600
        font-medium
    "
>
    View Hostel Details
</Link>

          </div>

        </div>

      )}

    </nav>
  );
}