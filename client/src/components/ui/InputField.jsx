
export default function InputField({
  label,
  icon,
  type = "text",
  placeholder,
  value,
  onChange,
  required = false,
}) {
  return (
    <div className="space-y-2.5">

      <label className="block text-sm font-semibold tracking-wide text-slate-700">

        {label}

      </label>

      <div className="relative">

    {icon && (
        <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400">
            {icon}
        </span>
    )}

    <input
        type={type}
        value={value}
        onChange={onChange}
        required={required}
        placeholder={placeholder}
        autoComplete="off"
        spellCheck={false}
        className="
            w-full
            rounded-2xl
            border
            border-slate-300
            bg-white
            py-3.5
            pr-4
            pl-12
            text-slate-900
            placeholder:text-slate-400
            outline-none
            transition-all
            duration-300
            hover:border-slate-400
            focus:border-blue-500
            focus:ring-4
            focus:ring-blue-100
        "
    />

</div>
    </div>
  );
}