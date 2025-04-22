import { ReactNode, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

type DropDownItem = {
  title: string;
  label: string;
  url: string;
  icon?: ReactNode;
};

type Props = {
  label: string;
  url?: string;
  icon?: ReactNode;
  items: DropDownItem[];
};

export default function Dropdown({ label, url, icon, items }: Props) {
  const [show, setShow] = useState(false);
  const navigate = useNavigate();

  const handleClick = () => {
    if (url) {
      navigate(url);
    }
  };

  return (
    <div
      className="relative my-auto"
      onMouseOver={() => setShow(true)}
      onMouseLeave={() => setShow(false)}
    >
      <button
        onClick={handleClick}
        className="border-b-2 pt-0.5 border-white hover:border-yellow-500 duration-200"
      >
        {icon}
        {label}
      </button>
      <ul
        className={
          (show ? "" : "invisible opacity-0 -translate-y-4") +
          " absolute top-full right-0 duration-200 text-zinc-800 bg-zinc-50 "
        }
      >
        {items.map((item, index) => {
          return (
            <li key={index}>
              <Link
                to={item?.url ?? "#"}
                title={item?.title}
                className="flex items-center gap-2 py-2 px-4 hover:bg-zinc-200 duration-200"
              >
                {item?.icon}
                <span className="text-nowrap">{item?.label}</span>
              </Link>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
