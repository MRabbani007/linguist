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
          (displayChapter?.id === chapter?.id ? "text-red-500" : "") +
          " flex items-center justify-between cursor-pointer duration-200"
        }
        onClick={handleOpen}
      >
        {/* {isCompleted ? (
          <IoCheckmarkDone size={25} />
        ) : (
          <PiCircleDashed size={25} />
        )} */}
        <div className="flex-1">
          <p className="font-bold">{chapter.title}</p>
          <p>{chapter.subtitle}</p>
        </div>
        <MdOutlineKeyboardArrowRight
          size={34}
          className={index === expandedIndex && "rotate-90 duration-200"}
        />
      </div>
      <ul className="flex flex-col items-start gap-0 list-inside list-disc">
        {index === expandedIndex && content}
      </ul>
    </div>
  );
};

export default ChapterTitle;
