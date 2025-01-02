import { Dispatch, ReactNode, SetStateAction } from "react";
import { CiEdit } from "react-icons/ci";

export default function AdminContainerWord({
  children,
  word,
  setEdit,
  setEditItem,
}: {
  children: ReactNode;
  word: Word;
  setEdit: Dispatch<SetStateAction<boolean>>;
  setEditItem: Dispatch<SetStateAction<Word | null>>;
}) {
  return (
    <div className="relative group">
      <button
        onClick={() => {
          setEdit(true);
          setEditItem(word);
        }}
        className="absolute top-2 right-2 z-20 invisible group-hover:visible"
      >
        <CiEdit size={20} />
      </button>
      {children}
    </div>
  );
}
