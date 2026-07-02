import { motion } from "framer-motion";
import { MapPin } from "lucide-react";

import Button from "../ui/Button";
import { HERO_CONTENT } from "../../constants/content";
import { ROUTES } from "../../constants/routes";
import { HERO_STATS } from "../../constants/heroStats";

export default function Hero() {
  return (
    <section
      id="hero"
      className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-white pt-28"
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-8">

        <div className="grid lg:grid-cols-2 gap-14 items-center min-h-[85vh]">

          {/* LEFT COLUMN */}

          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >

            <div className="inline-flex items-center gap-2 bg-blue-100 text-blue-700 px-4 py-2 rounded-full font-medium">

              <MapPin size={18} />

              {HERO_CONTENT.badge}

            </div>

            <h1 className="mt-8 text-5xl lg:text-6xl font-extrabold leading-tight text-slate-900">

              {HERO_CONTENT.title}

              <span className="block text-blue-600">
                {HERO_CONTENT.subtitle}
              </span>

            </h1>

            <p className="mt-8 text-lg text-slate-600 leading-8 max-w-xl">

              {HERO_CONTENT.description}

            </p>

            <div className="mt-10">

              <Button to={ROUTES.REQUEST_ACCESS}>

                {HERO_CONTENT.buttonText}

              </Button>

            </div>

            <p className="mt-5 text-sm text-slate-500">

              {HERO_CONTENT.helperText}

            </p>
            <div className="mt-10 grid gap-4 sm:grid-cols-3">

  {HERO_STATS.map((item) => (

    <div
      key={item.title}
      className="rounded-2xl bg-white shadow-md p-5 border border-slate-100"
    >

      <div className="text-3xl mb-3">
        {item.icon}
      </div>

      <h3 className="font-semibold text-slate-800">
        {item.title}
      </h3>

      <p className="text-sm text-slate-500 mt-2">
        {item.description}
      </p>

    </div>

  ))}

</div>

          </motion.div>

          {/* RIGHT COLUMN */}

          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="flex justify-center"
          >

            <div className="w-full max-w-md aspect-square rounded-3xl bg-gradient-to-br from-blue-100 to-blue-200 shadow-2xl flex items-center justify-center">

              <div className="text-center">

                <div className="text-7xl mb-5">
                  🏡
                </div>

                <h2 className="text-2xl font-bold text-slate-700">
                  Hostel Illustration
                </h2>

                <p className="text-slate-500 mt-2">
                  Custom SVG Coming Soon
                </p>

              </div>

            </div>

          </motion.div>

        </div>

      </div>

    </section>
  );
}