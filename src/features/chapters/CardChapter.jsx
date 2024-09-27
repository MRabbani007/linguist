import React from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  selectDisplayChapter,
  setDisplayChapter,
} from "../globals/globalsSlice";
import { createSearchParams, useNavigate } from "react-router-dom";

export default function CardChapter({ chapter, lessonCount = 0 }) {
  const displayChapter = useSelector(selectDisplayChapter);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleOpen = async () => {
    dispatch(setDisplayChapter(chapter));
    // navigate(`/title=${}&id=${}`,{});
    navigate({
      pathname: "/content/chapter",
      search: `?${createSearchParams({
        title: chapter?.title,
        id: chapter?.id,
      })}`,
    });
  };

  return (
    <div
      onClick={handleOpen}
      className="flex items-stretch cursor-pointer duration-200 group relative"
    >
      {/* Chapter Number */}
      <p className="bg-red-600 w-10 text-lg flex items-center justify-center text-white">
        {chapter?.chapterNo}
      </p>
      <div className="px-4 py-2 flex-1 flex flex-col bg-zinc-200">
        <p className="text-2xl md:text-4xl font-semibold">
          {chapter?.title || ""}
        </p>
        <p className="font-normal">{chapter?.subtitle || ""}</p>
        <p className="font-normal">{chapter?.details || ""}</p>
      </div>
    </div>
  );
}
