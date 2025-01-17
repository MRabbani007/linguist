import { Dispatch, ReactNode, SetStateAction } from "react";
import { CiEdit } from "react-icons/ci";

export default function AdminSentenceContainer({
  sentence,
  setEdit,
  setEditItem,
  children,
}: {
  sentence: Sentence;
  setEdit: Dispatch<SetStateAction<boolean>>;
  setEditItem: Dispatch<SetStateAction<Sentence | null>>;
  children?: ReactNode;
}) {
  return (
    <div className="relative group">
      {children}
      <button
        className="absolute top-1 right-1 bg-zinc-50 p-1 rounded-md"
        onClick={() => {
          setEdit(true);
          setEditItem(sentence);
        }}
      >
        <CiEdit size={20} />
      </button>
    </div>
  );
}
