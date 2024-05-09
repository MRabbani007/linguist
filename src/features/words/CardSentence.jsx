import React, { useState } from "react";
import { CiEdit, CiSquareRemove } from "react-icons/ci";
import { useSelector } from "react-redux";
import { selectEditMode } from "../globals/globalsSlice";
import CardEditSentence from "./CardEditSentence";

const CardSentence = ({ word, index }) => {
  const editMode = useSelector(selectEditMode);

  const [edit, setEdit] = useState(false);

  return (
    <>
      <div className="group">
        <p>{word?.sentences[index]}</p>
        <p>
          <i>{word?.sentencesTranslation[index] ?? ""}</i>
        </p>
        {editMode && (
          <button className="invisible group-hover:visible">
            <CiEdit
              size={32}
              className="inline"
              onClick={() => setEdit(true)}
            />
          </button>
        )}
      </div>
      {edit ? (
        <CardEditSentence word={word} index={index} setEdit={setEdit} />
      ) : null}
    </>
  );
};

export default CardSentence;
