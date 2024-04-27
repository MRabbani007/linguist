import React from "react";
import { CiEdit } from "react-icons/ci";
import { selectEditMode } from "../globals/globalsSlice";
import { useSelector } from "react-redux";

export default function SectionTitle({ section, setEdit }) {
  const editMode = useSelector(selectEditMode);

  return (
    <div className="flex items-center gap-2 group">
      <div>
        <h3 className="font-bold text-xl">{section?.title}</h3>
        {section?.subtitle && (
          <p>
            <i>{section?.subtitle}</i>
          </p>
        )}
      </div>
      {editMode && (
        <button
          onClick={() => setEdit(true)}
          className="invisible group-hover:visible"
        >
          <CiEdit size={34} />
        </button>
      )}
    </div>
  );
}
