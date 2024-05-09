import React from "react";
import { IoIosSearch } from "react-icons/io";

export default function SidebarSearch() {
  return (
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
  );
}
