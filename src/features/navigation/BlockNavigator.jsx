import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  selectChapters,
  selectDisplayBlock,
  selectDisplayChapter,
  selectLanguage,
  selectLessons,
  setDisplayBlock,
  setDisplayChapter,
} from "../globals/globalsSlice";
import { FaCircleArrowLeft, FaCircleArrowRight } from "react-icons/fa6";

const BlockNavigator = ({ children }) => {
  const displayChapter = useSelector(selectDisplayChapter);
  const displayBlock = useSelector(selectDisplayBlock);

  const chapters = useSelector(selectChapters);
  const lessons = useSelector(selectLessons);

  const dispatch = useDispatch();

  const [blockIndex, setBlockIndex] = useState(0);
  const [chapterIndex, setChapterIndex] = useState(0);
  const [moveDirection, setMoveDirection] = useState("");

  const [blocks, setBlocks] = useState([]);

  useEffect(() => {
    setBlocks(() => {
      return lessons
        .filter((item) => item.chapterID === displayChapter?.id)
        .sort((a, b) => (a.lessonNo > b.lessonNo ? 1 : -1));
    });
  }, [displayChapter]);

  useEffect(() => {
    setChapterIndex(() => {
      const tempChapterIndex = chapters.findIndex(
        (item) => item.id === displayChapter.id
      );
      if (tempChapterIndex >= 0) {
        return tempChapterIndex;
      } else return 0;
    });
  }, [displayChapter, displayBlock]);

  useEffect(() => {
    if (moveDirection === "next") {
      dispatch(setDisplayBlock(blocks[0]));
      setMoveDirection("");
    } else if (moveDirection === "prev") {
      dispatch(setDisplayBlock(blocks[blocks.length - 1]));
      setMoveDirection("");
    }
  }, [blocks]);

  useEffect(() => {
    setBlockIndex(() => {
      const tempBlockIndex = blocks?.findIndex(
        (item) => item?.id === displayBlock?.id
      );
      if (tempBlockIndex >= 0) {
        return tempBlockIndex;
      } else return 0;
    });
  }, [displayBlock, blocks]);

  const firstLesson = blockIndex === 0;
  const firstChapter = chapterIndex === 0;
  const lastLesson = blockIndex === blocks?.length - 1;
  const lastChapter = chapterIndex === chapters?.length - 1;

  const handleNext = () => {
    if (blockIndex < blocks.length - 1) {
      setMoveDirection("next");
      setBlockIndex((curr) => curr + 1);
      dispatch(setDisplayBlock(blocks[blockIndex + 1]));
      window.scrollTo(0, 0);
    } else {
      if (lastChapter) {
      } else {
        setMoveDirection("next");
        dispatch(setDisplayChapter(chapters[chapterIndex + 1]));
        window.scrollTo(0, 0);
      }
    }
  };

  const handlePrevious = () => {
    if (blockIndex > 0) {
      setMoveDirection("prev");
      setBlockIndex((curr) => curr - 1);
      dispatch(setDisplayBlock(blocks[blockIndex - 1]));
      window.scrollTo(0, 0);
    } else {
      if (chapterIndex > 0) {
        setMoveDirection("prev");
        dispatch(setDisplayChapter(chapters[chapterIndex - 1]));
        window.scrollTo(0, 0);
      }
    }
  };

  return (
    <div className="w-full flex flex-1 justify-between items-center">
      <button
        onClick={handlePrevious}
        disabled={firstLesson && firstChapter}
        className="flex items-center duration-200 text-red-600 hover:text-red-500 disabled:text-slate-600 group"
      >
        <FaCircleArrowLeft size={36} className="mr-2" />
        <span className="font-semibold hidden md:inline -translate-x-2 opacity-0 group-hover:opacity-100 group-hover:translate-x-0 invisible group-hover:visible duration-200 text-nowrap">
          {firstLesson ? "Previous Chapter" : "Previous Lesson"}
        </span>
      </button>
      {/* {children} */}
      <button
        onClick={handleNext}
        disabled={lastLesson && lastChapter}
        className="flex items-center duration-200 text-red-600 hover:text-red-500 disabled:text-slate-600 group"
      >
        <span className="font-semibold hidden md:inline translate-x-2 opacity-0 group-hover:opacity-100 group-hover:translate-x-0 invisible group-hover:visible duration-200 text-nowrap">
          {lastLesson ? "Next Chapter" : "Next Lesson"}
        </span>
        <FaCircleArrowRight size={36} className="ml-2" />
      </button>
    </div>
  );
};

export default BlockNavigator;
