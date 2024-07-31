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
    <article className="bg-accent_foreground w-full border-l-[12px] border-accent">
      <div className="group flex items-center gap-4 px-4 py-2 border-b-[1px] border-accent">
        <p className="text-lg font-medium">
          <span>Definition: </span>
          <span>{definition?.title}</span>
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
        <div className="text-sm p-4">
          <p>{definition?.text}</p>
          <p>{definition?.notes}</p>
          <p>{definition?.caption}</p>
        </div>
      )}
    </article>
  );
}
