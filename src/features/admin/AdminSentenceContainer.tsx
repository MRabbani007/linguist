import { Dispatch, ReactNode, SetStateAction, useState } from "react";
import { CiEdit } from "react-icons/ci";
import { useSelector } from "react-redux";
import { selectEditMode } from "./adminSlice";
import { IoOpenOutline } from "react-icons/io5";
import { motion } from "framer-motion";

export default function AdminSentenceContainer({
  sentence,
  sortIndex,
  setEdit,
  setMove,
  setEditItem,
  handleSelectSentence,
  selected,
  lesson,
  section,
  isDraggable = false,
  onDragStart,
  onDragEnter,
  onDragEnd,
  children,
}: {
  sentence: Sentence;
  sortIndex?: number;
  setEdit: Dispatch<SetStateAction<boolean>>;
  setMove: Dispatch<SetStateAction<boolean>>;
  setEditItem: Dispatch<SetStateAction<Sentence | null>>;
  handleSelectSentence?: (id: string) => void;
  selected?: boolean;
  lesson?: Lesson;
  section?: Section;
  isDraggable?: boolean;
  onDragStart?: (params: any) => void;
  onDragEnter?: (params: any) => void;
  onDragEnd?: (params?: any) => void;
  children?: ReactNode;
}) {
  const editMode = useSelector(selectEditMode);

  const [isDragging, setIsDragging] = useState(false);
  const [isOver, setIsOver] = useState(false);

  const handleDragStart = () => {
    setIsDragging(true);
    onDragStart && onDragStart(sentence);
  };
  const handleDragEnter = () => {
    onDragEnter && onDragEnter(sentence);
    setIsOver(true);
  };
  const handleDragLeave = () => {
    setIsOver(false);
  };
  const handleDragEnd = () => {
    onDragEnd && onDragEnd();
    setIsDragging(false);
    setIsOver(false);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 20 }}
      transition={{ duration: 0.4 }}
      draggable={isDraggable}
      onDragStart={handleDragStart}
      onDragOver={handleDragEnter}
      onDragLeave={handleDragLeave}
      onDragEnd={handleDragEnd}
      className="relative group"
      style={{
        opacity: isDragging ? 0.5 : 1,
        borderWidth: isOver ? "2px" : "0px",
        borderColor: isOver ? "grey" : "",
        cursor: isDraggable ? "move" : "default",
      }}
    >
      {editMode && (
        <div className="absolute bottom-full right-0 z-10 invisible opacity-0 group-hover:visible group-hover:opacity-100 duration-100 flex items-center gap-2 w-fit ml-auto py-1 px-4 bg-zinc-100 ">
          <span>{sortIndex}</span>
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
      {children}
      {editMode && (
        <div className="absolute bottom-0 right-2 invisible opacity-0 group-hover:visible group-hover:opacity-100 duration-100 text-sm  w-fit ml-auto py-1 px-4 bg-zinc-100">
          <p>{lesson?.title}</p>
          <p>{lesson?.subtitle}</p>
          <p>{section?.title}</p>
        </div>
      )}
    </motion.div>
  );
}
