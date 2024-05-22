import React, { useState } from "react";
import { IoIosSearch } from "react-icons/io";
import { useNavigate } from "react-router-dom";

export default function SidebarSearch() {
  const navigate = useNavigate();

  const [search, setSearch] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    navigate(`/search/${search}`);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="border-2 border-red-600 text-red-600 rounded-full flex items-center justify-between gap-1 pr-3 py-1"
    >
      {/* <label htmlFor="search-btn"></label> */}
      <input
        type="text"
        id="search-btn"
        placeholder="Search"
        className="bg-transparent m-0"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
      <button type="submit">
        <IoIosSearch size={26} className="" />
      </button>
    </form>
  );
}
