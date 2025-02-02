import { ReactNode, useEffect, useRef, useState } from "react";
import { BsThreeDots } from "react-icons/bs";

type Props = {
  items: {
    type: string;
    label: string;
    title: string;
    icon: ReactNode;
    onClick: () => void;
  }[];
};

export default function AdminDropDown({ items }: Props) {
  const dropdownRef = useRef<HTMLDivElement>(null);

  const [showDropDown, setShowDropDown] = useState(false);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setShowDropDown(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div ref={dropdownRef} className="absolute top-2 right-2 z-50">
      <button
        onClick={() => setShowDropDown(true)}
        className="p-1 bg-zinc-50 hover:bg-zinc-200 rounded-md"
      >
        <BsThreeDots size={25} />
      </button>
      <div
        className={
          (showDropDown ? "" : "-translate-y-2 opacity-0 invisible") +
          " absolute top-full right-0 duration-200 z-[100] bg-zinc-50 text-sm flex flex-col items-stretch shadow-sm shadow-zinc-700"
        }
      >
        {items.map((item, index) =>
          item?.type === "separator" ? (
            <div key={index} className="py-2 px-4 bg-zinc-200">
              {item?.label}
            </div>
          ) : item?.type === "button" ? (
            <button
              key={index}
              title={item?.title}
              onClick={item?.onClick}
              className="py-2 px-2 hover:bg-zinc-50 flex items-center gap-3"
            >
              {item?.icon}
              <span className="text-nowrap">{item.label}</span>
            </button>
          ) : null
        )}
      </div>
    </div>
  );
}
