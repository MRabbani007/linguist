import { useDispatch } from "react-redux";
import { setDisplayBlock } from "../globals/globalsSlice";
import { useNavigate } from "react-router-dom";
import { IoTimerOutline } from "react-icons/io5";

export default function CardLesson({ lesson }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const blockOpen = () => {
    dispatch(setDisplayBlock(lesson));
    navigate("/content/lesson");
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
      className="flex flex-col items-center justify-center min-w-[300px] md:min-w-[400px] min-h-[150px] bg-gradient-to-b from-sky-900 to-sky-600 text-white flex-1 text-center text-xl hover:shadow-lg hover:shadow-zinc-400 cursor-pointer duration-200 relative group"
    >
      {/* <span className="whitespace-nowrap">{`Lesson ${lesson?.lessonNo}: `}</span> */}
      <p className="font-semibold">{lesson?.title}</p>
      <p className="">{lesson?.subtitle}</p>
      <p className=" absolute bottom-2 left-1/2 -translate-x-1/2 flex items-center gap-2 invisible opacity-0  translate-y-2 group-hover:visible group-hover:opacity-100  group-hover:translate-y-0 duration-200 ">
        <IoTimerOutline size={25} className="inline" />
        <span>{lesson?.learningTime}</span>
      </p>
      {/* <p>{lesson?.detail}</p> */}
      {/* <div className="card__footer">
          <span>{lesson?.learningTime}</span>
        </div> */}
    </div>
  );
}
