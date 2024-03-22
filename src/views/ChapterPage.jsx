import { useContext, useEffect, useState } from "react";
import BlockList from "../features/chapterPage/BlockList";
import { GlobalContext } from "../context/GlobalState";
import BlockContent from "../features/chapterPage/BlockContent";
import SectionChapterList from "../features/chapterPage/SectionChapterList";
import { HiViewGrid } from "react-icons/hi";
import { IoGrid } from "react-icons/io5";
import { IoMenu } from "react-icons/io5";
// Imported components

import { useDispatch, useSelector } from "react-redux";

const ChapterPage = () => {
  const {
    viewTab,
    handleViewTab,
    displayChapter,
    displayBlock,
    blocks,
    displayMode,
    handleToggleDisplayMode,
  } = useContext(GlobalContext);

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
      <div className="flex gap-2 w-full justify-center items-center">
        <span
          className={
            (viewTab === "chapters" ? "btn-red-dark " : "btn-red ") + " btn "
          }
          onClick={() => handleViewTab("chapters")}
        >
          Chapters
        </span>
        <span
          className={
            (viewTab === "sections" ? "btn-red-dark " : "btn-red ") + " btn "
          }
          onClick={() => handleViewTab("sections")}
        >
          Sections
        </span>
        <span
          className={
            (viewTab === "lesson" ? "btn-red-dark " : "btn-red ") + " btn "
          }
          onClick={() => handleViewTab("lesson")}
        >
          Lesson
        </span>
        <span>
          {displayMode === "block" ? (
            <IoGrid
              className="icon text-red-500 hover:text-red-600 duration-200"
              onClick={handleToggleDisplayMode}
            />
          ) : (
            <IoMenu
              className="icon text-red-500 hover:text-red-600 duration-200"
              onClick={handleToggleDisplayMode}
            />
          )}
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
