import React, { useId, useState } from "react";
import { IoIosSearch } from "react-icons/io";
import { useNavigate } from "react-router-dom";

export default function NavbarSearch({ viewSearch, setViewSearch }) {
  const navigate = useNavigate();

  const id = useId();

  const [search, setSearch] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    navigate(`/search/${search}`);

    setViewSearch(false);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className={
        (viewSearch ? "" : "-translate-y-4 opacity-0 invisible h-0") +
        " absolute top-full left-0 right-0 flex flex-1 items-center justify-between gap-1 pr-3 py-2 h-fit bg-zinc-800/90 text-white font-semibold duration-200"
      }
    >
      <input
        type="text"
        id={"search-btn" + id}
        placeholder="Search"
        autoFocus
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="bg-transparent focus:bg-transparent m-0 flex-1 flex-shrink w-full"
      />
      <button type="submit">
        <IoIosSearch size={26} className="" />
      </button>
    </form>
  );
}
