import React, { useState } from "react";
import { useSelector } from "react-redux";
import { selectEditMode } from "../globals/globalsSlice";
import { CiEdit } from "react-icons/ci";
import FormSentenceEditContent from "./FormSentenceEditContent";

export default function Sentence({ sentence }) {
  const editMode = useSelector(selectEditMode);
  const [editContent, setEditContent] = useState(false);
  const [editDetails, setEditDetails] = useState(false);
  const [editLessonID, setEditLessonID] = useState(false);

  return (
    <>
      <div className="w-full p-4 shadow-md shadow-green-600 rounded-md relative group">
        <p className="w-fit font-medium" title={sentence?.pronunce}>
          {sentence?.text}
        </p>
        {sentence?.translation ? (
          <p>
            <i>{sentence?.translation}</i>
          </p>
        ) : null}
        {editMode ? (
          <button
            className="absolute top-2 right-2 invisible group-hover:visible"
            onClick={() => setEditContent(true)}
            title="Edit"
          >
            <CiEdit size={28} />
          </button>
        ) : null}
      </div>
      {editContent && (
        <FormSentenceEditContent sentence={sentence} setEdit={setEditContent} />
      )}
    </>
  );
}
