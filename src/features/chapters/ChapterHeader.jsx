import React from "react";
import { useSelector } from "react-redux";
import { selectEditMode } from "../globals/globalsSlice";

const ChapterHeader = ({ chapter, setEditChapter }) => {
  const editMode = useSelector(selectEditMode);

  return (
    <header className="bg-zinc-200 group relative text-center p-4">
      <h1 className="font-bold text-xl whitespace-break-spaces text-wrap text-zinc-900 w-full">
        {"Chapter " + chapter?.chapterNo + ": " + chapter?.title}
      </h1>
      {/* <p className="font-light text-wrap">{chapter?.subtitle}</p> */}
    </header>
  );
};

export default ChapterHeader;
