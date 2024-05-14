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

  const [deleteSectionIntro, { isLoading }] = useDeleteSectionIntroMutation();

  const handleDelete = async () => {
    if (confirm("Delete Intro Item")) {
      await deleteSectionIntro({ id: section.id, index });
      toast.success("Intro item deleted");
    }
  };

  if (edit) {
    return (
      <SectionIntroItemEdit
        section={section}
        intro={intro}
        index={index}
        setEdit={setEdit}
      />
    );
  } else {
    return (
      <p className="flex items-center gap-2 group">
        <span>{intro}</span>
        {editMode && (
          <span className="invisible group-hover:visible w-fit whitespace-nowrap">
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
