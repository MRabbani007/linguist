import { useState } from "react";
import { CiEdit, CiTrash } from "react-icons/ci";
import { useDeleteSectionIntroMutation } from "./sectionSlice";
import SectionIntroItemEdit from "./SectionIntroItemEdit";
import { selectEditMode } from "../globals/globalsSlice";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";

export default function SectionIntroItem({ section, intro, index }) {
  const editMode = useSelector(selectEditMode);
  const [edit, setEdit] = useState(false);

  return (
    <>
      <p className="p-4 bg-zinc-200 text-zinc-700 min-w-[300px] font-medium flex-1 text-balance group relative">
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
