import React, { useState } from "react";
import SectionTitlesList from "../blocks/SectionTitlesList";
import {
  selectDisplayChapter,
  setDisplayChapter,
} from "../globals/globalsSlice";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { MdOutlineKeyboardArrowRight } from "react-icons/md";

const ChapterTitle = ({ chapter, index, expandedIndex, setExpandedIndex }) => {
  const displayChapter = useSelector(selectDisplayChapter);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleOpen = async () => {
    // dispatch(setDisplayChapter(chapter));
    // navigate("/sections");
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
          (displayChapter?.id === chapter?.id ? "text-red-500" : "") +
          " flex items-center justify-between cursor-pointer duration-200"
        }
        onClick={handleOpen}
      >
        <div>
          <p className="font-bold">{chapter.title}</p>
          <p>{chapter.subtitle}</p>
        </div>
        <MdOutlineKeyboardArrowRight
          size={34}
          className={index === expandedIndex && "rotate-90 duration-200"}
        />
      </div>
      <div className="pl-3">
        {index === expandedIndex && <SectionTitlesList chapter={chapter} />}
      </div>
    </div>
  );
};

export default ChapterTitle;
