import React from "react";
import { BsHourglass } from "react-icons/bs";
import { LuListTree } from "react-icons/lu";
import { PiTreeViewThin } from "react-icons/pi";
import { RiAlignItemLeftLine } from "react-icons/ri";
import { useDispatch, useSelector } from "react-redux";
import {
  selectDisplayChapter,
  setDisplayChapter,
} from "../globals/globalsSlice";
import { useNavigate } from "react-router-dom";
import { IoTimerOutline } from "react-icons/io5";

export default function CardChapter({ chapter, lessonCount = 0 }) {
  const displayChapter = useSelector(selectDisplayChapter);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleOpen = async () => {
    dispatch(setDisplayChapter(chapter));
    navigate("/content/sections");
  };

  return (
    <div
      onClick={handleOpen}
      className="flex flex-col items-center justify-center min-w-[300px] h-[150px] bg-gradient-to-b from-red-500 to-red-600 text-white flex-1 text-center text-xl gap-2 hover:shadow-lg hover:shadow-zinc-400 hover:scale-105 cursor-pointer duration-200 group relative"
    >
      <p className="opacity-0 invisible -translate-y-2 group-hover:translate-y-0 group-hover:opacity-100 group-hover:visible absolute top-2 left-1/2 -translate-x-1/2 duration-200">
        {"Chapter " + chapter?.chapterNo}
      </p>
      <p className=" font-semibold">{chapter?.title || ""}</p>
      <p className="flex items-center justify-evenly gap-8 absolute bottom-2 left-1/2 -translate-x-1/2 opacity-0 invisible group-hover:opacity-100 group-hover:visible translate-y-2 group-hover:translate-y-0 duration-200 ">
        <span title={`${lessonCount} Lessons`}>
          {lessonCount}
          <LuListTree size={25} className="inline" />
        </span>
        <span title={`5 Hours`}>
          5
          <IoTimerOutline size={25} className="inline" />
        </span>
      </p>
    </div>
  );
}
