import { Dispatch, ReactNode, SetStateAction } from "react";
import { CiEdit } from "react-icons/ci";
import { MdArrowOutward } from "react-icons/md";

export default function AdminContainerWord({
  children,
  word,
  setEdit,
  setMove,
  setEditItem,
}: {
  children: ReactNode;
  word: Word;
  setMove: Dispatch<SetStateAction<boolean>>;
  setEdit: Dispatch<SetStateAction<boolean>>;
  setEditItem: Dispatch<SetStateAction<Word | null>>;
}) {
  return (
    <div className="relative group">
      <div className="absolute top-2 right-2 z-20 invisible group-hover:visible flex flex-col gap-1">
        <button
          onClick={() => {
            setEdit(true);
            setEditItem(word);
          }}
        >
          <CiEdit size={20} />
        </button>
        <button
          onClick={() => {
            setMove(true);
            setEditItem(word);
          }}
        >
          <MdArrowOutward size={20} />
        </button>
      </div>
      {children}
    </div>
  );
}
