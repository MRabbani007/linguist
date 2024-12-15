import { useDispatch } from "react-redux";
import { setDisplayBlock } from "../globals/globalsSlice";
import { createSearchParams, useNavigate } from "react-router-dom";

export default function CardLesson({ lesson }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const blockOpen = () => {
    dispatch(setDisplayBlock(lesson));
    navigate({
      pathname: "/learn/lesson",
      search: `${createSearchParams({ title: lesson?.title, id: lesson?.id })}`,
    });
  };

  const level =
    lesson?.level === "beginner"
      ? "text-white"
      : lesson?.level === "intermediate"
      ? "text-yellow-400"
      : "text-red-500";

  return (
    <div
      onClick={blockOpen}
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
        {/* <p className="flex items-center gap-2">
          <IoTimerOutline size={22} className="inline" />
          <span>{lesson?.learningTime}</span>
        </p> */}
      </div>
    </div>
  );
}
