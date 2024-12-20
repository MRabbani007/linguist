import React, { useState } from "react";
import {
  selectDisplayChapter,
  selectLessons,
  selectProgress,
} from "../globals/globalsSlice";
import { useSelector } from "react-redux";
import { MdOutlineKeyboardArrowRight } from "react-icons/md";
import SectionTitle from "../blocks/SectionTitle";

const ChapterTitle = ({
  chapter,
  index,
  expandedIndex,
  setExpandedIndex,
  setViewSideBar,
}) => {
  const displayChapter = useSelector(selectDisplayChapter);

  const handleOpen = async () => {
    if (expandedIndex === index) {
      setExpandedIndex(-1);
    } else {
      setExpandedIndex(index);
    }
  };

  return (
    <div>
      <div
        className={
          (displayChapter?.id === chapter?.id
            ? "border-red-600 "
            : "border-white ") +
          (index === 0 ? " border-t-2 " : "") +
          " flex items-center justify-between cursor-pointer duration-200 py-2 px-4 border-b-2 "
        }
        onClick={handleOpen}
      >
        <p className="">{chapter.title}</p>
        <MdOutlineKeyboardArrowRight
          size={30}
          className={
            (index === expandedIndex ? "rotate-90 duration-200" : "") +
            " inline"
          }
        />
      </div>
      <ul className="flex flex-col items-start">
        {lessons
          .filter((l) => l.chapterID === chapter.id)
          .map((lesson) => (
            <SectionTitle
              key={lesson?.id}
              lesson={lesson}
              chapter={chapter}
              setViewSideBar={setViewSideBar}
            />
          ))}
      </ul>
    </div>
  );
};

export default ChapterTitle;
