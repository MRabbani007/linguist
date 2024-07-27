import React, { forwardRef } from "react";
import { Link } from "react-router-dom";

const items = [
  {
    label: "Chapters",
    title: "Chapters",
    url: "/content/chapters",
  },
  {
    label: "Lessons",
    title: "Lessons",
    url: "/content/lessons",
  },
  {
    label: "Words",
    title: "Words",
    url: "/review/words",
  },
  {
    label: "Sentences",
    title: "Sentences",
    url: "/sentences",
  },
];

const MenuLessons = forwardRef(({ viewDropDown }, ref) => {
  return (
    <ul
      ref={ref}
      className={
        (viewDropDown ? " " : " -translate-y-[20px] invisible opacity-0") +
        " text-zinc-800 bg-zinc-50 absolute top-full right-0 duration-200"
      }
    >
      {items.map((item, index) => (
        <li key={index} className="py-2 px-4 hover:bg-zinc-100 duration-200">
          <Link to={item.url} title={item.title}>
            <span>{item.label}</span>
          </Link>
        </li>
      ))}
    </ul>
  );
});

export default MenuLessons;
