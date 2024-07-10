import { forwardRef } from "react";
import ChapterListSideBar from "../chapters/ChapterListSideBar";
import SidebarSearch from "./SidebarSearch";
import { Link } from "react-router-dom";
// Imported Media

const Sidebar = () => {
  return (
    <div
      className={
        "hidden w-[250px] duration-300 bg-zinc-200 text-zinc-800 lg:flex flex-col justify-start"
      }
    >
      {/* <SidebarSearch className="border-red-600 text-red-600 mx-4 my-4" /> */}
      <div className="">
        <ChapterListSideBar />
      </div>
      {/* <Link
        to="/content/chapters"
        className="py-2 px-4 text-white bg-red-600 rounded-full text-center"
      >
        Show More
      </Link> */}
    </div>
  );
};

export default Sidebar;
