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
    <section className="flex justify-center items-center flex-1 p-4 gap-8 w-full bg-destructive">
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
          <div key={idx} className="flex items-center gap-2 ">
            <p className="bg-accent text-accent_foreground w-8 h-8 rounded-full font-medium flex items-center justify-center">
              {lesson.sortIndex}
            </p>
            <p
              className={
                (lesson.id === displayBlock.id
                  ? "border-yellow-500 border-b-2"
                  : "border-zinc-400") + " text-destructive_foreground"
              }
            >
              {lesson.title}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
