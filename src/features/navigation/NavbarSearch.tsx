import { FormEvent, useEffect, useId, useRef, useState } from "react";
import { IoIosSearch } from "react-icons/io";
import { useNavigate } from "react-router-dom";

export default function NavbarSearch() {
  const navigate = useNavigate();
  const dropdownRef = useRef<HTMLDivElement>(null);

  const id = useId();

  const [viewSearch, setViewSearch] = useState(false);
  const [search, setSearch] = useState("");

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();

    if (search.trim()) {
      navigate(`/search?q=${encodeURIComponent(search)}`);

      setViewSearch(false);
    }
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setViewSearch(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  useEffect(() => {}, [viewSearch]);

  return (
    <div ref={dropdownRef} className="h-full">
      {/* Search Button */}
      <button
        onClick={() => setViewSearch((curr) => !curr)}
        className="my-auto h-full"
      >
        <IoIosSearch size={30} />
      </button>
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
    </div>
  );
}
