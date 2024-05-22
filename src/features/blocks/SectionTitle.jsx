import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  selectDisplayBlock,
  setDisplayBlock,
  setDisplayChapter,
} from "../globals/globalsSlice";
import { IoCheckmarkDone } from "react-icons/io5";
import { selectProfileResult } from "../profile/profileSlice";

export default function SectionTitle({
  block,
  chapter,
  setViewSideBar = () => {},
}) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const displayBlock = useSelector(selectDisplayBlock);

  const {
    data: profile,
    isLoading,
    isSuccess,
  } = useSelector(selectProfileResult);

  useEffect(() => {}, [isSuccess]);

  const chap =
    Array.isArray(profile) &&
    profile[0]?.chapters &&
    profile[0]?.chapters.find((c) => c?.id === block?.chapterID);

  const progress =
    chap?.lessons && chap?.lessons.find((l) => l.id === block?.id);

  const isCompleted = progress?.completed === true;

  const blockOpen = () => {
    dispatch(setDisplayChapter(chapter));
    dispatch(setDisplayBlock(block));
    setViewSideBar(false);
    navigate("/lesson");
  };

  return (
    <div
      onClick={blockOpen}
      className={
        (displayBlock?.id === block?.id ? "text-yellow-500" : "") +
        " cursor-pointer duration-200"
      }
    >
      {isCompleted ? (
        <IoCheckmarkDone size={25} className="inline mr-2" />
      ) : null}
      {block?.title}
    </div>
  );
}
