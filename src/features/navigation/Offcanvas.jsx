import { forwardRef } from "react";
import ChapterListSideBar from "../chapters/ChapterListSideBar";
import { IoIosSearch } from "react-icons/io";
import SidebarSearch from "./SidebarSearch";
// Imported Media

const Offcanvas = forwardRef(({ viewSideBar }, ref) => {
  return (
    <nav
      ref={ref}
      className={
        (viewSideBar
          ? "left-3 visible opacity-100"
          : "left-[-2000px] invisible opacity-0") +
        " fixed top-[65px] bottom-3 sm:right-auto right-3 min-w-[300px] p-2 rounded-lg duration-300 bg-slate-200 text-zinc-800 flex flex-col gap-3"
      }
    >
      <SidebarSearch />
      <ChapterListSideBar />
      <button className="btn btn-red">Show More</button>
    </nav>
  );
});

export default Offcanvas;
