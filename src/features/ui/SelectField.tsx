import { ChangeEvent } from "react";

export default function SelectField({
  label,
  value,
  options,
  onValueChange,
  className,
}: {
  label: string;
  value?: string | number;
  options: { label: string; value: string }[];
  onValueChange: (value: string) => void;
  className?: string;
}) {
  return (
    <div className={"grid grid-cols-[15%_1fr] items-center gap-4 " + className}>
      <label htmlFor="Select">{label}</label>
      <select
        id="Select"
        name=""
        value={value}
        onChange={(event: ChangeEvent<HTMLSelectElement>) =>
          onValueChange(event.target.value)
        }
      >
        <option value="">{`Select ${label}`}</option>
        {options.map((item, idx) => (
          <option key={idx} value={item.value}>
            {item.label}
          </option>
        ))}
      </select>
    </div>
  );
}
