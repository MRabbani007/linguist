import { forwardRef } from "react";
import ChapterListSideBar from "../chapters/ChapterListSideBar";
import SidebarSearch from "./SidebarSearch";
import { Link } from "react-router-dom";
// Imported Media

const Sidebar = () => {
  return (
    <nav
      className={
        "hidden w-[300px] p-2 duration-300 bg-slate-200 shadow-md shadow-slate-400 text-zinc-800 lg:flex flex-col justify-start gap-3"
      }
    >
      <SidebarSearch className="border-red-600 text-red-600" />
      <ChapterListSideBar />
      <Link
        to="/content/chapters"
        className="py-2 px-4 text-white bg-red-600 rounded-full text-center"
      >
        Show More
      </Link>
    </nav>
  );
};

export default Sidebar;
