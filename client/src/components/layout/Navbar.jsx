import { useState } from "react";
import { Menu, X, House } from "lucide-react";
import { Link } from "react-router-dom";
import { ROUTES } from "../../constants/routes";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 w-full z-50 bg-white/80 backdrop-blur-md border-b border-gray-100">
      <div className="max-w-7xl mx-auto flex items-center justify-between px-6 py-4">

        {/* Logo */}
        <Link to={ROUTES.HOME} className="flex items-center gap-3">

          <div className="bg-blue-600 text-white p-3 rounded-2xl shadow-md">
            <House size={24} />
          </div>

          <div>
            <h1 className="font-bold text-xl text-slate-800">
              The Multi-Bagger Mess
            </h1>

            <p className="text-sm text-gray-500">
              Boys' Hostel • Near J.K. College
            </p>
          </div>

        </Link>

        {/* Desktop Menu */}

        <div className="hidden md:flex items-center gap-8">

          <a href="#why" className="hover:text-blue-600 transition">
            Why Us
          </a>

          <a href="#location" className="hover:text-blue-600 transition">
            Location
          </a>

          <a href="#process" className="hover:text-blue-600 transition">
            Process
          </a>

          <Link
            to="/request-access"
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-full font-medium transition duration-300"
          >
            Request Access
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

            <a href="#why">Why Us</a>

            <a href="#location">Location</a>

            <a href="#process">Process</a>

            <Link
              to={ROUTES.REQUEST_ACCESS}
              className="bg-blue-600 text-white text-center rounded-full py-3"
            >
              Request Access
            </Link>

          </div>

        </div>

      )}

    </nav>
  );
}