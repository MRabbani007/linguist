import ToolTip from "@/components/ToolTip";
import { Dispatch, SetStateAction, useState } from "react";
import { BiPlus } from "react-icons/bi";
import { CiEdit } from "react-icons/ci";
import { MdArrowOutward } from "react-icons/md";

export default function AdminWordRow({
  word,
  index,
  isDraggable = false,
  handleDrag,
  setEdit,
  setEditExamples,
  setMove,
  setEditItem,
}: {
  word: Word;
  index: number;
  isDraggable?: boolean;
  handleDrag?: (stage: "start" | "enter" | "end", item: Word | null) => void;
  setMove: Dispatch<SetStateAction<boolean>>;
  setEdit: Dispatch<SetStateAction<boolean>>;
  setEditExamples: Dispatch<SetStateAction<boolean>>;
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

  const wordType =
    word?.type === "Verb"
      ? { short: "V", title: "Verb", bg: "bg-yellow-200" }
      : word?.type === "Noun"
      ? { short: "N", title: "Noun", bg: "bg-green-200" }
      : word?.type === "Adjective"
      ? { short: "Adj", title: "Adjective", bg: "bg-red-200/30" }
      : null;

  return (
    <div
      draggable={isDraggable}
      onDragStart={handleDragStart}
      onDragOver={handleDragEnter}
      onDragLeave={handleDragLeave}
      onDragEnd={handleDragEnd}
      style={{
        opacity: isDragging ? 0.5 : 1,
        // borderWidth: isOver ? "2px" : "0px",
        borderColor: isOver ? "grey" : "",
        cursor: isDraggable ? "move" : "default",
      }}
      className="flex flex-wrap items-center w-full hover:bg-zinc-100/50 group border-b-[1px] border-zinc-200 "
    >
      <p className="min-w-[3%] py-2 px-2 md:px-1 text-center font-semibold text-zinc-600">
        {index}
      </p>
      <div className="flex-1 flex flex-col md:flex-row items-start md:items-center">
        <div className="flex-1 flex flex-col py-2">
          {/* First */}
          <div className="font-medium">
            <span
              className={
                "text-xs font-medium py-1 px-2 rounded-md mr-2 " + wordType?.bg
              }
            >
              {wordType?.short}
            </span>
            {/* <ToolTip text={word?.third}> */}
            <span className="text-blue-700 w-fit text-lg md:text-xl">
              {word.first}
            </span>
            <span className="text-gray-600 mx-2">
              {word?.third !== "" && "-"}
            </span>
            <span className="text-gray-600">{word?.third}</span>
            {/* </ToolTip> */}
            <span className="italic text-xs ml-1 text-zinc-900">
              {word.firstCaption}
            </span>
            <span className="text-xs font-medium italic text-zinc-600">
              {word?.form}
            </span>
          </div>
          {/* Second */}
          <div className="flex-1 pr-2 text-base md:text-lg ml-8">
            <span className="text-green-700">{word.second}</span>
            <span className="italic text-xs ml-1">{word.secondCaption}</span>
          </div>
          {/* Note */}
          <div className="text-zinc-800 flex items-center gap-2 ml-8">
            <p className="text-sm">{word?.note}</p>
          </div>
        </div>
        {/* Examples */}
        <div className="flex-1 text-zinc-800 flex flex-col gap-1 ml-8 md:ml-0">
          {Array.isArray(word.sentences) &&
            word.sentences?.map((item, idx) => (
              <p className="text-sm font-medium italic text-wrap" key={idx}>
                <span>{item}</span>
                <span>
                  {Array.isArray(word.sentencesTranslation) &&
                    word.sentencesTranslation[idx]}
                </span>
              </p>
            ))}
        </div>
      </div>
      <div className="flex flex-col md:flex-row items-center gap-1 invisible opacity-0 group-hover:visible group-hover:opacity-100 duration-200">
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
            setEditExamples(true);
            setEditItem(word);
          }}
          className="p-1 bg-zinc-50 hover:bg-zinc-200 rounded-md"
        >
          <BiPlus size={20} />
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
