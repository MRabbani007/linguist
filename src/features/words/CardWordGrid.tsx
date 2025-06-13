import { Dispatch, SetStateAction } from "react";

export default function CardWordGrid({
  word,
  index,
  isSelected = false,
  onSelect,
  setShowWords,
  setDisplayIndex,
}: {
  word: Word;
  index: number;
  isSelected?: boolean;
  onSelect?: (val: boolean, idx: number, id: string) => void;
  setShowWords: Dispatch<SetStateAction<boolean>>;
  setDisplayIndex: Dispatch<SetStateAction<number>>;
}) {
  const level = word?.level ?? "";
  const levelColor =
    level.includes("A1") === true
      ? "sky-600"
      : level.includes("A2") === true
      ? "green-600"
      : level.includes("B1")
      ? "yellow-400"
      : level.includes("B2")
      ? "yellow-600"
      : level.includes("C1")
      ? "orange-600"
      : level.includes("C2")
      ? "red-600"
      : "zinc-100";

  const gender = word?.gender ?? "";
  const wordGender =
    gender === "Masculine" || gender === "m"
      ? "masc"
      : gender === "Feminine" || gender === "f"
      ? "fem"
      : gender === "Neuter" || gender === "n"
      ? "neut"
      : null;

  const wordType =
    word?.type === "Verb"
      ? { short: "V", title: "Verb", bg: "bg-yellow-200/30" }
      : word?.type === "Noun"
      ? { short: "N", title: "Noun", bg: "bg-green-200/30" }
      : word?.type === "Adjective"
      ? { short: "Adj", title: "Adjective", bg: "bg-red-200/30" }
      : null;

  return (
    <div
      className={
        (word.type === "ph" ? "" : "") +
        " flex-1 flex flex-col text-xl duration-200 group relative z-10 overflow-clip " +
        (word?.form === "Imperfective"
          ? " bg-sky-200/20 hover:bg-sky-200/40"
          : " bg-gray-200/20 hover:bg-gray-200/40")
      }
    >
      {/* Word Body */}
      <div
        className={
          `border-l-2 border-${levelColor} duration-200  ` +
          " flex-1 flex items-stretch gap-4 relative py-2 px-4 md:p4-4 md:px-4"
        }
      >
        {/* Word Image */}
        {word?.imageURL ? (
          <img
            src={word.imageURL}
            alt={word.first}
            className="object-contain max-h-24 w-20 my-auto"
          />
        ) : null}
        {/* Word first, second */}
        <div className="flex flex-col flex-wrap items-start justify-start gap-2 flex-1 my-auto">
          <div className="font-semibold relative group w-fit">
            <p
              className="cursor-pointer text-xl space-x-1"
              onClick={() => {
                setShowWords(true);
                setDisplayIndex(index);
              }}
            >
              <span className="text-sky-600">{word?.first}</span>
              <span className="font-light text-sm italic ml-2">
                {word.firstCaption}
              </span>
            </p>
          </div>
          <p className="font-medium text-destructive_foreground text-base">
            <span>{word?.second}</span>
            <span className="font-light text-sm italic ml-2">
              {word.secondCaption}
            </span>
          </p>
        </div>
        {wordType && (
          <div className="flex items-center mt-auto gap-2">
            <p
              className={`text-xs font-medium py-1 px-2 rounded-md ${wordType?.bg}`}
              title={wordType?.title}
            >
              {wordType.short}
            </p>
            {wordGender && (
              <p className="text-xs font-medium py-1 px-2 rounded-md bg-zinc-200">
                {wordGender}
              </p>
            )}
            <input
              type="checkbox"
              checked={isSelected ?? false}
              onChange={(event) =>
                onSelect && onSelect(event.target.checked, index, word.id)
              }
            />
          </div>
        )}
      </div>
    </div>
  );
}
