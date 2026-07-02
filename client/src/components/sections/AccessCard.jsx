import {
  Wallet,
  BedSingle,
  MapPin,
  Phone,
  Utensils,
  ShieldCheck,
  Lock,
} from "lucide-react";

const ICONS = {
  Wallet,
  BedSingle,
  MapPin,
  Phone,
  Utensils,
  ShieldCheck,
};

export default function AccessCard({
  title,
  description,
  icon,
}) {
  const Icon = ICONS[icon];

  return (
    <div
      className="
        group
        bg-white
        rounded-3xl
        border
        border-slate-200
        p-7
        shadow-sm
        hover:shadow-xl
        hover:-translate-y-2
        transition-all
        duration-300
      "
    >
      <div className="flex items-center justify-between">

        <div className="w-14 h-14 rounded-2xl bg-blue-100 flex items-center justify-center">

          {Icon && (
            <Icon className="text-blue-600" size={28} />
          )}

        </div>

        <Lock
          size={18}
          className="text-slate-400 group-hover:text-blue-600 transition"
        />

      </div>

      <h3 className="mt-6 text-xl font-semibold text-slate-900">

        {title}

      </h3>

      <p className="mt-3 text-slate-600 leading-7">

        {description}

      </p>

    </div>
  );
}