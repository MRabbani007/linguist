import React from "react";
import { Link } from "react-router-dom";

export default function AdminMenuBlock({ menuBlock }) {
  return (
    <div>
      <div className="py-2 px-2 font-semibold">{menuBlock.label}</div>
      <div className="flex flex-col">
        {Array.isArray(menuBlock?.children) && menuBlock.children.length !== 0
          ? menuBlock.children.map((item, index) => {
              return (
                <Link key={index} to={item.url} className="py-2 px-4">
                  {item.label}
                </Link>
              );
            })
          : null}
      </div>
    </div>
  );
}
