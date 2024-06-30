import { useState } from "react";
import { CiEdit, CiTrash } from "react-icons/ci";
import { useRemoveBlockMutation } from "./blockSlice";
import { useDispatch, useSelector } from "react-redux";
import {
  selectEditMode,
  setDisplayBlock,
  setLessons,
} from "../globals/globalsSlice";
import { useNavigate } from "react-router-dom";
import FormLessonEditHeader from "./FormLessonEditHeader";
import { IoMdStar } from "react-icons/io";
import { IoTimerOutline } from "react-icons/io5";

export default function CardLesson({ lesson }) {
  const [removeBlock] = useRemoveBlockMutation();

  const dispatch = useDispatch();
  const editMode = useSelector(selectEditMode);
  const navigate = useNavigate();

  const [edit, setEdit] = useState(false);

  const toggleEdit = () => {
    setEdit(!edit);
  };

  const blockOpen = () => {
    dispatch(setDisplayBlock(lesson));
    navigate("/content/lesson");
  };

  const handleDelete = async () => {
    try {
      if (confirm("Delete this block?")) {
        await removeBlock(lesson?.id).unwrap();
      }
    } catch (err) {
      console.error("Failed to delete the chapter", err);
    }
  };

  const level =
    lesson?.level === "beginner"
      ? "text-white"
      : lesson?.level === "intermediate"
      ? "text-yellow-400"
      : "text-red-500";

  return (
    <>
      <div
        onClick={blockOpen}
        className="flex flex-col items-center justify-start min-w-[200px] h-[150px] bg-gradient-to-b from-sky-900 to-sky-600 text-white flex-1 text-center text-xl hover:shadow-lg hover:shadow-zinc-400 hover:scale-105 cursor-pointer duration-200 relative "
      >
        {/* <span className="whitespace-nowrap">{`Lesson ${lesson?.lessonNo}: `}</span> */}
        <p className="p-4 font-semibold">{lesson?.title}</p>
        <p className="">{lesson?.subtitle}</p>
        <p className=" absolute bottom-2 left-1/2 -translate-x-1/2 flex items-center gap-2">
          <IoTimerOutline size={25} className="inline" />
          <span>{lesson?.learningTime}</span>
        </p>
        {/* <p>{lesson?.detail}</p> */}
        {/* <div className="card__footer">
          <span>{lesson?.learningTime}</span>
        </div> */}
      </div>
    </>
  );
}
