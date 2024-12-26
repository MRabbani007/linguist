import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  selectChapters,
  selectDisplayChapter,
  setDisplayChapter,
} from "../globals/globalsSlice";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa6";
import { createSearchParams, useNavigate } from "react-router-dom";

const ChapterNavigator = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const displayChapter = useSelector(selectDisplayChapter);
  const chapters = useSelector(selectChapters);

  const [chapterIndex, setChapterIndex] = useState(0);

  useEffect(() => {
    setChapterIndex(() => {
      const tempChapterIndex = chapters.findIndex(
        (item) => item.id === displayChapter?.id
      );
      if (tempChapterIndex >= 0) {
        return tempChapterIndex;
      } else return 0;
    });
  }, [displayChapter, chapters]);

  const handleNext = () => {
    if (!lastChapter) {
      dispatch(setDisplayChapter(chapters[chapterIndex + 1]));
      window.scrollTo(0, 0);
      navigate({
        pathname: "/learn/chapter",
        search: `?${createSearchParams({
          title: chapters[chapterIndex + 1]?.title,
          id: chapters[chapterIndex + 1]?.id,
        })}`,
      });
    }
  };

  const handlePrevious = () => {
    if (chapterIndex > 0) {
      dispatch(setDisplayChapter(chapters[chapterIndex - 1]));
      window.scrollTo(0, 0);
      navigate({
        pathname: "/learn/chapter",
        search: `?${createSearchParams({
          title: chapters[chapterIndex - 1]?.title,
          id: chapters[chapterIndex - 1]?.id,
        })}`,
      });
    }
  };

  const firstChapter = chapterIndex === 0;
  const lastChapter = chapterIndex === chapters.length - 1;

  return (
    <div className="p-4 flex justify-between items-center">
      <button
        onClick={handlePrevious}
        disabled={firstChapter}
        className="flex items-center gap-2 text-accent disabled:text-destructive_foreground group duration-200"
      >
        <FaArrowLeft size={24} />
        <span className="font-semibold hidden md:inline">Previous Chapter</span>
      </button>
      <button
        onClick={handleNext}
        disabled={lastChapter}
        className="flex items-center gap-2 text-accent disabled:text-destructive_foreground group duration-200"
      >
        <span className="font-semibold hidden md:inline">Next Chapter</span>
        <FaArrowRight size={24} />
      </button>
    </div>
  );
};

export default ChapterNavigator;
