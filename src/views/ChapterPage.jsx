import { useContext, useEffect, useState } from "react";
import BlockList from "../features/chapterPage/BlockList";
import { GlobalContext } from "../context/GlobalState";
import BlockContent from "../features/chapterPage/BlockContent";
import SectionChapterList from "../features/chapterPage/SectionChapterList";
// Imported components

import { useDispatch, useSelector } from "react-redux";

const ChapterPage = () => {
  const { viewTab, handleViewTab, displayChapter, displayBlock, blocks } =
    useContext(GlobalContext);

  const chapter = useSelector((state) => state.chapter);
  const dispatch = useDispatch();

  const [colSpan, setColSpan] = useState(4);

  useEffect(() => {
    if (displayBlock?.fourthLang !== "") {
      setColSpan(6);
    } else if (displayBlock?.thirdLang !== "") {
      setColSpan(5);
    } else {
      setColSpan(4);
    }
  }, [displayBlock]);

  return (
    <div className="flex flex-col items-center justify-center gap-2">
      <div className="flex gap-2 w-full justify-center">
        <span className="btn btn-red" onClick={() => handleViewTab("chapters")}>
          Chapters
        </span>
        <span className="btn btn-red" onClick={() => handleViewTab("sections")}>
          Sections
        </span>
        <span className="btn btn-red" onClick={() => handleViewTab("lesson")}>
          Lesson
        </span>
      </div>
      <div className="flex w-full justify-center">
        {viewTab === "chapters" && <SectionChapterList />}
        {viewTab === "sections" && <BlockList handleViewTab={handleViewTab} />}
        {viewTab === "lesson" && (
          <div className="flex max-w-[1000px] w-full mx-auto">
            <BlockContent colSpan={colSpan} setColSpan={setColSpan} />
          </div>
        )}
      </div>
    </div>
  );
};

export default ChapterPage;
