export default function InputField({
  label,
  type = "text",
  placeholder,
  value,
  onChange,
  required = false,
}) {
  return (
    <div className="space-y-2">

      <label className="block font-medium text-slate-700">

        {label}

      </label>

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
    rounded-xl
    border
    border-slate-300
    px-4
    py-3
    outline-none
    transition
    focus:border-blue-500
    focus:ring-4
    focus:ring-blue-100
  "
/>

    </div>
  );
}