import React from "react";
import { Link } from "react-router-dom";

export default function AdminMenuBlock({ menuBlock }) {
  return (
    <div>
      <div className="py-2 px-2 font-semibold">{menuBlock.label}</div>
      {Array.isArray(menuBlock?.children) && menuBlock.children.length !== 0 ? (
        <ul className="">
          {menuBlock.children.map((item, index) => {
            return (
              <li className="py-2 px-4">
                <Link key={index} to={item.url}>
                  {item.label}
                </Link>
              </li>
            );
          })}
        </ul>
      ) : null}
    </div>
  );
}
