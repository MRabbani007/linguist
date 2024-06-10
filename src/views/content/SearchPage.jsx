import React, { useEffect, useState } from "react";
import { IoIosSearch } from "react-icons/io";
import { useParams } from "react-router-dom";
import { axiosPrivate } from "../../api/axios";
import CardWordList from "../../features/words/CardWordList";

export default function SearchPage() {
  let params = useParams();

  const [words, setWords] = useState([]);
  const [match, setMatch] = useState(false);

  const handleSearch = async () => {
    const { data } = await axiosPrivate.get("/search", {
      params: { searchTerm, match },
    });

    if (Array.isArray(data)) {
      setWords(data);
    }
  };

  const wordsContent = words.map((word) => (
    <CardWordList word={word} key={word?.id} />
  ));

  const handleSubmit = (e) => {
    e.preventDefault();
    handleSearch();
  };

  useEffect(() => {
    if (searchTerm && searchTerm !== "") {
      handleSearch();
    }
  }, []);

  const [searchTerm, setSearchTerm] = useState(params?.search || "");

  return (
    <main>
      <header className="bg-gradient-to-r from-zinc-600 to-zinc-400 text-white">
        <h1>Search</h1>
      </header>
      <div>
        <form
          className="border-2 border-red-600 text-red-600 rounded-full flex items-center justify-between gap-1 pr-3 py-1 max-w-[800px] mx-auto"
          onSubmit={handleSubmit}
        >
          <input
            type="text"
            id="searchParam"
            name="searchParam"
            placeholder="Search"
            className="bg-transparent m-0"
            value={searchTerm}
            required
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <button type="submit">
            <IoIosSearch size={26} className="" />
          </button>
        </form>
        <div className="flex flex-col flex-1 gap-4 p-4">{wordsContent}</div>
      </div>
    </main>
  );
}
