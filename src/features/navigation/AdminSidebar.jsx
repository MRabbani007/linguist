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

const PAGES = [
  { label: "Upload Images", url: "/admin/images/upload" },
  { label: "Users", url: "/admin/users" },
];

const items = [
  { label: "Content", url: "#", children: CONTENT },
  { label: "Pages", url: "#", children: PAGES },
];

export default function AdminSidebar() {
  return (
    <nav className="text-zinc-800 hidden sm:inline-block">
      <div className="py-4 px-4 flex items-center gap-2 border-b-[1px] border-red-600">
        <RiAdminLine size={30} />
        <span className="font-semibold text-zinc-900">Admin</span>
      </div>
      {items.map((menuBlock, index) => {
        return <MenuBlock menuBlock={menuBlock} key={index} />;
      })}
    </nav>
  );
}

function MenuBlock({ menuBlock }) {
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
