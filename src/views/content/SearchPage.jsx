import React, { useEffect, useState } from "react";
import { IoIosSearch } from "react-icons/io";
import { createSearchParams, useNavigate, useParams } from "react-router-dom";
import { axiosPrivate } from "../../api/axios";
import { BsBoxArrowUpRight } from "react-icons/bs";

export default function SearchPage() {
  let params = useParams();

  const [searchTerm, setSearchTerm] = useState(params?.search || "");
  const [match, setMatch] = useState(false);
  const [words, setWords] = useState([]);

  const handleSearch = async () => {
    if (!searchTerm || searchTerm === "") {
      return null;
    }

    const { data } = await axiosPrivate.get("/search", {
      params: { searchTerm, match },
    });

    if (Array.isArray(data)) {
      setWords(data);
    }
  };

  const wordsContent = words.map((word) => (
    <RenderWord word={word} key={word?.id} />
  ));

  const handleSubmit = (event) => {
    event.preventDefault();

    handleSearch();
  };

  useEffect(() => {
    setSearchTerm(params.search);
  }, [params.search]);

  // useEffect(() => {
  //   handleSearch();
  // }, [searchTerm]);

  return (
    <main className="flex-1">
      <form
        className="border-2 border-red-600/70 text-red-600 rounded-full flex items-center gap-1 pr-3 py-1"
        onSubmit={handleSubmit}
      >
        <input
          type="text"
          id="searchParam"
          name="searchParam"
          placeholder="Search"
          className="bg-transparent m-0 flex-1"
          value={searchTerm}
          required
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <button type="submit">
          <IoIosSearch size={26} className="" />
        </button>
      </form>
      <div className="flex flex-col flex-1 gap-4 p-4 w-full">
        {wordsContent}
      </div>
    </main>
  );
}

function RenderWord({ word }) {
  const navigate = useNavigate();

  const handleOpenLesson = () => {
    navigate({
      pathname: "/content/lesson",
      search: `${createSearchParams({ id: word?.blockID })}`,
    });
  };

  return (
    <div className="min-w-[200px] p-2 shrink-0 group border-[1px] shadow-sm shadow-slate-400 flex  items-stretch">
      <div className="flex-1 space-y-2">
        <div className="">
          <span
            className="mx-2 text-lg font-medium cursor-pointer"
            onMouseOver={() => setShowPronunce(true)}
            onMouseOut={() => setShowPronunce(false)}
          >
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
        <BsBoxArrowUpRight size={25} className="text-zinc-800" />
      </button>
    </div>
  );
}
