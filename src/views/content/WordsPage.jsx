import React, { useState } from "react";
import { useSelector } from "react-redux";
import { selectEditMode } from "../../features/globals/globalsSlice";
import { useDebounce } from "use-debounce";
import { IoSearchOutline } from "react-icons/io5";
import { GoPlus } from "react-icons/go";
import Pagination from "../../features/components/Pagination";

export default function WordsPage() {
  const editMode = useSelector(selectEditMode);

  const count = 10;

  const [add, setAdd] = useState(false);
  const [search, setSearch] = useState("");
  const [value] = useDebounce(search, 1000);

  const [page, setPage] = useState(1);

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <main>
      <div className="flex flex-wrap justify-center items-center gap-2">
        <form
          onSubmit={handleSubmit}
          className="flex items-center p-2 border-2 rounded-full border-zinc-600 text-zinc-600 pr-4 w-full"
        >
          <input
            type="text"
            title="Search sentences"
            placeholder="Search"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="flex-1"
          />
          <button type="submit">
            <IoSearchOutline size={32} />
          </button>
        </form>
        {editMode ? (
          <button title="Add sentence" onClick={() => setAdd(true)}>
            <GoPlus size={28} />
          </button>
        ) : null}
      </div>
      <Pagination currentPage={page} setPage={setPage} count={count} />
      <Pagination currentPage={page} setPage={setPage} count={count} />
    </main>
  );
}
