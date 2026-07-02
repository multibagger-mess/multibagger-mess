import { Home, MapPin, Mail, Phone } from "lucide-react";
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

              {FOOTER_CONTENT.quickLinks.map((link) =>

                link.href.startsWith("/") ? (

                  <Link
                    key={link.name}
                    to={ROUTES.REQUEST_ACCESS}
                    className="hover:text-blue-400 transition"
                  >
                    {link.name}
                  </Link>

                ) : (

                  <a
                    key={link.name}
                    href={link.href}
                    className="hover:text-blue-400 transition"
                  >
                    {link.name}
                  </a>

                )

              )}

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

          <p className="mt-2">

            Built with ❤️ for students.

          </p>

        </div>

      </div>

    </footer>
  );
}