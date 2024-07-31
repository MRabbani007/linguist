import React from "react";
import { useSelector } from "react-redux";
import { selectEditMode } from "../globals/globalsSlice";

const ChapterHeader = ({ chapter, setEditChapter }) => {
  const editMode = useSelector(selectEditMode);

  return (
    <header className="group relative bg-destructive pt-8 px-4 mt-4">
      <div className="flex items-stretch justify-start">
        <p
          title={`Chapter ${chapter?.chapterNo ? chapter?.chapterNo : 0}`}
          className="w-20 h-[120px] text-accent_foreground bg-accent flex items-center justify-center text-2xl md:text-4xl font-bold"
        >
          {(chapter?.chapterNo ? chapter?.chapterNo : 0).toLocaleString(
            "en-US",
            {
              minimumIntegerDigits: 2,
              useGrouping: false,
            }
          )}
        </p>
        <div className="flex flex-col gap-1 text-destructive_foreground flex-1">
          <h1 className="text-4xl md:text-7xl font-semibold text-wrap inline py-1 px-2 border-accent border-b-4">
            {chapter?.title}
          </h1>
          <p className="py-1 px-2">{chapter?.subtitle}</p>
        </div>
      </div>
      {/* <p className="font-light text-wrap">{chapter?.subtitle}</p> */}
    </header>
  );
};

export default ChapterHeader;
