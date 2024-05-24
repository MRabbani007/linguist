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
          ? "left-3 visible opacity-100"
          : "left-[-2000px] invisible opacity-0") +
        " fixed top-[75px] bottom-3 sm:right-auto right-3 min-w-[300px] p-2 rounded-lg duration-300 bg-slate-200 text-zinc-800 flex flex-col gap-3"
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
