import { Dispatch, SetStateAction } from "react";
import { CiEdit } from "react-icons/ci";
import { MdArrowOutward } from "react-icons/md";

export default function AdminWordRow({
  word,
  index,
  setEdit,
  setMove,
  setEditItem,
}: {
  word: Word;
  index: number;
  setMove: Dispatch<SetStateAction<boolean>>;
  setEdit: Dispatch<SetStateAction<boolean>>;
  setEditItem: Dispatch<SetStateAction<Word | null>>;
}) {
  return (
    <div className="flex w-full bg-zinc-100/30 border-b-[1px] border-zinc-200 last:border-b-0 group">
      <div className="min-w-[5%] py-2 px-2 md:px-4 text-center">{index}</div>
      <div className="flex-1 font-medium text-lg text-zinc-950 py-2">
        <span>{word.first}</span>
        <span className="italic text-xs ml-1">{word.firstCaption}</span>
      </div>
      <div className="flex-1 py-2 pr-2 text-lg">
        <span>{word.second}</span>
        <span className="italic text-xs ml-1">{word.secondCaption}</span>
      </div>
      <div className="flex-1 font-medium text-base text-zinc-950 py-2">
        <span>{word.third}</span>
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
