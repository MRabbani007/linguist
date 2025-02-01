export default function CheckboxField({
  label,
  name,
  value,
  onChange,
}: {
  label: string;
  name: string;
  value: boolean;
  onChange: (val: boolean) => void;
}) {
  return (
    <div className="flex items-center gap-2">
      <input
        type="checkbox"
        id={name}
        name={name}
        checked={value}
        onChange={(event) => onChange(event.target.checked)}
      />
      <label
        htmlFor={name}
        className="text-sm md:text-base font-medium text-zinc-700 p-1"
      >
        {label}
      </label>
    </div>
  );
}
