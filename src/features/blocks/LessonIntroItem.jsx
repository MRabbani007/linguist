import { useState } from "react";
import { CiEdit, CiTrash } from "react-icons/ci";
import LessonIntroItemEdit from "./LessonIntroItemEdit";
import { useDeleteBlockIntroMutation } from "./blockSlice";
import { useSelector } from "react-redux";
import { selectEditMode } from "../globals/globalsSlice";

export default function LessonIntroItem({ lesson, intro, index }) {
  const editMode = useSelector(selectEditMode);
  const [edit, setEdit] = useState(false);

  return (
    <>
      <p className="group relative bg-zinc-500 text-white p-4 min-w-[300px] flex-1">
        <span className="text-wrap">{intro}</span>
        {editMode && (
          <button
            onClick={() => setEdit(true)}
            className="invisible group-hover:visible absolute top-0 right-0"
          >
            <CiEdit size={34} />
          </button>
        )}
      </p>
      {edit ? (
        <LessonIntroItemEdit
          lesson={lesson}
          intro={intro}
          index={index}
          setEdit={setEdit}
        />
      ) : null}
    </>
  );
}
