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

  let content = chapters.map((chapter, index) => (
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
    <div className="p-0 flex flex-col gap-2 overflow-y-auto">{content}</div>
  );
};

export default ChapterListSideBar;
