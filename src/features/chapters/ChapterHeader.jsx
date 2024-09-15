import React from "react";
import { useSelector } from "react-redux";
import { selectEditMode } from "../globals/globalsSlice";

const ChapterHeader = ({ chapter, setEditChapter }) => {
  const editMode = useSelector(selectEditMode);

  return (
    <header className="group relative">
      <div className="flex items-stretch justify-start">
        <p
          title={`Chapter ${chapter?.chapterNo ? chapter?.chapterNo : 0}`}
          className="min-w-12 text-accent_foreground bg-accent flex items-center justify-center text-base md:text-2xl font-semibold"
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
          <h1 className="text-2xl md:text-4xl font-semibold text-wrap inline py-1 px-2 border-accent border-b-4">
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
