export default function SectionTitle({
  badge,
  title,
  subtitle,
}) {
  return (
    <div className="text-center max-w-3xl mx-auto">

      {badge && (
        <span className="inline-block px-4 py-2 rounded-full bg-blue-100 text-blue-700 font-medium mb-4">
          {badge}
        </span>
      )}

      <h2 className="text-4xl font-bold text-slate-900">
        {title}
      </h2>

      {subtitle && (
        <p className="mt-5 text-lg text-slate-600 leading-8">
          {subtitle}
        </p>
      )}

    </div>
  );
}