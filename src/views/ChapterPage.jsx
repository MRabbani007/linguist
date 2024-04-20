import { useContext, useEffect, useState } from "react";
import { GlobalContext } from "../context/GlobalState";
import { IoGrid } from "react-icons/io5";
import { IoMenu } from "react-icons/io5";
// Imported components
import SectionChapterList from "../features/chapters/SectionChapterList";
import BlockList from "../features/blocks/BlockList";
import BlockContent from "../features/blocks/BlockContent";
import { useDispatch, useSelector } from "react-redux";
import {
  selectDisplayMode,
  selectViewTab,
  setViewTab,
  toggleDisplayMode,
} from "../features/globals/globalsSlice";

const ChapterPage = () => {
  const viewTab = useSelector(selectViewTab);
  const displayMode = useSelector(selectDisplayMode);
  const dispatch = useDispatch();

  const handleToggleDisplayMode = () => {
    dispatch(toggleDisplayMode());
  };

  const handleViewTab = (tab) => {
    dispatch(setViewTab(tab));
  };

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
          ) : displayMode === "table" ? (
            <IoMenu
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
        {viewTab === "sections" && <BlockList />}
        {viewTab === "lesson" && (
          <div className="flex max-w-[1000px] w-full mx-auto">
            <BlockContent />
          </div>
        )}
      </div>
    </div>
  );
};

export default ChapterPage;
