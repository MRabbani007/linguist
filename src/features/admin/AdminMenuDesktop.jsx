import React from "react";
import { RiAdminLine } from "react-icons/ri";
import { Link } from "react-router-dom";

const CONTENT = [
  { label: "Chapters", url: "/admin/chapters" },
  { label: "Lessons", url: "/admin/lessons" },
  { label: "Sections", url: "/admin/sections" },
  { label: "Definitions", url: "/admin/definitions" },
  { label: "Words", url: "/admin/words" },
  { label: "Sentences", url: "/admin/sentences" },
];

export default function AdminMenuDesktop() {
  return (
    <div className="text-zinc-800 bg-zinc-100 hidden sm:inline-block">
      <div className="py-4 px-4 flex items-center gap-2 border-b-[1px] border-red-600">
        <RiAdminLine size={30} />
        <span className="font-semibold text-zinc-900">Admin</span>
      </div>
      <div>
        <h3 className="py-2 px-4 font-semibold border-b-2">Pages</h3>
        <ul>
          <li className="py-2 px-4 border-b-2">
            <Link to={"/admin/images/upload"}>Upload Images</Link>
          </li>
        </ul>
      </div>
      <div>
        <h3 className="py-2 px-4 font-semibold border-b-2">Content</h3>
        <div className="flex flex-col">
          {CONTENT.map((item, index) => {
            return (
              <Link key={index} to={item.url} className="py-2 px-4 border-b-2">
                {item.label}
              </Link>
            );
          })}
        </div>
      </div>
      <div>
        <h3 className="py-2 px-4 font-semibold  border-b-2">Users</h3>
        <ul className="flex flex-col">
          <li className=" py-2 px-4 border-b-2 ">
            <Link to={"/admin/users"}>Users</Link>
          </li>
        </ul>
      </div>
    </div>
  );
}
