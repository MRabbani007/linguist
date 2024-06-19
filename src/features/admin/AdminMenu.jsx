import React from "react";
import { Link } from "react-router-dom";

export default function AdminMenu() {
  return (
    <nav className="py-4 bg-zinc-100 border-r-2 border-red-700 text-zinc-800">
      <div className="py-4 px-4">Admin</div>
      <div>
        <h3 className="py-2 px-4 font-semibold ">Content</h3>
        <ul className="flex flex-col">
          <li className="border-b-[1px] border-t-[1px] border-red-600 py-2 px-8">
            <Link to={"/admin/chapters"}>Chapters</Link>
          </li>
          <li className="border-b-[1px] border-red-600 py-2 px-8">
            <Link to={"/admin/lessons"}>Lessons</Link>
          </li>
          <li className="border-b-[1px] border-red-600 py-2 px-8">
            <Link to={"/admin/sections"}>Sections</Link>
          </li>
          <li className="border-b-[1px] border-red-600 py-2 px-8">
            <Link to={"/admin/definitions"}>Definitions</Link>
          </li>
          <li className="border-b-[1px] border-red-600 py-2 px-8">
            <Link to={"/admin/words"}>Words</Link>
          </li>
          <li className="border-b-[1px] border-red-600 py-2 px-8 text-center">
            <Link to={"/admin/sentences"}>Sentences</Link>
          </li>
        </ul>
      </div>
      <div>
        <h3 className="py-2 px-4 font-semibold ">Users</h3>
        <ul className="flex flex-col">
          <li className="border-b-[1px] border-t-[1px] border-red-600 py-2 px-8">
            <Link to={"/admin/users"}>Users</Link>
          </li>
        </ul>
      </div>
    </nav>
  );
}
