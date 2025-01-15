import { useState } from "react";
import { CiEdit } from "react-icons/ci";
import FormEditTextBlock from "./FormEditTextBlock";
import { useSelector } from "react-redux";
import { selectEditMode } from "../admin/adminSlice";
import { BsDot } from "react-icons/bs";

export default function CardTextBlock({ textBlock }: { textBlock: TextBlock }) {
  const [edit, setEdit] = useState(false);
  const editMode = useSelector(selectEditMode);

  return (
    <>
      <div className="relative group">
        <p className="text-balance group relative">{textBlock.title}</p>
        <p>
          {textBlock?.displayType === "bullet_point" && (
            <BsDot size={30} className="mr-1 inline" />
          )}
          <span className="font-medium">{textBlock?.label}</span>
          <span>{textBlock?.text}</span>
        </p>
        {editMode && (
          <button
            onClick={() => setEdit(true)}
            className="absolute top-1 right-1 invisible group-hover:visible"
          >
            <CiEdit size={20} />
          </button>
        )}
      </div>
      {editMode && edit && (
        <FormEditTextBlock textBlock={textBlock} setEdit={setEdit} />
      )}
    </>
  );
}
