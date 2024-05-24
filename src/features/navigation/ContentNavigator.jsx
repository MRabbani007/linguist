import React from "react";
import { useNavigate } from "react-router-dom";

export default function ContentNavigator() {
  const navigate = useNavigate();

  const handleOverview = () => {
    navigate("/chapters");
  };

  const handleChapterContent = () => {
    // dispatch(setDisplayChapter(chapter));
    navigate("/sections");
  };

  return (
    <section className="flex justify-center flex-1 p-2 my-4 gap-8">
      <button
        onClick={handleOverview}
        className="text-start py-4 px-8 w-fit font-semibold text-white bg-red-600 hover:bg-red-500 duration-200 rounded-full"
      >
        Chapters
      </button>
      <button
        onClick={handleChapterContent}
        className="text-start py-4 px-8 w-fit font-semibold text-white bg-red-600 hover:bg-red-500 duration-200 rounded-full"
      >
        Lessons
      </button>
    </section>
  );
}
