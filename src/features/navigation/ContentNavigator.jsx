import React from "react";
import { useNavigate } from "react-router-dom";

export default function ContentNavigator() {
  const navigate = useNavigate();

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
      <button
        onClick={() => handleNavigate("/content/chapters")}
        className="text-start py-4 px-8 w-fit font-semibold text-white bg-red-600 hover:bg-red-500 duration-200 rounded-full"
      >
        Chapters
      </button>
      <button
        onClick={() => handleNavigate("/sections")}
        className="text-start py-4 px-8 w-fit font-semibold text-white bg-red-600 hover:bg-red-500 duration-200 rounded-full"
      >
        Lessons
      </button>
    </section>
  );
}
