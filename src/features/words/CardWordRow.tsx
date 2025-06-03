import ToolTip from "@/components/ToolTip";

export default function CardWordRow({
  word,
  index,
}: {
  word: Word;
  index: number;
}) {
  return (
    <div className="flex items-center w-full hover:bg-zinc-100/50 border-b-[1px] border-zinc-200 last:border-b-0 duration-200">
      <div className="min-w-[5%] py-2 px-2 md:px-4 text-center text-zinc-800">
        {index}
      </div>
      <div className="flex-1 flex flex-col pb-0 gap-0">
        <div className="flex items-center">
          <p className="flex-1 flex items-center font-medium text-lg text-zinc-950 py-0">
            <ToolTip text={word?.third}>
              <span className="text-sky-700 w-fit">{word.first}</span>
            </ToolTip>
            <span className="italic text-xs ml-1">{word.firstCaption}</span>
          </p>
          <p className="flex-1 py-0 pr-2 text-base">
            <span className="text-green-700">{word.second}</span>
            <span className="italic text-xs ml-1">{word.secondCaption}</span>
          </p>
        </div>
        {(word?.form ?? "" + word?.note ?? "") !== "" && (
          <div className="text-zinc-800 flex items-center gap-2">
            <p className="text-sm font-medium italic">{word?.form}</p>
            <p className="text-sm">{word?.note}</p>
          </div>
        )}
      </div>
    </div>
  );
}
