import { ReactNode, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  selectChapters,
  selectLessons,
  selectDisplayLesson,
  selectDisplayChapter,
  setDisplayChapter,
  setDisplayLesson,
} from "../globals/globalsSlice";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa6";
import {
  createSearchParams,
  useNavigate,
  useSearchParams,
} from "react-router-dom";

export default function LessonNavigator({
  children,
}: {
  children?: ReactNode;
}) {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const displayChapter = useSelector(selectDisplayChapter);
  const displayLesson = useSelector(selectDisplayLesson);

  const [searchParams, setSearchParams] = useSearchParams();

  const chapters = useSelector(selectChapters);
  const allLessons = useSelector(selectLessons);

  // on page load check if lesson id matches the displayLesson else update the display lesson
  useEffect(() => {
    const id = searchParams.get("id");

    if (id && displayLesson?.id !== id) {
      const lesson = allLessons.find((item) => item?.id === id);

      if (lesson) {
        setSearchParams({ title: lesson?.title, id });
        dispatch(setDisplayLesson(lesson));
      }
    }
  }, []);

  const [lessonIndex, setLessonIndex] = useState(0);
  const [chapterIndex, setChapterIndex] = useState(0);

  const [moveDirection, setMoveDirection] = useState("");

  // chapter lessons
  const [chapterLessons, setChapterLessons] = useState<Lesson[]>([]);

  // filter chapter lessons and update chapter index on change of display chapter
  useEffect(() => {
    setChapterLessons(() => {
      return allLessons
        .filter((item) => item.chapterID === displayChapter?.id)
        .sort((a, b) => (a.sortIndex > b.sortIndex ? 1 : -1));
    });

    setChapterIndex(() => {
      const tempChapterIndex = chapters.findIndex(
        (item) => item.id === displayChapter?.id
      );
      if (tempChapterIndex >= 0) {
        return tempChapterIndex;
      } else return 0;
    });
  }, [displayChapter, chapters]);

  // select new display lesson
  // useEffect waits till new chapter lessons are filtered
  useEffect(() => {
    if (moveDirection === "next") {
      dispatch(setDisplayLesson(chapterLessons[0]));
      setMoveDirection("");
      navigate({
        pathname: "/learn/lesson",
        search: `${createSearchParams({
          title: chapterLessons[0]?.title,
          id: chapterLessons[0]?.id,
        })}`,
      });
    } else if (moveDirection === "prev") {
      dispatch(setDisplayLesson(chapterLessons[chapterLessons.length - 1]));
      setMoveDirection("");
      navigate({
        pathname: "/learn/lesson",
        search: `${createSearchParams({
          title: chapterLessons[chapterLessons.length - 1]?.title,
          id: chapterLessons[chapterLessons.length - 1]?.id,
        })}`,
      });
    }
  }, [chapterLessons]);

  // update lesson index when display lesson is changed
  useEffect(() => {
    setLessonIndex(() => {
      const tempLessonIndex = chapterLessons?.findIndex(
        (item) => item?.id === displayLesson?.id
      );
      if (tempLessonIndex >= 0) {
        return tempLessonIndex;
      } else return 0;
    });
  }, [displayLesson, chapterLessons]);

  const firstLesson = lessonIndex === 0;
  const firstChapter = chapterIndex === 0;
  const lastLesson = lessonIndex === chapterLessons?.length - 1;
  const lastChapter = chapterIndex === chapters?.length - 1;

  const handleNext = () => {
    if (lastLesson) {
      if (lastChapter) {
        return;
      } else {
        // Move to next chapter
        setMoveDirection("next");
        dispatch(setDisplayChapter(chapters[chapterIndex + 1]));

        window.scrollTo(0, 0);
      }
    } else {
      // Move to next lesson
      dispatch(setDisplayLesson(chapterLessons[lessonIndex + 1]));
      // Update Lesson page URL
      navigate({
        pathname: "/learn/lesson",
        search: `${createSearchParams({
          title: chapterLessons[lessonIndex + 1]?.title,
          id: chapterLessons[lessonIndex + 1]?.id,
        })}`,
      });
    }
  };

  const handlePrevious = () => {
    if (firstLesson) {
      if (firstChapter) {
        return;
      } else {
        // Move to Previous Chapter
        setMoveDirection("prev");
        dispatch(setDisplayChapter(chapters[chapterIndex - 1]));
        window.scrollTo(0, 0);
      }
    } else {
      // Move to Previous Lesson
      dispatch(setDisplayLesson(chapterLessons[lessonIndex - 1]));
      window.scrollTo(0, 0);

      navigate({
        pathname: "/learn/lesson",
        search: `${createSearchParams({
          title: chapterLessons[lessonIndex - 1]?.title,
          id: chapterLessons[lessonIndex - 1]?.id,
        })}`,
      });
    }
  };

  return (
    <div className="flex justify-between items-center mx-4 sm:mx-0 mt-4">
      <button
        onClick={handlePrevious}
        disabled={firstLesson && firstChapter}
        className="flex items-center gap-2 text-accent disabled:text-destructive_foreground group duration-200 p-2 md:p-4 bg-white rounded-lg"
      >
        <FaArrowLeft size={25} />
        <span className="font-semibold hidden md:inline text-nowrap">
          {firstLesson ? "Previous Chapter" : "Previous Lesson"}
        </span>
      </button>
      {children}
      <button
        onClick={handleNext}
        disabled={lastLesson && lastChapter}
        className="flex items-center gap-2 text-accent disabled:text-destructive_foreground group duration-200 p-2 md:p-4 bg-white rounded-lg"
      >
        <span className="font-semibold hidden md:inline duration-200 text-nowrap">
          {lastLesson ? "Next Chapter" : "Next Lesson"}
        </span>
        <FaArrowRight size={25} />
      </button>
    </div>
  );
}
