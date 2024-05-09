import { forwardRef } from "react";
import ChapterListSideBar from "../chapters/ChapterListSideBar";
import SidebarSearch from "./SidebarSearch";
// Imported Media

const Sidebar = () => {
  return (
    <nav
      className={
        "hidden w-[300px] p-2 rounded-lg duration-300 bg-slate-200 shadow-md shadow-slate-400 text-zinc-800 lg:flex flex-col gap-3"
      }
    >
      <SidebarSearch />
      <ChapterListSideBar />
      <button className="btn btn-red">Show More</button>
    </nav>
  );
};

export default Sidebar;
