export default function Sentence({ sentence }: { sentence: Sentence }) {
  const color = !!sentence?.level
    ? sentence.level < 2
      ? "bg-sky-500"
      : sentence.level < 4
      ? "bg-green-500"
      : sentence.level < 7
      ? "bg-yellow-400"
      : sentence.level < 9
      ? "bg-orange-400"
      : "bg-red-500"
    : "bg-zinc-300";

  return (
    <div className="w-full relative group flex items-stretch bg-zinc-100">
      <div className={"min-w-4 min-h-full shrink-0 " + color}></div>
      <div className="flex-1 p-4">
        <p className="w-fit font-medium" title={sentence?.pronounce}>
          <span className="font-semibold text-red-700 text-lg">
            {sentence?.text}
          </span>
          <span>{sentence?.caption}</span>
        </p>
        {sentence?.translation && (
          <p>
            <span>
              <i>{sentence?.translation}</i>
            </span>
            <span>
              <i>{sentence?.caption}</i>
            </span>
          </p>
        )}
      </div>
    </div>
  );
}
