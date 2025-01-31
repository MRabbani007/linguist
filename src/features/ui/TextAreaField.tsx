import { ChangeEvent } from "react";

type Props = {
  label: string;
  name: string;
  value: string | number;
  handleChange: (event: ChangeEvent<HTMLTextAreaElement>) => void;
  autoFocus?: boolean;
};

export default function TextAreaField({
  label,
  name,
  value = "",
  handleChange,
  autoFocus = false,
}: Props) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-[15%_1fr] items-center gap-2">
      <label
        htmlFor={name}
        className="text-sm md:text-base font-medium text-zinc-700 p-1"
      >
        {label}
      </label>
      <textarea
        id={name}
        name={name}
        autoFocus={autoFocus}
        placeholder={label}
        className="bg-transparent border-[1px] border-zinc-300 rounded-md line-clamp-2 min-h-20 p-2"
        value={value ?? ""}
        onChange={handleChange}
      />
    </div>
  );
}
