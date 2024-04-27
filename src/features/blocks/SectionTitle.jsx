import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  selectDisplayBlock,
  setDisplayBlock,
  setDisplayChapter,
} from "../globals/globalsSlice";

export default function SectionTitle({ block, chapter }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const displayBlock = useSelector(selectDisplayBlock);

  const blockOpen = () => {
    dispatch(setDisplayChapter(chapter));
    dispatch(setDisplayBlock(block));
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
      {block?.title}
    </div>
  );
}
