import React, { forwardRef } from "react";
import { Link } from "react-router-dom";
import { RiAdminLine } from "react-icons/ri";

const CONTENT = [
  { label: "Chapters", url: "/admin/chapters" },
  { label: "Lessons", url: "/admin/lessons" },
  { label: "Sections", url: "/admin/sections" },
  { label: "Definitions", url: "/admin/definitions" },
  { label: "Words", url: "/admin/definitions" },
  { label: "Words", url: "/admin/words" },
  { label: "Sentences", url: "/admin/sentences" },
];

const AdminMenu = forwardRef(({ showMenu = false }, ref) => {
  return (
    <nav
      ref={ref}
      className={
        (showMenu ? "" : "-translate-x-14 opacity-0 ") +
        "bg-zinc-100 mt-2 border-red-700 text-zinc-800 absolute top-full left-2 duration-200"
      }
    >
      <div className="py-4 px-4 flex items-center gap-2 border-b-[1px] border-red-600">
        <RiAdminLine size={30} />
        <span className="font-semibold text-zinc-900">Admin</span>
      </div>
      <div>
        <h3 className="py-2 px-4 font-semibold ">Pages</h3>
        <ul>
          <li className="py-2 px-8">
            <Link to={"/admin/images/upload"}>Upload Images</Link>
          </li>
        </ul>
      </div>
      <div>
        <h3 className="py-2 px-4 font-semibold ">Content</h3>
        <ul className="flex flex-col">
          {CONTENT.map((item, index) => {
            return (
              <li key={index} className="py-2 px-8">
                <Link to={item.url}>{item.label}</Link>
              </li>
            );
          })}
        </ul>
      </div>
      <div>
        <h3 className="py-2 px-4 font-semibold ">Users</h3>
        <ul className="flex flex-col">
          <li className="py-2 px-8">
            <Link to={"/admin/users"}>Users</Link>
          </li>
        </ul>
      </div>
    </nav>
  );
});

export default AdminMenu;
