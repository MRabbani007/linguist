import { useState } from "react";
import { CiEdit, CiTrash } from "react-icons/ci";
import LessonIntroItemEdit from "./LessonIntroItemEdit";
import { useDeleteBlockIntroMutation } from "./blockSlice";
import { useSelector } from "react-redux";
import { selectEditMode } from "../globals/globalsSlice";

export default function LessonIntroItem({ lesson, intro, index }) {
  const editMode = useSelector(selectEditMode);
  const [edit, setEdit] = useState(false);

  const [deleteLessonIntro, { isLoading }] = useDeleteBlockIntroMutation();

  const handleDelete = () => {
    if (confirm("Delete Intro Item")) {
      deleteLessonIntro({ id: lesson.id, index });
    }
  };

  if (edit) {
    return (
      <LessonIntroItemEdit
        lesson={lesson}
        intro={intro}
        index={index}
        setEdit={setEdit}
      />
    );
  } else {
    return (
      <p className="flex gap-2 group">
        <span className="">{intro}</span>
        {editMode && (
          <span className="invisble group-hover:visible w-fit whitespace-nowrap">
            <button onClick={() => setEdit(true)}>
              <CiEdit size={34} />
            </button>
            <button onClick={handleDelete}>
              <CiTrash size={34} />
            </button>
          </span>
        )}
      </p>
    );
  }
}
