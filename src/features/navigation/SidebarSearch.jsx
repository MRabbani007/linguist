import React, { useId, useState } from "react";
import { IoIosSearch } from "react-icons/io";
import { useNavigate } from "react-router-dom";

export default function SidebarSearch() {
  const navigate = useNavigate();

  const id = useId();

  const [search, setSearch] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    navigate(`/search/${search}`);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="border-2 border-white text-white rounded-full flex flex-1 items-center justify-between gap-1 pr-3 py-1 "
    >
      {/* <label htmlFor="search-btn"></label> */}
      <input
        type="text"
        id={"search-btn" + id}
        placeholder="Search"
        className="bg-transparent m-0 flex-1 flex-shrink w-full"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
      <button type="submit">
        <IoIosSearch size={26} className="" />
      </button>
    </form>
  );
}
