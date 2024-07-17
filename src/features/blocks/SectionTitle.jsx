import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  selectDisplayBlock,
  selectProgress,
  setDisplayBlock,
  setDisplayChapter,
} from "../globals/globalsSlice";
import { IoArrowForwardOutline, IoCheckmarkDone } from "react-icons/io5";

export default function SectionTitle({
  lesson,
  chapter,
  setViewSideBar = () => {},
}) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const displayBlock = useSelector(selectDisplayBlock);
  const progress = useSelector(selectProgress);

  const lessonProgress = progress.find((item) => item.lessonID === lesson?.id);

  // const chap = progress.find((c) => c?.id === lesson?.chapterID);

  // const lessonProgress =
  //   chap?.lessons && chap?.lessons.find((l) => l.id === lesson?.id);

  const isCompleted =
    lessonProgress?.completed && lessonProgress.completed === true;

  const blockOpen = () => {
    dispatch(setDisplayChapter(chapter));
    dispatch(setDisplayBlock(lesson));
    setViewSideBar(false);
    navigate("/content/lesson");
  };

  return (
    <li
      onClick={blockOpen}
      className={
        (displayBlock?.id === lesson?.id ? "text-red-600" : "") +
        " cursor-pointer duration-200 border-b-2 border-white w-full py-2 px-8 flex items-center gap-2 relative"
      }
    >
      {displayBlock?.id === lesson?.id && (
        <IoArrowForwardOutline className="absolute top-1/2 -translate-y-1/2 left-2" />
      )}
      <span>{lesson?.title}</span>
      {
        isCompleted ? (
          <IoCheckmarkDone
            size={25}
            className="absolute top-1/2 -translate-y-1/2 right-2"
          />
        ) : null
        // <AiOutlineDash
        //   size={25}
        //   className="absolute top-1/2 -translate-y-1/2 right-2"
        // />
      }
    </li>
  );
}
