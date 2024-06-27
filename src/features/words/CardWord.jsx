import React, { useState } from "react";
import FormWordEdit from "./FormWordEdit";
import { FiEdit2 } from "react-icons/fi";
import { useSelector } from "react-redux";
import { selectEditMode } from "../globals/globalsSlice";

export default function CardWord({ word }) {
  const editMode = useSelector(selectEditMode);
  const [viewEditWord, setViewEditWord] = useState(false);

  return (
    <>
      <div className="text-center min-w-[150px] max-w-[250px] flex-1">
        <p className="py-2 px-4 bg-zinc-200 font-semibold text-red-700 relative group">
          <span>{word?.type}</span>
          <span className="mx-2">{word?.first}</span>
          {word?.gender ? (
            <span>
              <i>{`(${word.gender})`}</i>
            </span>
          ) : null}
          <span>
            <i>{word?.firstCaption}</i>
          </span>
          {editMode ? (
            <button onClick={() => setViewEditWord(true)}>
              <FiEdit2
                size={20}
                className="inline absolute top-1 right-1 invisible group-hover:visible"
              />
            </button>
          ) : null}
        </p>
        <p className="py-2 px-4 bg-zinc-100 font-medium text-zinc-800">
          <span>{word?.second}</span>
          <span>
            <i>{word?.secondCaption}</i>
          </span>
        </p>
      </div>
      {viewEditWord ? (
        <FormWordEdit word={word} setViewEdit={setViewEditWord} />
      ) : null}
    </>
  );
}
