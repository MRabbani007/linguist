export default function CardWordRow({
  word,
  index,
  isSelected = false,
  onSelect,
}: {
  word: Word;
  index: number;
  isSelected?: boolean;
  onSelect?: (val: boolean, idx: number, id: string) => void;
}) {
  const wordType =
    word?.type === "Verb"
      ? { short: "V", title: "Verb", bg: "bg-yellow-200" }
      : word?.type === "Noun"
      ? { short: "N", title: "Noun", bg: "bg-green-200" }
      : word?.type === "Adjective"
      ? { short: "Adj", title: "Adjective", bg: "bg-red-200/30" }
      : null;

  return (
    <div className="flex items-center w-full hover:bg-zinc-100/50 border-b-[1px] border-zinc-200 last:border-b-0 duration-200">
      <p className="min-w-[3%] py-2 px-2 md:px-1 text-center font-semibold text-zinc-600">
        {index + 1}
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
            <span className="text-sky-600 w-fit text-lg md:text-xl">
              {word.first}
            </span>
            <span className="text-gray-600 mx-2">
              {word?.third !== "" && "-"}
            </span>
            <span className="text-gray-600">{word?.third}</span>
            <span className="italic text-xs ml-1 text-zinc-900">
              {word.firstCaption}
            </span>
            {word?.form && word?.form !== "" && (
              <span className="text-xs font-medium italic text-zinc-600 bg-yellow-50 py-1 px-2 rounded-md">
                {word?.form}
              </span>
            )}
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
        <div className="flex-1 text-zinc-700 flex flex-col gap-1 ml-8 md:ml-0">
          {Array.isArray(word.sentences) &&
            word.sentences?.map((item, idx) => (
              <p
                className="text-sm font-medium italic text-wrap flex flex-col"
                key={idx}
              >
                <span>{item}</span>
                <span className="text-zinc-500">
                  {Array.isArray(word.sentencesTranslation) &&
                    word.sentencesTranslation[idx]}
                </span>
              </p>
            ))}
        </div>
      </div>
      <div>
        <input
          type="checkbox"
          checked={isSelected ?? false}
          onChange={(event) =>
            onSelect && onSelect(event.target.checked, index, word.id)
          }
        />
      </div>
    </div>
  );
}
