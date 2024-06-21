import { forwardRef } from "react";
import ChapterListSideBar from "../chapters/ChapterListSideBar";
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
        " absolute left-4 top-[90px] sm:right-auto min-w-[300px] py-2 duration-300 bg-slate-200 text-zinc-800 flex flex-col gap-3 z-40 mb-4 max-h-[80vh]"
      }
    >
      <SidebarSearch className="border-red-600 text-red-600 mx-4" />
      <ChapterListSideBar setViewSideBar={setViewSideBar} />
      {/* <Link to="/chapters" className="btn btn-red w-fit mx-auto">
        Show More
      </Link> */}
    </nav>
  );
});

export default Offcanvas;
