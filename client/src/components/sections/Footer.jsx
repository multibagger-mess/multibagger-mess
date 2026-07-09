import {
    Home,
    MapPin,
    Mail,
    Phone,
    Star,
    ClipboardList,
    ShieldCheck,
} from "lucide-react";
import { Link } from "react-router-dom";

import { FOOTER_CONTENT } from "../../constants/FooterContent";
import { ROUTES } from "../../constants/routes";

export default function Footer() {
  return (
    <footer className="bg-slate-900 text-white mt-24">

      <div className="max-w-7xl mx-auto px-6 py-20">

        <div className="grid md:grid-cols-3 gap-12">

          {/* Brand */}

          <div>

            <div className="flex items-center gap-4">

              <div className="bg-blue-600 p-3 rounded-2xl">

                <Home size={26} />

              </div>

              <div>

                <h2 className="text-2xl font-bold">

                  {FOOTER_CONTENT.name}

                </h2>

                <p className="text-slate-400 mt-2">

                  {FOOTER_CONTENT.tagline}

                </p>

              </div>

            </div>

          </div>

          {/* Quick Links */}

          <div>

            <h3 className="font-semibold text-xl mb-6">

              Quick Links

            </h3>

            <div className="flex flex-col gap-4">

    <Link
        to={ROUTES.HOME}
        className="flex items-center gap-3 hover:text-blue-400 transition"
    >
        <Home size={18} />
        Home
    </Link>

    <a
        href="#why-us"
        className="flex items-center gap-3 hover:text-blue-400 transition"
    >
        <Star size={18} />
        Why Choose Us
    </a>

    <a
        href="#location"
        className="flex items-center gap-3 hover:text-blue-400 transition"
    >
        <MapPin size={18} />
        Location
    </a>

    <Link
        to={ROUTES.REQUEST_ACCESS}
        className="flex items-center gap-3 hover:text-blue-400 transition"
    >
        <ClipboardList size={18} />
        Request Access
    </Link>

    <Link
        to={ROUTES.ADMIN_LOGIN}
        className="
            flex
            items-center
            gap-3
            text-slate-400
            hover:text-white
            transition
        "
    >
        <ShieldCheck size={18} />
        Admin Portal
    </Link>

</div>

          </div>

          {/* Contact */}

          <div>

            <h3 className="font-semibold text-xl mb-6">

              Contact

            </h3>

            <div className="space-y-5">

              <div className="flex gap-3">

                <MapPin className="text-blue-400" />

                <span>{FOOTER_CONTENT.contact[0].value}</span>

              </div>

              <div className="flex gap-3">

                <Mail className="text-blue-400" />

                <span>{FOOTER_CONTENT.contact[1].value}</span>

              </div>

              <div className="flex gap-3">

                <Phone className="text-blue-400" />

                <span>{FOOTER_CONTENT.contact[2].value}</span>

              </div>

            </div>

          </div>

        </div>

        <hr className="my-12 border-slate-700" />

        <div className="text-center text-slate-400">

          {FOOTER_CONTENT.copyright}

          <p className="mt-2 text-sm">

              Built with ❤️ for students.

          </p>

          <p className="mt-2 text-xs text-slate-500">

              Secure access. Student friendly. Privacy protected.

          </p>

        </div>

      </div>

    </footer>
  );
}