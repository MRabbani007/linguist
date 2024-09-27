import React, { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";

export default function Dropdown({ label, url, icon, items }) {
  const [show, setShow] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const handleClick = () => {
    if (url) {
      navigate(url);
    }
  };

  const isActive = (page) => location.pathname.includes(page);

  return (
    <div
      className="relative my-auto"
      onMouseOver={() => setShow(true)}
      onMouseLeave={() => setShow(false)}
    >
      <button
        onClick={handleClick}
        className="border-b-2 pt-0.5 border-destructive hover:border-yellow-500 duration-200"
      >
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
