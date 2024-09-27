import React, { useEffect, useState } from "react";
import { IoIosSearch } from "react-icons/io";
import { useParams } from "react-router-dom";
import { axiosPrivate } from "../../api/axios";
import CardWordList from "../../features/words/CardWordList";

export default function SearchPage() {
  let params = useParams();

  const [searchTerm, setSearchTerm] = useState(params?.search || "");
  const [match, setMatch] = useState(false);
  const [words, setWords] = useState([]);

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
    setSearchTerm(params.search);
  }, [params.search]);

  useEffect(() => {
    if (searchTerm && searchTerm !== "") {
      handleSearch();
    }
  }, [searchTerm]);

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
