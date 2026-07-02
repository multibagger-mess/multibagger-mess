import {
  BookOpen,
  BedSingle,
  MapPinned,
  ShieldCheck,
} from "lucide-react";

const ICONS = {
  BookOpen,
  BedSingle,
  MapPinned,
  ShieldCheck,
};

export default function WhyChooseCard({
  title,
  icon,
  points,
}) {
  const Icon = ICONS[icon];

  return (
    <div
      className="
        bg-white
        rounded-3xl
        border
        border-slate-200
        p-8
        shadow-sm
        hover:shadow-2xl
        hover:-translate-y-2
        hover:border-blue-200
        transition-all
        duration-300
      "
    >
      <div className="w-16 h-16 rounded-2xl bg-blue-100 flex items-center justify-center">
        {Icon && (
          <Icon
            size={30}
            className="text-blue-600"
          />
        )}
      </div>

      <h3 className="mt-6 text-2xl font-semibold text-slate-900">
        {title}
      </h3>

      <ul className="mt-6 space-y-3">
        {points.map((point) => (
          <li
            key={point}
            className="flex items-center gap-3 text-slate-600"
          >
            <span className="text-blue-600 font-bold">✓</span>
            {point}
          </li>
        ))}
      </ul>
    </div>
  );
}