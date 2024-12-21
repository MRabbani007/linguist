import React, { useEffect, useState } from "react";
import {
  Link,
  createSearchParams,
  useNavigate,
  useSearchParams,
} from "react-router-dom";
import { axiosPrivate } from "../../api/axios";
import CardWord from "../../features/words/CardWord";
import Pagination from "../../features/components/Pagination";

const LEVEL = {
  1: "Beginner - A1",
  2: "Beginner - A2",
  3: "Intermediate - B1",
  4: "Intermediate - B2",
  5: "Advanced - C1",
  6: "Advanced - C2",
};

const subjects = [
  "Food",
  "Health",
  "House & Apartment",
  "Hobbies & Activities",
  "Holidays & Celebrations",
  "Nature",
  "Common Words",
];

const types = ["Nouns", "Verbs", "Adjectives", "Adverbs"];

const wordLists = ["Basic Words", "Most Common", "Emergency Russian"];

export default function WordsPage() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const [loading, setLoading] = useState(false);

  const [subjects, setSubjects] = useState([]);
  const [levels, setLevels] = useState([]);
  const [types, setTypes] = useState([]);

  const [searchTerm, setSearchTerm] = useState("");

  const search = searchParams.get("search") ?? null;
  const page = searchParams.get("page") ?? 1;

  const subject = searchParams.get("subject") ?? null;
  const level = searchParams.get("level") ?? null;
  const type = searchParams.get("type") ?? null;

  const [words, setWords] = useState([]);
  const [count, setCount] = useState(0);

  const fetchFilters = async () => {
    try {
      const response = await axiosPrivate.get("/review/filters");

      if (response?.status === 200) {
        setSubjects(response.data.subjects.filter((item) => item !== ""));
        setLevels(response.data.levels.filter((item) => item !== ""));
        setTypes(response.data.types.filter((item) => item !== ""));
      }
    } catch (error) {
      console.log(error);
    }
  };

  const fetchWords = async () => {
    try {
      setLoading(true);

      const response = await axiosPrivate.get("/review/words", {
        params: { subject, level, type, page, search },
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

  const onSubmit = (event) => {
    event.preventDefault();

    if (searchTerm.trim()) {
      navigate({
        pathname: "/review/words",
        search: `${createSearchParams({ search: searchTerm })}`,
      });
    }
  };

  useEffect(() => {
    fetchFilters();
  }, []);

  useEffect(() => {
    fetchWords();
  }, [subject, level, type, search, page]);

  const items = [
    { title: "Words by Subject", url: "subject", children: subjects },
    { title: "Words by Level", url: "level", children: levels },
    { title: "Words by Type", url: "type", children: types },
  ];

  return (
    <main className="">
      <form
        onSubmit={onSubmit}
        className="flex items-center justify-center gap-2 bg-zinc-400/10 py-2 px-4 rounded-md"
      >
        <input
          type="text"
          className="bg-transparent flex-1"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <button type="submit" className="font-bold">
          Search
        </button>
      </form>
      <div className="flex items-center gap-4">
        {[
          { label: "Search", value: search },
          { label: "Subject", value: subject },
          { label: "Level", value: level },
          { label: "Type", value: type },
        ].map((item) =>
          item?.value ? (
            <p
              className="p-2 bg-zinc-100 rounded-md space-x-2"
              key={item.label}
            >
              <span>{item.label}:</span>
              <span>{item.value}</span>
            </p>
          ) : null
        )}
        {count}
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {loading ? (
          <p>Loading...</p>
        ) : words.length === 0 ? (
          <p>No data matched your search</p>
        ) : (
          words.map((word, index) => <CardWord word={word} key={index} />)
        )}
      </div>
      <Pagination count={count} currentPage={+page} className="mx-auto" />
      <div className="flex flex-wrap items-stretch gap-8">
        {items.map((item, index) => (
          <div key={index} className="w-full sm:flex-1">
            <p className="font-bold text-xl py-2 px-4 bg-zinc-200 text-center">
              {item.title}
            </p>
            <div className="flex-1">
              {item?.children.map((i, idx) => (
                <div
                  key={idx}
                  className="py-2 px-4 bg-zinc-100 hover:bg-zinc-200 duration-200"
                >
                  <Link
                    to={{
                      pathname: "/review/words",
                      search: `?${item.url}=${encodeURIComponent(i)}`,
                    }}
                  >
                    {i}
                  </Link>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </main>
  );
}
