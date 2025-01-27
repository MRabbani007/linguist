import { Dispatch, ReactNode, SetStateAction } from "react";
import { CiEdit } from "react-icons/ci";
import { useSelector } from "react-redux";
import { selectEditMode } from "./adminSlice";
import { IoOpenOutline } from "react-icons/io5";

export default function AdminSentenceContainer({
  sentence,
  setEdit,
  setMove,
  setEditItem,
  children,
}: {
  sentence: Sentence;
  setEdit: Dispatch<SetStateAction<boolean>>;
  setMove: Dispatch<SetStateAction<boolean>>;
  setEditItem: Dispatch<SetStateAction<Sentence | null>>;
  children?: ReactNode;
}) {
  const editMode = useSelector(selectEditMode);

  return (
    <div className="relative group">
      {children}
      {editMode && (
        <div className="absolute top-2 right-2 space-x-2">
          <button
            title="Move"
            className=" bg-zinc-50 p-1 rounded-md"
            onClick={() => {
              setMove(true);
              setEditItem(sentence);
            }}
          >
            <IoOpenOutline size={20} />
          </button>
          <button
            title="Edit"
            className=" bg-zinc-50 p-1 rounded-md"
            onClick={() => {
              setEdit(true);
              setEditItem(sentence);
            }}
          >
            <CiEdit size={20} />
          </button>
        </div>
      )}
    </div>
  );
}
