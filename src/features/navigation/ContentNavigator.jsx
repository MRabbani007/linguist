import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { selectDisplayBlock, selectLessons } from "../globals/globalsSlice";

export default function ContentNavigator() {
  const navigate = useNavigate();
  const lessons = useSelector(selectLessons);
  const displayBlock = useSelector(selectDisplayBlock);

  const [index, setIndex] = useState(0);

  const start = Math.max(index - 2, 0);
  const end = Math.min(lessons.length - 1, index + 3);

  const displayLessons = lessons.slice(start, end);

  useEffect(() => {
    const temp = lessons.findIndex((item) => item.id === displayBlock.id);
    if (temp >= 0) {
      setIndex(temp);
    }
  }, [displayBlock]);

  const handleOverview = () => {
    navigate("/content/chapters");
  };

  const handleChapterContent = () => {
    // dispatch(setDisplayChapter(chapter));
    navigate("/sections");
  };

  const handleNavigate = (url) => {
    navigate(url);
  };

  return (
    <section className="flex justify-center items-center flex-1 p-2 my-4 gap-8 w-full">
      {/* <button
        onClick={() => handleNavigate("/content/chapters")}
        className="text-start py-4 px-8 w-fit font-semibold text-white bg-red-600 hover:bg-red-500 duration-200 "
      >
        Chapters
      </button>
      <button
        onClick={() => handleNavigate("/sections")}
        className="text-start py-4 px-8 w-fit font-semibold text-white bg-red-600 hover:bg-red-500 duration-200 "
      >
        Lessons
      </button> */}
      <div className="flex flex-wrap gap-4 items-center">
        {displayLessons.map((lesson, idx) => (
          <div
            key={idx}
            className={
              (lesson.id === displayBlock.id
                ? "border-yellow-500"
                : "border-zinc-400") + " py-2 px-6 border-2 rounded-md"
            }
          >
            <p>{"Lesson " + lesson.sortIndex + ": "}</p>
            <p>{lesson.title}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
