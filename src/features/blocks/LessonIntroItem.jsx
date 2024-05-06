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
      <p className="flex items-center gap-2 group relative w-fit">
        <span className="">{intro}</span>
        {editMode && (
          <span className="invisble group-hover:visible w-fit whitespace-nowrap absolute -top-2 -right-7">
            <button onClick={() => setEdit(true)}>
              <CiEdit size={34} />
            </button>
          </span>
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
