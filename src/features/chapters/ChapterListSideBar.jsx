import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { selectAllChapters, useGetChaptersQuery } from "./chapterSlice";
import ChapterTitle from "./ChapterTitle";
import {
  selectDisplayBlock,
  selectDisplayChapter,
} from "../globals/globalsSlice";
import { useNavigate } from "react-router-dom";

const ChapterListSideBar = () => {
  const navigate = useNavigate();
  const displayChapter = useSelector(selectDisplayChapter);
  const displayBlock = useSelector(selectDisplayBlock);
  const [expandedIndex, setExpandedIndex] = useState(0);

  const {
    data: chapters,
    isLoading,
    isSuccess,
    isError,
    error,
  } = useGetChaptersQuery();

  useEffect(() => {
    if (isSuccess) {
      const temp = chapters.ids.map((id) => chapters.entities[id]);
      setExpandedIndex(() => {
        let idx = temp.findIndex((item) => item.id === displayChapter?.id);
        if (idx >= 0) {
          return idx;
        } else {
          return 0;
        }
      });
    }
  }, [chapters, displayChapter, displayBlock]);

  let content;
  if (isLoading) {
    content = <p>"Loading..."</p>;
  } else if (isSuccess) {
    const { ids, entities } = chapters;
    content = ids.map((id, index) => (
      <ChapterTitle
        chapter={entities[id]}
        key={id}
        index={index}
        expandedIndex={expandedIndex}
        setExpandedIndex={setExpandedIndex}
      />
    ));
  } else if (isError) {
    content = <p>{JSON.stringify(error)}</p>;
  }

  const handleOverview = () => {
    navigate("/chapters");
  };

  return (
    <div className="p-0 flex flex-col gap-2 overflow-y-auto">
      <button
        onClick={handleOverview}
        className="text-start m-0 p-0 w-fit font-semibold text-slate-700"
      >
        Overview
      </button>
      {content}
    </div>
  );
};

export default ChapterListSideBar;
