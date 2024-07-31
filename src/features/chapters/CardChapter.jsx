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
      className="flex items-start justify-start gap-4 min-w-[300px] sm:min-w-[400px] flex-1 cursor-pointer duration-200 group relative my-4"
    >
      <span className="bg-red-600 w-10 h-10 text-xl shrink-0 flex items-center justify-center text-white rounded-full">
        {chapter?.chapterNo}
      </span>
      <div className="flex flex-col">
        <p className="text-4xl font-semibold">{chapter?.title || ""}</p>
        <p className=" font-semibold">{chapter?.subtitle || ""}</p>
        <p className=" font-semibold">{chapter?.details || ""}</p>
      </div>
      {/* <p className="flex items-center justify-evenly gap-8">
        <span title={`${lessonCount} Lessons`}>
          {lessonCount}
          <LuListTree size={25} className="inline" />
        </span>
        <span title={`5 Hours`}>
          5
          <IoTimerOutline size={25} className="inline" />
        </span>
      </p> */}
    </div>
  );
}
