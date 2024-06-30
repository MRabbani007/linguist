import React, { useState } from "react";
import {
  selectDisplayChapter,
  selectLessons,
  selectProgress,
} from "../globals/globalsSlice";
import { useSelector } from "react-redux";
import { MdOutlineKeyboardArrowRight } from "react-icons/md";
import { TbProgress } from "react-icons/tb";
import { IoCheckmarkDone } from "react-icons/io5";
import { PiCircleDashed } from "react-icons/pi";
import SectionTitle from "../blocks/SectionTitle";

const ChapterTitle = ({
  chapter,
  index,
  expandedIndex,
  setExpandedIndex,
  setViewSideBar,
}) => {
  const displayChapter = useSelector(selectDisplayChapter);
  const lessons = useSelector(selectLessons);
  const progress = useSelector(selectProgress);

  const chapterProgress = progress.find((c) => c.id === chapter.id);

  let content = lessons
    .filter((l) => l.chapterID === chapter.id)
    .map((lesson) => (
      <SectionTitle
        key={lesson?.id}
        lesson={lesson}
        chapter={chapter}
        setViewSideBar={setViewSideBar}
      />
    ));

  const handleOpen = async () => {
    if (expandedIndex === index) {
      setExpandedIndex(-1);
    } else {
      setExpandedIndex(index);
    }
  };

  const isCompleted = chapterProgress?.completed;

  return (
    <div>
      <div
        className={
          (displayChapter?.id === chapter?.id ? "bg-red-500 text-white " : "") +
          (index === 0 ? " border-t-2 " : "") +
          " flex items-center justify-between cursor-pointer duration-200 py-2 px-4 border-b-2 border-white"
        }
        onClick={handleOpen}
      >
        {/* {isCompleted ? (
          <IoCheckmarkDone size={25} />
        ) : (
          <PiCircleDashed size={25} />
        )} */}
        <p className="">{chapter.title}</p>
        {/* <p>{chapter.subtitle}</p> */}
        <MdOutlineKeyboardArrowRight
          size={30}
          className={
            (index === expandedIndex ? "rotate-90 duration-200" : "") +
            " inline"
          }
        />
      </div>
      <ul className="flex flex-col items-start">
        {index === expandedIndex && content}
      </ul>
    </div>
  );
};

export default ChapterTitle;
