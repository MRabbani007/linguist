import React, { useState } from "react";
import SectionTitlesList from "../blocks/SectionTitlesList";
import { selectDisplayChapter } from "../globals/globalsSlice";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { MdOutlineKeyboardArrowRight } from "react-icons/md";
import { TbProgress } from "react-icons/tb";
import { IoCheckmarkDone } from "react-icons/io5";
import { selectProfileResult } from "../profile/profileSlice";
import { PiCircleDashed } from "react-icons/pi";

const ChapterTitle = ({
  chapter,
  index,
  expandedIndex,
  setExpandedIndex,
  setViewSideBar,
}) => {
  const displayChapter = useSelector(selectDisplayChapter);
  const { data: profile } = useSelector(selectProfileResult);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const progress =
    Array.isArray(profile) &&
    profile[0]?.chapters &&
    profile[0]?.chapters.find((c) => c.id === chapter.id);

  const handleOpen = async () => {
    // dispatch(setDisplayChapter(chapter));
    // navigate("/sections");
    if (expandedIndex === index) {
      setExpandedIndex(-1);
    } else {
      setExpandedIndex(index);
    }
  };

  const isCompleted = progress?.completed;

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
        {index === expandedIndex && (
          <SectionTitlesList
            chapter={chapter}
            setViewSideBar={setViewSideBar}
          />
        )}
      </ul>
    </div>
  );
};

export default ChapterTitle;
