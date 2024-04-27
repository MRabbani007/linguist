import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  selectDisplayChapter,
  setDisplayChapter,
} from "../globals/globalsSlice";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa6";
import { selectAllChapters } from "../chapters/chapterSlice";

const ChapterNavigator = ({ children }) => {
  const dispatch = useDispatch();
  const displayChapter = useSelector(selectDisplayChapter);
  const chapters = useSelector(selectAllChapters);

  const [chapterIndex, setChapterIndex] = useState(0);

  useEffect(() => {
    setChapterIndex(() => {
      const tempChapterIndex = chapters.findIndex(
        (item) => item.id === displayChapter.id
      );
      if (tempChapterIndex >= 0) {
        return tempChapterIndex;
      } else return 0;
    });
  }, [displayChapter]);

  const firstChapter = chapterIndex === 0;
  const lastChapter = chapterIndex === chapters.length - 1;

  const handleNext = () => {
    if (!lastChapter) {
      dispatch(setDisplayChapter(chapters[chapterIndex + 1]));
    }
  };

  const handlePrevious = () => {
    if (chapterIndex > 0) {
      dispatch(setDisplayChapter(chapters[chapterIndex - 1]));
    }
  };

  return (
    <div className="flex justify-between items-center p-3 bg-slate-200 rounded-lg shadow-md shadow-slate-400 group relative">
      <button
        onClick={handlePrevious}
        disabled={firstChapter}
        className="flex items-center text-red-600 hover:text-red-500 disabled:text-slate-600 duration-200"
      >
        <FaChevronLeft className="icon" />
        <span className="font-semibold hidden md:inline">
          {"Previous Chapter"}
        </span>
      </button>
      {children}
      <button
        onClick={handleNext}
        disabled={lastChapter}
        className="flex items-center text-red-600 hover:text-red-500 disabled:text-slate-600 duration-200"
      >
        <span className="font-semibold hidden md:inline">{"Next Chapter"}</span>
        <FaChevronRight className="icon" />
      </button>
    </div>
  );
};

export default ChapterNavigator;
