export default function CardWordRow({
  word,
  index,
}: {
  word: Word;
  index: number;
}) {
  return (
    <div className="flex w-full hover:bg-zinc-100/40 border-b-[1px] border-zinc-200 last:border-b-0 duration-200">
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
    </div>
  );
}
