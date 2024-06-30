import React from "react";
import { CiEdit } from "react-icons/ci";
import { useSelector } from "react-redux";
import { selectEditMode } from "../globals/globalsSlice";

const ChapterHeader = ({ chapter, setEditChapter }) => {
  const editMode = useSelector(selectEditMode);

  return (
    <header className="bg-zinc-200 group relative text-center">
      <h1 className="font-bold text-xl whitespace-break-spaces text-wrap text-zinc-900 w-full">
        {"Chapter " + chapter?.chapterNo + ": " + chapter?.title}
      </h1>
      {/* <p className="font-light text-wrap">{chapter?.subtitle}</p> */}
      {/* {editMode && (
        <button
          onClick={() => setEditChapter((curr) => !curr)}
          className="absolute right-3 top-[50%] -translate-y-[50%] invisible group-hover:visible"
        >
          <CiEdit size={34} />
        </button>
      )} */}
    </header>
  );
};

export default ChapterHeader;
