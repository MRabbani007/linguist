import { forwardRef } from "react";
import ChapterListSideBar from "../chapters/ChapterListSideBar";
import SidebarSearch from "./SidebarSearch";
import { Link } from "react-router-dom";
// Imported Media

const Sidebar = () => {
  return (
    <nav
      className={
        "hidden w-[300px] p-2 rounded-lg duration-300 bg-slate-200 shadow-md shadow-slate-400 text-zinc-800 lg:flex flex-col gap-3"
      }
    >
      <SidebarSearch className="border-white text-white" />
      <ChapterListSideBar />
      <Link
        to="/chapters"
        className="py-2 px-4 text-white bg-red-600 rounded-full text-center"
      >
        Show More
      </Link>
    </nav>
  );
};

export default Sidebar;
