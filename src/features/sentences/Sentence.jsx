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

  const color = !!sentence?.level
    ? sentence.level < 2
      ? "bg-green-500"
      : sentence.level < 7
      ? "bg-yellow-500"
      : "bg-red-500"
    : "bg-zinc-300";

  return (
    <>
      <div className="w-full shadow-md shadow-green-600 rounded-md relative group flex items-stretch">
        <div
          className={"min-w-4 min-h-full shrink-0 rounded-l-md " + color}
        ></div>
        <div className="flex-1 p-4">
          {sentence?.baseWord || sentence?.baseWordTranslation ? (
            <p>
              <span className="font-semibold">{sentence?.baseWord}</span>
              {sentence?.baseWordTranslation ? (
                <span>
                  <i>{"- " + sentence?.baseWordTranslation}</i>
                </span>
              ) : null}
            </p>
          ) : null}
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
      </div>
      {editContent && (
        <FormSentenceEditContent sentence={sentence} setEdit={setEditContent} />
      )}
    </>
  );
}
