import React from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  selectDisplayChapter,
  setDisplayChapter,
} from "../globals/globalsSlice";
import SectionTitle from "./SectionTitle";
import { useGetBlocksQuery } from "./blockSlice";
import { useNavigate } from "react-router-dom";

export default function SectionTitlesList({ chapter, setViewSideBar }) {
  const displayChapter = useSelector(selectDisplayChapter);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const {
    data: blocks,
    isLoading,
    isSuccess,
    isError,
    error,
  } = useGetBlocksQuery(chapter?.id || displayChapter?.id);

  let content;
  if (isLoading) {
    content = <p>"Loading..."</p>;
  } else if (isSuccess) {
    // destructure blocks from normalized object
    const { ids, entities } = blocks;
    content = ids.map((id) => (
      <SectionTitle
        key={id}
        block={entities[id]}
        chapter={chapter}
        setViewSideBar={setViewSideBar}
      />
    ));
  } else if (isError) {
    content = <p>{error}</p>;
  }

  const handleChapterContent = () => {
    dispatch(setDisplayChapter(chapter));
    navigate("/sections");
  };

  return (
    <div className="flex flex-col gap-1">
      <button
        onClick={handleChapterContent}
        className="text-start m-0 p-0 w-fit font-semibold text-slate-700"
      >
        Chapter Content
      </button>
      {content}
    </div>
  );
}
