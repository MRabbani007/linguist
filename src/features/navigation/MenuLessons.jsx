import React, { forwardRef } from "react";
import { Link } from "react-router-dom";

const MenuLessons = forwardRef(({ viewDropDown }, ref) => {
  return (
    <ul
      ref={ref}
      className={
        (viewDropDown ? " " : " -translate-y-[20px] invisible opacity-0") +
        " text-zinc-800 bg-slate-200 mobile-menu"
      }
    >
      <li>
        <Link to="/content/chapters" title="Chapters" className="dropdown-item">
          <span>Chapters</span>
        </Link>
      </li>
      <li>
        <Link to="/content/lessons" title="Lessons" className="dropdown-item">
          <span>Lessons</span>
        </Link>
      </li>
      <li>
        <Link to="/sentences" title="Sentences" className="dropdown-item">
          <span>Sentences</span>
        </Link>
      </li>
    </ul>
  );
});

export default MenuLessons;
