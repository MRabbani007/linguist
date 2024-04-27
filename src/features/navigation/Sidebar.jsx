import { forwardRef } from "react";
import ChapterListSideBar from "../chapters/ChapterListSideBar";
import { IoIosSearch } from "react-icons/io";
// Imported Media

const Sidebar = () => {
  return (
    <nav
      className={
        "hidden w-[300px] p-2 rounded-lg duration-300 bg-slate-200 shadow-md shadow-slate-400 text-zinc-800 sm:flex flex-col gap-3"
      }
    >
      <form className="border-2 border-red-600 text-red-600 rounded-md flex items-center justify-between gap-1 pr-3 py-1">
        {/* <label htmlFor="search-btn"></label> */}
        <input
          type="text"
          id="search-btn"
          placeholder="Search"
          className="bg-transparent m-0"
        />
        <button type="submit">
          <IoIosSearch size={26} className="" />
        </button>
      </form>
      <ChapterListSideBar />
      <button className="btn btn-red">Show More</button>
    </nav>
  );
};

export default Sidebar;
