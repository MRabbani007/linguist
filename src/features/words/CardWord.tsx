import { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { selectDisplayLesson } from "../globals/globalsSlice";
import { IoInformationCircleOutline } from "react-icons/io5";
import { BiX } from "react-icons/bi";

export default function CardWord({ word }: { word: Word }) {
  const displayBlock = useSelector(selectDisplayLesson);

  // const [viewEditImage, setViewEditImage] = useState(false);
  const [showPronunce, setShowPronunce] = useState(false);
  const [showNote, setShowNote] = useState(false);

  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        setShowNote(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const showPopup = displayBlock?.thirdLang && word?.third;

  const levelColor = (level: string) =>
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

  const wordGender = (gender: string) =>
    gender === "Masculine" || gender === "m"
      ? "(masc)"
      : gender === "Feminine" || gender === "f"
      ? "(fem)"
      : gender === "Neuter" || gender === "n"
      ? "(neut)"
      : "";

  return (
    <>
      <div
        className={
          (word.type === "ph" ? "" : "") +
          "  flex flex-col h-full text-xl duration-200 group relative z-10 bg-destructive"
        }
      >
        {/* Word Body */}
        <div className="flex-1 flex items-stretch gap-4 relative py-2 px-4 md:py-4 md:px-6">
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
                onMouseOver={() => setShowPronunce(true)}
                onMouseOut={() => setShowPronunce(false)}
              >
                <span>{word?.first}</span>
                <span className="font-light italic text-sm">
                  {wordGender(word?.gender ?? "")}
                </span>
                <span className="font-light text-sm italic ml-2">
                  {word.firstCaption}
                </span>
              </p>
              {showPopup ? (
                <p
                  className={
                    (showPronunce
                      ? ""
                      : "invisible opacity-0 -translate-y-4 ") +
                    " absolute top-full left-0 py-1 px-2 w-fit text-nowrap font-normal z-50 bg-white rounded-lg duration-200 text-sm"
                  }
                >
                  {word?.third}
                </p>
              ) : null}
            </div>
            <p className="font-medium text-destructive_foreground text-base">
              <span>{word?.second}</span>
              <span className="font-light text-sm italic ml-2">
                {word.secondCaption}
              </span>
            </p>
          </div>
          <div
            title={word?.level}
            className={`bg-${levelColor(
              word?.level ?? ""
            )} rounded-full size-4 absolute top-2 right-2 z-20`}
          ></div>
          {word?.note && word.note !== "" && (
            <button
              className="absolute top-2 right-6"
              onClick={() => setShowNote(true)}
            >
              <IoInformationCircleOutline size={20} />
            </button>
          )}
          <div
            ref={ref}
            className={
              (showNote ? "" : "invisible opacity-0 -translate-y-4 ") +
              " absolute top-2 right-2 left-2 bg-white rounded-md p-4 text-sm flex items-start justify-between z-30 duration-200"
            }
          >
            <p className="mt-2 mr-2">{word?.note}</p>
            <button
              onClick={() => setShowNote(false)}
              className="absolute top-1 right-1 bg-zinc-100 rounded-full hover:bg-zinc-200 duration-150 p-1"
            >
              <BiX size={20} />
            </button>
          </div>
          <div className="text-sm font-light mt-auto">{word?.type}</div>
        </div>
      </div>
    </>
  );
}
