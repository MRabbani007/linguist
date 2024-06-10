import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLazyGetBlocksQuery } from "../blocks/blockSlice";
import {
  selectDisplayBlock,
  selectDisplayChapter,
  selectLanguage,
  setDisplayBlock,
  setDisplayChapter,
} from "../globals/globalsSlice";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa6";
import { useLazyGetChaptersQuery } from "../chapters/chapterSlice";

const BlockNavigator = ({ children }) => {
  const displayChapter = useSelector(selectDisplayChapter);
  const displayBlock = useSelector(selectDisplayBlock);
  const language = useSelector(selectLanguage);

  const dispatch = useDispatch();

  const [blockIndex, setBlockIndex] = useState(0);
  const [chapterIndex, setChapterIndex] = useState(0);
  const [moveDirection, setMoveDirection] = useState("");

  const [getBlocks, { data, isLoading, isSuccess, isError, error }] =
    useLazyGetBlocksQuery(displayChapter?.id);

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

  const [blocks, setBlocks] = useState([]);
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

  useEffect(() => {
    getBlocks(displayChapter?.id);
    setChapterIndex(() => {
      const tempChapterIndex = chapters.findIndex(
        (item) => item.id === displayChapter.id
      );
      if (tempChapterIndex >= 0) {
        return tempChapterIndex;
      } else return 0;
    });
  }, [displayChapter]);

  useEffect(() => {
    if (moveDirection === "next") {
      dispatch(setDisplayBlock(blocks[0]));
    } else if (moveDirection === "prev") {
      dispatch(setDisplayBlock(blocks[blocks.length - 1]));
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

  useEffect(() => {
    if (isSuccess) {
      let tempBlocks = data.ids.map((id) => data.entities[id]);
      setBlocks(tempBlocks);

      if (moveDirection === "next") {
        dispatch(setDisplayBlock(tempBlocks[0]));
        setMoveDirection("");
      } else if (moveDirection === "prev") {
        dispatch(setDisplayBlock(tempBlocks[tempBlocks.length - 1]));
        setMoveDirection("");
      }
    }
  }, [data]);

  const firstLesson = blockIndex === 0;
  const firstChapter = chapterIndex === 0;
  const lastLesson = blockIndex === blocks.length - 1;
  const lastChapter = chapterIndex === chapters.length - 1;

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
    <section className={"w-full flex flex-1 justify-between items-center"}>
      <button
        onClick={handlePrevious}
        disabled={firstLesson && firstChapter}
        className="flex items-center text-red-600 hover:text-red-500 disabled:text-slate-600 duration-200"
      >
        <FaChevronLeft size={32} />
        <span className="font-semibold hidden md:inline text-nowrap">
          {firstLesson ? "Previous Chapter" : "Previous Lesson"}
        </span>
      </button>
      {children}
      <button
        onClick={handleNext}
        disabled={lastLesson && lastChapter}
        className="flex items-center text-red-600 hover:text-red-500 disabled:text-slate-600 duration-200"
      >
        <span className="font-semibold hidden md:inline text-nowrap">
          {lastLesson ? "Next Chapter" : "Next Lesson"}
        </span>
        <FaChevronRight size={32} />
      </button>
    </section>
  );
};

export default BlockNavigator;
