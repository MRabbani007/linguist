import React from "react";
import { RiAdminLine } from "react-icons/ri";
import { Link } from "react-router-dom";
import AdminMenuBlock from "./AdminMenuBlock";

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

export default function AdminMenuDesktop() {
  return (
    <div className="text-zinc-800 hidden sm:inline-block">
      <div className="py-4 px-4 flex items-center gap-2 border-b-[1px] border-red-600">
        <RiAdminLine size={30} />
        <span className="font-semibold text-zinc-900">Admin</span>
      </div>
      {items.map((menuBlock, index) => {
        return <AdminMenuBlock menuBlock={menuBlock} key={index} />;
      })}
    </div>
  );
}
