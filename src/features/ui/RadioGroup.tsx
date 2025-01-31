export default function RadioGroup({
  label,
  name,
  value,
  options,
  onChange,
}: {
  label: string;
  name: string;
  value: string;
  options: { label: string; value: string }[];
  onChange: (name: string, val: string) => void;
}) {
  return (
    <div>
      <p className="text-base font-medium text-zinc-700 p-1">{label}</p>
      <div className="flex items-center gap-4">
        {options.map((item) => (
          <div key={item.value} className="flex items-center gap-1">
            <input
              type="radio"
              id={item.value}
              name={name}
              checked={value === item.value}
              value={item.value}
              onChange={(event) => onChange(name, event.target.value)}
            />
            <label
              htmlFor={item.value}
              className="text-sm md:text-base font-medium text-zinc-700 p-1"
            >
              {item.label}
            </label>
          </div>
        ))}
      </div>
    </div>
  );
}
