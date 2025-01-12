import React, { useEffect, useState } from "react";
import { createSearchParams, useLocation, useNavigate } from "react-router-dom";
import { axiosPrivate } from "../../api/axios";
import { BsBoxArrowUpRight } from "react-icons/bs";
import Pagination from "../../features/components/Pagination";

export default function SearchPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);

  const query = queryParams.get("q") ?? "";
  const page = queryParams.get("page") ?? 1;

  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState(query);

  const [match, setMatch] = useState(false);

  const [words, setWords] = useState([]);
  const [count, setCount] = useState(false);

  const handleSearch = async () => {
    try {
      if (!searchTerm || searchTerm === "") {
        return null;
      }

      setLoading(true);

      const response = await axiosPrivate.get("/search/words", {
        params: { page, search: searchTerm },
      });

      if (response?.status === 200 && Array.isArray(response.data.data)) {
        setWords(response.data.data);
        setCount(response.data.count);
      }

      setLoading(false);
    } catch (error) {
      setLoading(false);
    }
  };

  const wordsContent = words.map((word) => (
    <RenderWord word={word} key={word?.id} />
  ));

  const onSubmit = (event) => {
    event.preventDefault();

    if (searchTerm.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchTerm)}`);
    }
  };

  useEffect(() => {
    setSearchTerm(query);
  }, [query]);

  useEffect(() => {
    handleSearch();
  }, [query, page]);

  return (
    <main className="flex-1">
      <form
        onSubmit={onSubmit}
        className="flex items-center justify-center gap-2 bg-zinc-400/10 py-2 px-4 rounded-md"
      >
        <input
          type="text"
          placeholder="Search..."
          className="bg-transparent flex-1"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <button type="submit" className="font-bold">
          Search
        </button>
      </form>
      <div className="text-center">
        {count === 1
          ? `1 result for "${query}"`
          : `${(page - 1) * 15 + 1} to ${
              page * 15
            } of ${count} results for "${query}"`}
      </div>
      <div className="flex flex-col flex-1 gap-4">{wordsContent}</div>
      <Pagination
        count={count}
        currentPage={+page}
        className={"mx-auto"}
        itemsPerPage={30}
      />
    </main>
  );
}

function RenderWord({ word }) {
  const navigate = useNavigate();

  const handleOpenLesson = () => {
    navigate({
      pathname: "/learn/lesson",
      search: `${createSearchParams({ id: word?.blockID })}`,
    });
  };

  return (
    <div className="min-w-[200px] py-2 px-4 shrink-0 group border-[1px] shadow-sm shadow-slate-400 flex  items-stretch">
      <div className="flex-1 space-y-2">
        <div className="">
          <span className="mx-2 text-lg font-medium cursor-pointer">
            {word?.first}
          </span>
          <span className="text-sm italic">{word?.firstCaption}</span>
        </div>
        <div className="">
          <span className="mx-2 font-normal">{word?.second}</span>
          <span className="text-sm italic">{word?.secondCaption}</span>
        </div>
      </div>
      <button title="Go to Lesson" onClick={handleOpenLesson}>
        <BsBoxArrowUpRight size={20} className="text-zinc-800" />
      </button>
    </div>
  );
}
