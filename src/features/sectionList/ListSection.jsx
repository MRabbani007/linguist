import { useState } from "react";
import { useSelector } from "react-redux";
import { selectEditMode } from "../globals/globalsSlice";
import ListItemAdd from "./ListItemAdd";
import ListItemEdit from "./ListItemEdit";
import { CiEdit } from "react-icons/ci";
import FormListEdit from "./FormListEdit";
import { BiPlus } from "react-icons/bi";

export default function ListSection({ list }) {
  const editMode = useSelector(selectEditMode);

  const [edit, setEdit] = useState(false);

  const [addItem, setAddItem] = useState(false);
  const [editItem, setEditItem] = useState(null);

  let content = list.items.map((item, index) => {
    return (
      <li key={index} className="group">
        <span>{item}</span>
        {editMode && (
          <button
            className="invisible group-hover:visible"
            onClick={() => setEditItem(index)}
          >
            <CiEdit size={28} className="inline" />
          </button>
        )}
      </li>
    );
  });

  return (
    <>
      <article className="flex flex-col gap-4">
        {/* title */}
        <div className="relative flex items-center">
          {list?.title ? (
            <p>
              <strong className="text-xl font-light">{list?.title}</strong>
            </p>
          ) : editMode ? (
            <p>
              <strong>Title</strong>
            </p>
          ) : null}

          {editMode && (
            <>
              <button title="Edit List" onClick={() => setEdit(true)}>
                <CiEdit size={24} />
              </button>
              <button title="Add Item" onClick={() => setAddItem(true)}>
                <BiPlus size={24} />
              </button>
            </>
          )}
        </div>

        {list?.text ? <p className="">{list?.text}</p> : null}

        {list?.type === "OL" ? (
          <ol className="list-decimal list-inside space-y-1">{content}</ol>
        ) : (
          <ul className="list-disc list-inside space-y-1">{content}</ul>
        )}

        {list?.notes ? <p className="">{list.notes}</p> : null}
      </article>
      {edit && <FormListEdit list={list} setEdit={setEdit} />}
      {addItem ? <ListItemAdd list={list} setAdd={setAddItem} /> : null}
      {editItem !== null && editItem !== false ? (
        <ListItemEdit list={list} editItem={editItem} setEdit={setEditItem} />
      ) : null}
    </>
  );
}
