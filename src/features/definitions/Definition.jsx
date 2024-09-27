import React, { useState } from "react";
import { useRemoveDefinitionMutation } from "./definitionsSlice";
import { CiEdit, CiTrash } from "react-icons/ci";
import DefinitionEdit from "./DefinitionEdit";
import { BsBoxArrowUpRight } from "react-icons/bs";
import { useSelector } from "react-redux";
import { selectEditMode } from "../globals/globalsSlice";
import { HiOutlineLightBulb } from "react-icons/hi2";

export default function Definition({ definition }) {
  const editMode = useSelector(selectEditMode);

  const [edit, setEdit] = useState(false);

  return (
    <article className="w-fit min-w-[300px] max-w-[400px] flex flex-col">
      <div className="group flex items-center gap-4 px-4 py-2 text-red-700 border-2 border-red-700 bg-zinc-200 rounded-3xl">
        <HiOutlineLightBulb size={30} className="" />
        <p className="text-lg font-medium">
          <span>{definition?.title}</span>
        </p>
        {editMode && (
          <p className="invisible group-hover:visible flex items-center gap-3">
            <button onClick={() => setEdit(true)}>
              <CiEdit size={32} />
            </button>
          </p>
        )}
      </div>
      <div className="flex-1 text-sm text-pretty p-4 mx-6 bg-zinc-100 border-2 border-t-0 rounded-b-2xl border-red-700">
        <p>{definition?.text}</p>
        <p>{definition?.notes}</p>
        <p>{definition?.caption}</p>
      </div>
      {edit ? (
        <DefinitionEdit definition={definition} setEdit={setEdit} />
      ) : null}
    </article>
  );
}
