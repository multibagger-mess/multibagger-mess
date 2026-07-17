import Container from "../layout/Container";
import { motion } from "framer-motion";
import { MapPin } from "lucide-react";

import Button from "../ui/Button";
import { HERO_CONTENT } from "../../constants/content";
import { ROUTES } from "../../constants/routes";
import { HERO_STATS } from "../../constants/heroStats";

import HostelGallery from "../ui/HostelGallery";

export default function Hero() {
  return (
    <section
      id="hero"
      className="bg-gradient-to-br from-slate-50 via-blue-50 to-white pt-28 pb-20"
    >
      <Container>

        <div className="
                          grid
                          grid-cols-1
                          lg:grid-cols-[38%_62%]
                          gap-10
                          lg:gap-14
                          items-center
                          min-h-[88vh]
                          ">

          {/* LEFT COLUMN */}

          <motion.div>

            <div className="inline-flex items-center gap-2 bg-blue-100 text-blue-700 px-4 py-2 rounded-full font-medium">

              <MapPin size={18} />

              {HERO_CONTENT.badge}

            </div>

            <h1 className="mt-8 text-3xl
                                sm:text-4xl
                                md:text-5xl
                                xl:text-6xl
                                2xl:text-7xl font-extrabold leading-tight text-slate-900">

              {HERO_CONTENT.title}

              <span className="block text-blue-600">
                {HERO_CONTENT.subtitle}
              </span>

            </h1>

            <p className="mt-8 text-base
                                sm:text-lg
                                xl:text-xl text-slate-600 leading-8 xl:leading-9 max-w-2xl">

              {HERO_CONTENT.description}

            </p>

            <div className="mt-12">

              <Button to={ROUTES.REQUEST_ACCESS}>

                {HERO_CONTENT.buttonText}

              </Button>

            </div>

            <p className="mt-6 text-sm text-slate-500">

              {HERO_CONTENT.helperText}

            </p>
            <div className="mt-12 grid grid-cols-1
                                        sm:grid-cols-2
                                        lg:grid-cols-3 gap-6">

  {HERO_STATS.map((item) => (

    <div
      key={item.title}
      className="rounded-3xl bg-white shadow-lg p-6 border border-slate-100 hover:shadow-2xl transition-all duration-300 hover:-translate-y-1"
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

          <motion.div>

            <div className="w-full max-w-none">

                <HostelGallery />

            </div>

          </motion.div>

        </div>

      </Container>

    </section>
  );
}