import React, { useState } from "react";
import { IoIosSearch } from "react-icons/io";
import { useParams } from "react-router-dom";

export default function SearchPage() {
  let params = useParams();

  const [searchTerm, setSearchTerm] = useState(params?.search || "");

  return (
    <div>
      <h1>Search</h1>
      <form className="border-2 border-red-600 text-red-600 rounded-full flex items-center justify-between gap-1 pr-3 py-1">
        <input
          type="text"
          id="searchParam"
          name="searchParam"
          placeholder="Search"
          className="bg-transparent m-0"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <button type="submit">
          <IoIosSearch size={26} className="" />
        </button>
      </form>
    </div>
  );
}
