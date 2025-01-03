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
      <label htmlFor={name} className={"text-sm md:text-base"}>
        {label}
      </label>
      <input
        type={type}
        id={name}
        name={name}
        placeholder={label}
        value={value ?? ""}
        onChange={handleChange}
        className="field__input__row"
      />
    </div>
  );
}
