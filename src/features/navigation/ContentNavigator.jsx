import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  selectDisplayBlock,
  selectLessons,
  setDisplayBlock,
} from "../globals/globalsSlice";

export default function ContentNavigator() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
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

  const handleClick = (lesson) => {
    dispatch(setDisplayBlock(lesson));
    navigate({
      pathname: "/learn/lesson",
      search: `${createSearchParams({ title: lesson?.title, id: lesson?.id })}`,
    });
  };

  return (
    <section className="flex justify-center items-center flex-1 p-4 gap-8 w-full bg-destructive">
      <div className="flex flex-wrap gap-4 items-center">
        {displayLessons.map((lesson, idx) => (
          <div key={idx} className="flex items-center gap-2 ">
            <p className="bg-accent text-accent_foreground w-8 h-8 rounded-full font-medium flex items-center justify-center">
              {lesson.sortIndex}
            </p>
            <p
              onClick={() => handleClick(lesson)}
              className={
                (lesson.id === displayBlock.id
                  ? "border-yellow-500 border-b-2"
                  : "border-zinc-400") +
                " text-destructive_foreground cursor-pointer"
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
