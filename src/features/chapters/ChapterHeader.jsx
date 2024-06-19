import React from "react";
import { CiEdit } from "react-icons/ci";
import { useSelector } from "react-redux";
import { selectEditMode } from "../globals/globalsSlice";

const ChapterHeader = ({ chapter, setEditChapter }) => {
  const editMode = useSelector(selectEditMode);

  return (
    <header className="bg-slate-200 group relative">
      <div className="text-center">
        <h1 className="font-semibold text-xl whitespace-break-spaces text-wrap">
          {"Chapter " + chapter?.chapterNo + ": " + chapter?.title}
        </h1>
        <p className="font-light text-wrap">{chapter?.subtitle}</p>
      </div>
      {editMode && (
        <button
          onClick={() => setEditChapter((curr) => !curr)}
          className="absolute right-3 top-[50%] -translate-y-[50%] invisible group-hover:visible"
        >
          <CiEdit size={34} />
        </button>
      )}
    </header>
  );
};

export default ChapterHeader;
