import { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { selectDisplayLesson } from "../globals/globalsSlice";
import { IoInformationCircleOutline } from "react-icons/io5";
import { BiX } from "react-icons/bi";
import { selectEditMode } from "../admin/adminSlice";

export default function CardWord({ word }: { word: Word }) {
  const displayBlock = useSelector(selectDisplayLesson);
  const editMode = useSelector(selectEditMode);

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
        " flex-1 flex flex-col text-xl duration-200 group relative z-10 bg-zinc-100 hover:bg-zinc-50 rounded-md overflow-clip"
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
              onMouseOver={() => setShowPronunce(true)}
              onMouseOut={() => setShowPronunce(false)}
            >
              <span>{word?.first}</span>
              <span className="font-light text-sm italic ml-2">
                {word.firstCaption}
              </span>
            </p>
            {showPopup ? (
              <p
                className={
                  (showPronunce ? "" : "invisible opacity-0 -translate-y-4 ") +
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
        {/* <div
            title={word?.level}
            className={`bg-${levelColor} rounded-full size-4 absolute top-2 right-2 z-20`}
          ></div> */}
        {editMode && (
          <p className="absolute top-2 right-4 text-sm">{word.sortIndex}</p>
        )}
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
          </div>
        )}
      </div>
    </div>
  );
}
