import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  selectChapters,
  selectLessons,
  selectDisplayBlock,
  selectDisplayChapter,
  setDisplayBlock,
  setDisplayChapter,
} from "../globals/globalsSlice";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa6";
import {
  createSearchParams,
  useNavigate,
  useSearchParams,
} from "react-router-dom";

export default function BlockNavigator({ children }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const displayChapter = useSelector(selectDisplayChapter);
  const displayBlock = useSelector(selectDisplayBlock);

  const [searchParams, setSearchParams] = useSearchParams();

  const chapters = useSelector(selectChapters);
  const lessons = useSelector(selectLessons);

  useEffect(() => {
    const id = searchParams.get("id");
    if (displayBlock?.id !== id) {
      const lesson = lessons.find((item) => item?.id === id);
      if (lesson) {
        setSearchParams({ title: lesson?.title, id });
        dispatch(setDisplayBlock(lesson));
      }
    }
  }, []);

  const [blockIndex, setBlockIndex] = useState(0);
  const [chapterIndex, setChapterIndex] = useState(0);
  const [moveDirection, setMoveDirection] = useState("");

  const [blocks, setBlocks] = useState([]);

  useEffect(() => {
    setBlocks(() => {
      return lessons
        .filter((item) => item.chapterID === displayChapter?.id)
        .sort((a, b) => (a.sortIndex > b.sortIndex ? 1 : -1));
    });
    setChapterIndex(() => {
      const tempChapterIndex = chapters.findIndex(
        (item) => item.id === displayChapter.id
      );
      if (tempChapterIndex >= 0) {
        return tempChapterIndex;
      } else return 0;
    });
  }, [displayChapter, chapters, lessons]);

  useEffect(() => {
    if (moveDirection === "next") {
      dispatch(setDisplayBlock(blocks[0]));
      setMoveDirection("");
      navigate({
        pathname: "/learn/lesson",
        search: `${createSearchParams({
          title: blocks[0]?.title,
          id: blocks[0]?.id,
        })}`,
      });
    } else if (moveDirection === "prev") {
      dispatch(setDisplayBlock(blocks[blocks.length - 1]));
      setMoveDirection("");
      navigate({
        pathname: "/learn/lesson",
        search: `${createSearchParams({
          title: blocks[blocks.length - 1]?.title,
          id: blocks[blocks.length - 1]?.id,
        })}`,
      });
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
  }, [displayBlock, blocks, lessons]);

  const firstLesson = blockIndex === 0;
  const firstChapter = chapterIndex === 0;
  const lastLesson = blockIndex === blocks?.length - 1;
  const lastChapter = chapterIndex === chapters?.length - 1;

  const handleNext = () => {
    if (blockIndex < blocks.length - 1) {
      // setMoveDirection("next");
      // setBlockIndex((curr) => curr + 1);

      dispatch(setDisplayBlock(blocks[blockIndex + 1]));
      window.scrollTo(0, 0);

      navigate({
        pathname: "/learn/lesson",
        search: `${createSearchParams({
          title: blocks[blockIndex + 1]?.title,
          id: blocks[blockIndex + 1]?.id,
        })}`,
      });
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

      navigate({
        pathname: "/learn/lesson",
        search: `${createSearchParams({
          title: blocks[blockIndex - 1]?.title,
          id: blocks[blockIndex - 1]?.id,
        })}`,
      });
    } else {
      if (chapterIndex > 0) {
        setMoveDirection("prev");
        dispatch(setDisplayChapter(chapters[chapterIndex - 1]));
        window.scrollTo(0, 0);
      }
    }
  };

  return (
    <div className="p-2 md:p-4 flex justify-between items-center ">
      <button
        onClick={handlePrevious}
        disabled={firstLesson && firstChapter}
        className="flex items-center gap-2 text-accent disabled:text-destructive_foreground group duration-200"
      >
        <FaArrowLeft size={24} />
        <span className="font-semibold hidden md:inline text-nowrap">
          {firstLesson ? "Previous Chapter" : "Previous Lesson"}
        </span>
      </button>
      {/* {children} */}
      <button
        onClick={handleNext}
        disabled={lastLesson && lastChapter}
        className="flex items-center gap-2 text-accent disabled:text-destructive_foreground group duration-200"
      >
        <span className="font-semibold hidden md:inline duration-200 text-nowrap">
          {lastLesson ? "Next Chapter" : "Next Lesson"}
        </span>
        <FaArrowRight size={24} />
      </button>
    </div>
  );
}
