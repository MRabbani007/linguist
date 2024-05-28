import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  selectDisplayChapter,
  selectLanguage,
  setDisplayChapter,
} from "../globals/globalsSlice";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa6";
import { useLazyGetChaptersQuery } from "../chapters/chapterSlice";

const ChapterNavigator = ({ children }) => {
  const dispatch = useDispatch();
  const displayChapter = useSelector(selectDisplayChapter);
  const language = useSelector(selectLanguage);

  const [
    getChapters,
    {
      data: chaptersData,
      isLoading: isLoadingChapters,
      isSuccess: isSuccessChapters,
      isError: isErrorChapters,
      error: errorChapters,
    },
  ] = useLazyGetChaptersQuery(displayChapter?.id);

  const [chapters, setChapters] = useState([]);

  // get chapters on first load
  useEffect(() => {
    getChapters(language?.id);
  }, []);

  // denoralize chapters data
  useEffect(() => {
    if (isSuccessChapters) {
      setChapters(() => {
        return chaptersData.ids.map((id) => chaptersData.entities[id]);
      });
    }
  }, [chaptersData]);

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
      window.scrollTo(0, 0);
    }
  };

  const handlePrevious = () => {
    if (chapterIndex > 0) {
      dispatch(setDisplayChapter(chapters[chapterIndex - 1]));
      window.scrollTo(0, 0);
    }
  };

  return (
    <section className="w-full flex flex-1 justify-between items-center">
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
    </section>
  );
};

export default ChapterNavigator;
