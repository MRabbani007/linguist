import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  selectDisplayBlock,
  selectProgress,
  setDisplayBlock,
  setDisplayChapter,
} from "../globals/globalsSlice";
import { IoCheckmarkDone } from "react-icons/io5";
import { selectProfileResult } from "../profile/profileSlice";
import { AiOutlineDash } from "react-icons/ai";

export default function SectionTitle({
  lesson,
  chapter,
  setViewSideBar = () => {},
}) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const displayBlock = useSelector(selectDisplayBlock);
  const progress = useSelector(selectProgress);

  const chap = progress.find((c) => c?.id === lesson?.chapterID);

  const lessonProgress =
    chap?.lessons && chap?.lessons.find((l) => l.id === lesson?.id);

  const isCompleted = lessonProgress?.completed === true;

  const blockOpen = () => {
    dispatch(setDisplayChapter(chapter));
    dispatch(setDisplayBlock(lesson));
    setViewSideBar(false);
    navigate("/lesson");
  };

  return (
    <li
      onClick={blockOpen}
      className={
        (displayBlock?.id === lesson?.id ? "text-yellow-500" : "") +
        " cursor-pointer duration-200"
      }
    >
      {/* {isCompleted ? (
        <IoCheckmarkDone size={25} className="inline mr-2" />
      ) : (
        <AiOutlineDash size={25} className="inline mr-2" />
      )} */}
      {lesson?.title}
    </li>
  );
}
