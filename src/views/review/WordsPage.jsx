import React, { useEffect, useState } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { axiosPrivate } from "../../api/axios";
import CardWord from "../../features/words/CardWord";

const levels = [
  "Beginner - A1",
  "Beginner - A2",
  "Intermediate - B1",
  "Intermediate - B2",
  "Advanced - C1",
  "Advanced - C2",
];

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
  const [subjects, setSubjects] = useState([]);

  const subject = searchParams.get("subject");
  const level = searchParams.get("level");

  const [words, setWords] = useState([]);

  const fetchSubjects = async () => {
    try {
      const response = await axiosPrivate.get("/word/subjects");

      if (response?.status === 200) {
        setSubjects(response.data.subjects);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const fetchWords = async () => {
    try {
      const response = await axiosPrivate.get("/word/filter", {
        params: { subject, level },
      });
      if (response?.status === 200 && Array.isArray(response.data)) {
        setWords(response.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const onSubmit = (event) => {
    event.preventDefault();
  };

  useEffect(() => {
    fetchSubjects();
    fetchWords();
  }, [subject, level]);

  const items = [
    { title: "Words by Subject", url: "", children: subjects },
    { title: "Words by Level", url: "", children: levels },
    { title: "Words by Type", url: "", children: types },
  ];

  return (
    <main className="">
      <form
        onSubmit={onSubmit}
        className="flex items-center justify-center gap-2 bg-zinc-400/10 py-2 px-4 rounded-md"
      >
        <input type="text" className="bg-transparent flex-1" />
        <button type="submit" className="font-boldl">
          Search
        </button>
      </form>
      <div className="grid grid-cols-3 gap-4">
        {words.map((word, index) => (
          <CardWord word={word} key={index} />
        ))}
      </div>
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
                      search: `?subject=${i}`,
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
