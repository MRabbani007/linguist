import { useState } from "react";
import { CiEdit, CiTrash } from "react-icons/ci";
import SectionIntroItemEdit from "./SectionIntroItemEdit";
import { selectEditMode } from "../globals/globalsSlice";
import { useSelector } from "react-redux";

export default function SectionIntroItem({ section, intro, index }) {
  const editMode = useSelector(selectEditMode);
  const [edit, setEdit] = useState(false);

  return (
    <>
      <p className="text-balance group relative">
        {intro}
        {editMode && (
          <button
            onClick={() => setEdit(true)}
            className="invisible group-hover:visible absolute bottom-0 right-0"
          >
            <CiEdit size={25} />
          </button>
        )}
      </p>
      {edit ? (
        <SectionIntroItemEdit
          section={section}
          intro={intro}
          index={index}
          setEdit={setEdit}
        />
      ) : null}
    </>
  );
}
