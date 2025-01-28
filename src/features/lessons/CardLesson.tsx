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
      className="flex cursor-pointer relative group gap-2 p-2 bg-zinc-100 hover:bg-white shadow-md shadow-zinc-300 rounded-lg duration-200"
    >
      <span className="bg-red-600 shrink-0 w-8 h-8 flex items-center justify-center text-accent_foreground rounded-full text-sm">
        {lesson?.sortIndex}
      </span>
      <div className="flex-1 flex flex-col">
        <p className="font-semibold text-lg md:text-xl">{lesson?.title}</p>
        <div className="">
          <p className="text-sm">{lesson?.subtitle}</p>
          <p className="text-xs">{lesson?.detail}</p>
        </div>
      </div>
    </div>
  );
}
