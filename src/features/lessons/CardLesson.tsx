import { useDispatch } from "react-redux";
import { setDisplayChapter, setDisplayLesson } from "../globals/globalsSlice";
import { createSearchParams, useNavigate } from "react-router-dom";
import { AppDispatch } from "@/app/store";

export default function CardLesson({
  lesson,
  chapter,
}: {
  lesson: Lesson;
  chapter: Chapter;
}) {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  const handleOpenLesson = () => {
    dispatch(setDisplayChapter(chapter));
    dispatch(setDisplayLesson(lesson));
    navigate({
      pathname: "/learn/lesson",
      search: `${createSearchParams({ title: lesson?.title, id: lesson?.id })}`,
    });
  };

  return (
    <div
      onClick={handleOpenLesson}
      className="flex gap-4 min-w-[300px] cursor-pointer duration-200 relative group"
    >
      <span className="bg-red-600 shrink-0 w-10 h-10 flex items-center justify-center text-accent_foreground rounded-full text-sm">
        {lesson?.sortIndex}
      </span>
      <div className="flex flex-col">
        <p className="font-semibold text-2xl">{lesson?.title}</p>
        <div className="">
          <p className="">{lesson?.subtitle}</p>
          <p>{lesson?.detail}</p>
        </div>
      </div>
    </div>
  );
}
