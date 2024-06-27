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
      <div className="group flex flex-1 w-full flex-col gap-2 bg-zinc-300 h-full">
        {/* Header */}
        <div
          className="flex items-center justify-start bg-sky-800 text-yellow-100 hover:text-yellow-400 duration-200 py-2 px-4 cursor-pointer gap-2"
          onClick={blockOpen}
        >
          <IoMdStar size={25} className={level} title={lesson?.level} />
          <p>
            <span className="whitespace-nowrap">{`Lesson ${lesson?.lessonNo}: `}</span>
            <span className="font-medium">{lesson?.title}</span>
          </p>
        </div>
        {/* Body */}
        <div className="flex-1 flex flex-col justify-between gap-2 relative py-2 px-4">
          <span>{lesson?.subtitle}</span>
          <span>{lesson?.detail}</span>
          {editMode && (
            <span className="absolute bottom-2 right-2">
              <CiEdit
                className="icon invisible group-hover:visible "
                onClick={toggleEdit}
              />
              <CiTrash
                className="icon invisible group-hover:visible "
                onClick={handleDelete}
              />
            </span>
          )}
        </div>
        <div className="card__footer">
          <span>{lesson?.firstLang + " / " + lesson?.secondLang}</span>
          <span>{lesson?.learningTime}</span>
        </div>
      </div>
      {edit ? <FormLessonEditHeader lesson={lesson} setEdit={setEdit} /> : null}
    </>
  );
}
