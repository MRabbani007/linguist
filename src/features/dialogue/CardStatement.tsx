import React, { useEffect, useState } from "react";
import { Dialogue, DialogueStatement } from "../../types/types";
import { useSelector } from "react-redux";
import { selectEditMode } from "../globals/globalsSlice";
import { CiEdit } from "react-icons/ci";
import FormDialogueStatement from "./FormDialogueStatement";

interface Props {
  dialogue: Dialogue;
  statement: DialogueStatement;
}

const PERSON = {
  1: "bg-green-500/70",
  2: "bg-yellow-500/70",
};

export default function CardStatement({ statement, dialogue }: Props) {
  const editMode = useSelector(selectEditMode);
  const [edit, setEdit] = useState(false);
  const [showTr, setShowTr] = useState(false);

  useEffect(()=>{
    if(editMode){
      setShowTr(true)
    }
  },[editMode])

  return (
    <div className={"flex items-stretch justify-start gap-4 text-xl "}>
      <button
        className={
          "w-10 h-10 rounded-full flex items-center justify-center " +
          PERSON[statement?.person]
        }
        onClick={() => setShowTr((curr) => !curr)}
      >
        {editMode && statement.sortIndex}
      </button>
      <div className={" grid-cols-1 grid gap-0 flex-1 "}>
        <span className="">{statement?.text}</span>
        <span
          className={
            (showTr ? "" : "invisible opacity-0 h-0 pointer-events-none") +
            "  text-sm ml-8 duration-200"
          }
        >
          {statement?.translation}
        </span>
      </div>
      {editMode ? (
        <button onClick={() => setEdit(true)}>
          <CiEdit size={24} />
        </button>
      ) : null}
      {edit ? (
        <FormDialogueStatement
          type="edit"
          statement={statement}
          dialogue={dialogue}
          setShowForm={setEdit}
        />
      ) : null}
    </div>
  );
}
