import { Link } from "react-router-dom";
import { HERO_CONTENT } from "../../constants/content";
import { ROUTES } from "../../constants/routes";

export default function Hero() {
  return (
    <section
      id="hero"
      className="min-h-screen bg-gradient-to-b from-blue-50 via-white to-white"
    >
      <div className="max-w-7xl mx-auto px-6 pt-36 pb-20">

        <div className="grid lg:grid-cols-2 gap-16 items-center">

          {/* Left Side */}
          <div>

            <p className="text-blue-600 font-semibold mb-6">
              {HERO_CONTENT.badge}
            </p>

            <h1 className="text-5xl lg:text-6xl font-extrabold text-slate-900 leading-tight">
              {HERO_CONTENT.title}
              <br />
              <span className="text-blue-600">
                {HERO_CONTENT.subtitle}
              </span>
            </h1>

            <p className="mt-8 text-lg text-slate-600 leading-8">
              {HERO_CONTENT.description}
            </p>

            <div className="mt-10">
              <Link
                to={ROUTES.REQUEST_ACCESS}
                className="inline-block bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-full font-semibold transition duration-300"
              >
                {HERO_CONTENT.buttonText}
              </Link>
            </div>

            <p className="mt-5 text-sm text-slate-500">
              {HERO_CONTENT.helperText}
            </p>

          </div>

          {/* Right Side */}

          <div className="flex justify-center">

            <div className="w-96 h-96 rounded-3xl bg-blue-100 flex items-center justify-center shadow-xl">

              <h2 className="text-3xl font-bold text-blue-700">

                🏡 Illustration

              </h2>

            </div>

          </div>

        </div>

      </div>
    </section>
  );
}