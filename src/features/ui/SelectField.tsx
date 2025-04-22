import { ChangeEvent, useEffect } from "react";

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
  useEffect(() => {}, [options]);

  return (
    <div
      className={
        "flex-1 grid grid-cols-1 md:grid-cols-[15%_1fr] items-center gap-0 md:gap-4 " +
        className
      }
    >
      <label
        htmlFor="Select"
        className="text-sm md:text-base font-medium text-zinc-700 p-1"
      >
        {label}
      </label>
      <select
        id="Select"
        name=""
        value={value}
        onChange={(event: ChangeEvent<HTMLSelectElement>) =>
          onValueChange(event.target.value)
        }
        className="px-4 py-2 text-gray-700 bg-white border-[1px] border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-[1px] focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
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
