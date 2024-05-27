import { forwardRef } from "react";
import ChapterListSideBar from "../chapters/ChapterListSideBar";
import { IoIosSearch } from "react-icons/io";
import SidebarSearch from "./SidebarSearch";
import { Link } from "react-router-dom";
// Imported Media

const Offcanvas = forwardRef(({ viewSideBar, setViewSideBar }, ref) => {
  return (
    <nav
      ref={ref}
      className={
        (viewSideBar
          ? " visible opacity-100"
          : " -translate-x-[1000px] invisible opacity-0") +
        " absolute left-3 top-[80px] sm:right-auto min-w-[300px] p-2 rounded-lg duration-300 bg-slate-200 text-zinc-800 flex flex-col gap-3 z-40"
      }
    >
      <SidebarSearch />
      <ChapterListSideBar setViewSideBar={setViewSideBar} />
      <Link
        to="/chapters"
        className="py-2 px-4 text-white bg-red-600 rounded-full text-center"
      >
        Show More
      </Link>
    </nav>
  );
});

export default Offcanvas;
