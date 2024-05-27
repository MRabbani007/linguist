import React, { useState } from "react";
import { useRemoveDefinitionMutation } from "./definitionsSlice";
import { CiEdit, CiTrash } from "react-icons/ci";
import DefinitionEdit from "./DefinitionEdit";
import { BsBoxArrowUpRight } from "react-icons/bs";
import DefinitionMove from "./DefinitionMove";
import { useSelector } from "react-redux";
import { selectEditMode } from "../globals/globalsSlice";

export default function Definition({ definition }) {
  const editMode = useSelector(selectEditMode);
  const [removeDefinition, { isLoading }] = useRemoveDefinitionMutation();

  const [edit, setEdit] = useState(false);
  const [move, setMove] = useState(false);

  const handleDelete = async () => {
    if (confirm("Delete this item?")) {
      await removeDefinition(definition?.id);
      alert("Item Deleted");
    }
  };

  return (
    <article className="bg-neutral-200 rounded-xl shadow-sm shadow-red-500">
      <div className="group px-3 bg-red-500/50 text-zinc-800 rounded-t-md flex items-center gap-3">
        <p className="py-2">
          <strong>Definition: </strong>
          <em>{definition?.title}</em>
        </p>
        {editMode && (
          <p className="invisible group-hover:visible flex items-center gap-3">
            <button onClick={() => setEdit(true)}>
              <CiEdit size={32} />
            </button>
            <button onClick={() => setMove(true)}>
              <BsBoxArrowUpRight size={24} />
            </button>
            <button onClick={handleDelete}>
              <CiTrash size={32} />
            </button>
          </p>
        )}
      </div>
      {edit ? (
        <DefinitionEdit definition={definition} setEdit={setEdit} />
      ) : move ? (
        <DefinitionMove definition={definition} setMove={setMove} />
      ) : (
        <div className="py-2 px-3">
          <p>{definition?.text}</p>
          <p>{definition?.notes}</p>
          <p>{definition?.caption}</p>
        </div>
      )}
    </article>
  );
}
