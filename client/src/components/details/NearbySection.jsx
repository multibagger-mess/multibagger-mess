import { motion } from "framer-motion";

import NearbyCard from "./NearbyCard";
import { NEARBY_PLACES } from "../../constants/nearbyContent";

export default function NearbySection() {
  return (
    <section id="nearby" className="mt-24">

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
        className="text-center"
      >

        <p className="text-blue-600 font-semibold tracking-widest uppercase">
          Prime Location
        </p>

        <h2 className="mt-3 text-4xl font-bold text-slate-900">
          Nearby Essentials
        </h2>

        <p className="mt-4 max-w-3xl mx-auto text-lg text-slate-600 leading-8">
          Everything a student needs is only a few minutes away from
          <strong> The Multi-Bagger Mess</strong>.
          Spend less time travelling and more time studying.
        </p>

      </motion.div>

      <div className="grid lg:grid-cols-2 xl:grid-cols-3 gap-8 mt-14">

        {NEARBY_PLACES.map((place, index) => (

          <motion.div
            key={place.title}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{
              delay: index * 0.12,
              duration: 0.5,
            }}
            viewport={{ once: true }}
          >

            <NearbyCard {...place} />

          </motion.div>

        ))}

      </div>

    </section>
  );
}