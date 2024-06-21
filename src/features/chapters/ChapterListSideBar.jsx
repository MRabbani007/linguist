import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import ChapterTitle from "./ChapterTitle";
import {
  selectChapters,
  selectDisplayBlock,
  selectDisplayChapter,
} from "../globals/globalsSlice";

const ChapterListSideBar = ({ setViewSideBar }) => {
  const chapters = useSelector(selectChapters);
  const displayChapter = useSelector(selectDisplayChapter);
  const displayBlock = useSelector(selectDisplayBlock);
  const [expandedIndex, setExpandedIndex] = useState(0);

  const [showMore, setShowMore] = useState(false);

  useEffect(() => {
    setExpandedIndex(() => {
      let idx = chapters.findIndex((item) => item.id === displayChapter?.id);
      if (idx >= 0) {
        return idx;
      } else {
        return 0;
      }
    });
  }, [chapters, displayChapter, displayBlock]);

  const temp = showMore ? chapters : chapters.slice(0, 6);

  let content = temp.map((chapter, index) => (
    <ChapterTitle
      chapter={chapter}
      key={chapter?.id}
      index={index}
      expandedIndex={expandedIndex}
      setExpandedIndex={setExpandedIndex}
      setViewSideBar={setViewSideBar}
    />
  ));

  return (
    <div className="p-0 flex flex-col gap-2 overflow-y-auto px-4">
      {content}
      <button
        onClick={() => setShowMore((curr) => !curr)}
        className="text-red-600 font-semibold"
      >
        {showMore ? "Show Less" : "Show More"}
      </button>
    </div>
  );
};

export default ChapterListSideBar;
