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
  handleSelectSentence,
  selected,
  lesson,
  section,
}: {
  sentence: Sentence;
  setEdit: Dispatch<SetStateAction<boolean>>;
  setMove: Dispatch<SetStateAction<boolean>>;
  setEditItem: Dispatch<SetStateAction<Sentence | null>>;
  handleSelectSentence?: (id: string) => void;
  selected?: boolean;
  lesson?: Lesson;
  section?: Section;
  children?: ReactNode;
}) {
  const editMode = useSelector(selectEditMode);

  return (
    <div className="relative group">
      {children}
      {editMode && (
        <div className="absolute top-2 right-2 flex items-center gap-2">
          <input
            type="checkbox"
            checked={selected ?? false}
            onChange={() =>
              handleSelectSentence && handleSelectSentence(sentence.id)
            }
          />
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
      {editMode && (
        <div className="absolute bottom-0 right-2 text-sm">
          <p>
            <span>{lesson?.title}</span>
            <span>{lesson?.subtitle}</span>
          </p>
          <p>{section?.title}</p>
        </div>
      )}
    </div>
  );
}
