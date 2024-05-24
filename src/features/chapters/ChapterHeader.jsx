import React from "react";
import { CiEdit } from "react-icons/ci";
import { useSelector } from "react-redux";
import { selectEditMode } from "../globals/globalsSlice";

const ChapterHeader = ({ chapter, setEditChapter }) => {
  const editMode = useSelector(selectEditMode);

  return (
    <h2 className="text-center flex-1 relative group">
      <p className="font-semibold text-xl">
        {"Chapter " + chapter?.chapterNo + ": " + chapter?.title}
      </p>
      <p>{chapter?.subtitle}</p>
      {editMode && (
        <button
          onClick={() => setEditChapter((curr) => !curr)}
          className="absolute right-3 top-1 invisible group-hover:visible"
        >
          <CiEdit size={34} />
        </button>
      )}
    </h2>
  );
};

export default ChapterHeader;
