import React from "react";
import { CiEdit } from "react-icons/ci";
import { useSelector } from "react-redux";
import { selectEditMode } from "../globals/globalsSlice";

const SectionHeader = ({ section, setEditSectionHeader }) => {
  const editMode = useSelector(selectEditMode);

  return (
    <h2 className="text-center flex-1 relative group">
      <p className="font-bold">
        {"Lesson " + section?.lessonNo + ": " + section?.title}
      </p>
      <p>{section?.subtitle}</p>
      {editMode && (
        <button
          onClick={() => setEditSectionHeader((curr) => !curr)}
          className="absolute right-3 top-1 invisible group-hover:visible"
        >
          <CiEdit size={34} />
        </button>
      )}
    </h2>
  );
};

export default SectionHeader;
