import { ChangeEvent, HTMLInputTypeAttribute } from "react";

type Props = {
  label: string;
  name: string;
  type: HTMLInputTypeAttribute;
  value: string | number;
  handleChange: (event: ChangeEvent<HTMLInputElement>) => void;
};

export default function InputField({
  type = "text",
  label,
  name,
  value = "",
  handleChange,
}: Props) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-[15%_1fr] items-center gap-2">
      <label
        htmlFor={name}
        className="text-sm md:text-base font-medium text-zinc-700 p-1"
      >
        {label}
      </label>
      <input
        type={type}
        id={name}
        name={name}
        placeholder={label}
        value={value ?? ""}
        onChange={handleChange}
        className="bg-transparent border-[1px] border-zinc-300 rounded-md"
      />
    </div>
  );
}
