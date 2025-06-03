import ToolTip from "@/components/ToolTip";
import { Dispatch, SetStateAction, useState } from "react";
import { CiEdit } from "react-icons/ci";
import { MdArrowOutward } from "react-icons/md";

export default function AdminWordRow({
  word,
  index,
  isDraggable = false,
  handleDrag,
  setEdit,
  setMove,
  setEditItem,
}: {
  word: Word;
  index: number;
  isDraggable?: boolean;
  handleDrag?: (stage: "start" | "enter" | "end", item: Word | null) => void;
  setMove: Dispatch<SetStateAction<boolean>>;
  setEdit: Dispatch<SetStateAction<boolean>>;
  setEditItem: Dispatch<SetStateAction<Word | null>>;
}) {
  const [isDragging, setIsDragging] = useState(false);
  const [isOver, setIsOver] = useState(false);

  const handleDragStart = () => {
    setIsDragging(true);
    handleDrag && handleDrag("start", word);
  };
  const handleDragEnter = () => {
    handleDrag && handleDrag("enter", word);
    setIsOver(true);
  };
  const handleDragLeave = () => {
    setIsOver(false);
  };
  const handleDragEnd = () => {
    handleDrag && handleDrag("end", null);
    setIsDragging(false);
    setIsOver(false);
  };

  return (
    <div
      draggable={isDraggable}
      onDragStart={handleDragStart}
      onDragOver={handleDragEnter}
      onDragLeave={handleDragLeave}
      onDragEnd={handleDragEnd}
      style={{
        opacity: isDragging ? 0.5 : 1,
        borderWidth: isOver ? "2px" : "0px",
        borderColor: isOver ? "grey" : "",
        cursor: isDraggable ? "move" : "default",
      }}
      className="flex items-center w-full hover:bg-zinc-100/50 border-b-[1px] border-zinc-200 last:border-b-0 group"
    >
      <div className="min-w-[5%] py-2 px-2 md:px-4 text-center">{index}</div>
      <div className="flex-1 flex flex-col border-b-[1px] border-zinc-200 pb-1">
        <div className="flex items-start">
          <div className="flex-1 flex items-center font-medium text-lg text-zinc-950 py-2">
            <ToolTip text={word?.third}>
              <span className="text-sky-700 w-fit">{word.first}</span>
            </ToolTip>
            <span className="italic text-xs ml-1">{word.firstCaption}</span>
          </div>
          <div className="flex-1 py-2 pr-2 text-base">
            <span className="text-green-700">{word.second}</span>
            <span className="italic text-xs ml-1">{word.secondCaption}</span>
          </div>
        </div>
        <div className="text-zinc-800 flex items-center gap-2">
          <p className="text-sm font-medium italic">{word?.form}</p>
          <p className="text-sm">{word?.note}</p>
        </div>
      </div>
      <div className="flex items-center gap-1 invisible opacity-0 group-hover:visible group-hover:opacity-100 duration-200">
        <button
          onClick={() => {
            setEdit(true);
            setEditItem(word);
          }}
          className="p-1 bg-zinc-50 hover:bg-zinc-200 rounded-md"
        >
          <CiEdit size={20} />
        </button>
        <button
          onClick={() => {
            setMove(true);
            setEditItem(word);
          }}
          className="p-1 bg-zinc-50 hover:bg-zinc-200 rounded-md"
        >
          <MdArrowOutward size={20} />
        </button>
      </div>
    </div>
  );
}
