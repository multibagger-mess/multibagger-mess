import Container from "../layout/Container";
import { motion } from "framer-motion";
import { MapPin } from "lucide-react";

import Button from "../ui/Button";
import { HERO_CONTENT } from "../../constants/content";
import { ROUTES } from "../../constants/routes";
import { HERO_STATS } from "../../constants/heroStats";

import HostelGallery from "../ui/HostelGallery";

import { TYPOGRAPHY } from "../../theme/typography";
import { SPACING } from "../../theme/spacing";
import { COMPONENTS } from "../../theme/components";

export default function Hero() {
  return (
    <section
      id="hero"
      className={`bg-gradient-to-br from-slate-50 via-blue-50 to-white pt-24 ${SPACING.sectionLarge}`}
    >
      <Container>

        <div
        className={`
        grid
        grid-cols-1
        lg:grid-cols-[40%_60%]
        ${SPACING.gapLarge}
        items-center
        min-h-[80vh]
        `}
        >

          {/* LEFT COLUMN */}

          <motion.div>

            <div className="inline-flex items-center gap-2 bg-blue-100 text-blue-700 px-4 py-2 rounded-full font-medium">

              <MapPin size={18} />

              {HERO_CONTENT.badge}

            </div>

            <h1 className={`mt-6 ${TYPOGRAPHY.heroTitle} font-extrabold leading-tight text-slate-900`}>

              {HERO_CONTENT.title}

              <span className="block text-blue-600">
                {HERO_CONTENT.subtitle}
              </span>

            </h1>

            <p className={`mt-6 ${TYPOGRAPHY.body} text-slate-600 leading-8 max-w-xl`}>

              {HERO_CONTENT.description}

            </p>

            <div className="mt-8">

              <Button to={ROUTES.REQUEST_ACCESS}>

                {HERO_CONTENT.buttonText}

              </Button>

            </div>

            <p className="mt-6 text-sm text-slate-500">

              {HERO_CONTENT.helperText}

            </p>
            <div
            className={`mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 ${SPACING.gap}`}
            >

  {HERO_STATS.map((item) => (

    <div
      key={item.title}
      className={`
          bg-white
          shadow-lg
          border
          border-slate-100
          ${COMPONENTS.card.small}
          hover:shadow-2xl
          transition-all
          duration-300
          hover:-translate-y-1
      `}
    >

      <div className="text-2xl mb-3">
        {item.icon}
      </div>

      <h3 className="font-semibold text-slate-800">
        {item.title}
      </h3>

      <p className="text-sm text-slate-500 mt-3">
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