import { motion } from "framer-motion";
import {
  MapPin,
  Bike,
  Footprints,
  ArrowUpRight,
} from "lucide-react";

export default function NearbyCard({
  icon,
  title,
  subtitle,
  toto,
  bike,
  walk,
  mapLink,
}) {
  return (
    <motion.div
      whileHover={{
        y: -8,
        scale: 1.02,
      }}
      transition={{
        duration: 0.25,
      }}
      className="
        bg-white
        rounded-3xl
        shadow-lg
        border
        border-slate-200
        p-6
      "
    >
      <div className="flex items-center gap-4">
        <div className="text-5xl">
          {icon}
        </div>

        <div>
          <h3 className="text-2xl font-bold text-slate-800">
            {title}
          </h3>

          {subtitle && (
            <p className="text-slate-500 text-sm">
              {subtitle}
            </p>
          )}
        </div>
      </div>

      <div className="mt-8 space-y-4">

        <div className="flex justify-between items-center">
          <div className="flex items-center gap-2">
            <MapPin
              size={20}
              className="text-green-600"
            />
            <span>E-Rickshaw</span>
          </div>

          <strong>{toto}</strong>
        </div>

        <div className="flex justify-between items-center">
          <div className="flex items-center gap-2">
            <Bike
              size={20}
              className="text-blue-600"
            />
            <span>Bike</span>
          </div>

          <strong>{bike}</strong>
        </div>

        <div className="flex justify-between items-center">
          <div className="flex items-center gap-2">
            <Footprints
              size={20}
              className="text-orange-500"
            />
            <span>Walk</span>
          </div>

          <strong>{walk}</strong>
        </div>

      </div>

      {mapLink && (
        <a
          href={mapLink}
          target="_blank"
          rel="noreferrer"
          className="
            mt-8
            flex
            items-center
            justify-center
            gap-2
            rounded-xl
            bg-blue-600
            hover:bg-blue-700
            text-white
            py-3
            font-semibold
            transition
            cursor-pointer
          "
        >
          View on Google Maps

          <ArrowUpRight size={18} />
        </a>
      )}
    </motion.div>
  );
}