import { useState } from "react";
import { useSelector } from "react-redux";
import { selectDisplayLesson } from "../globals/globalsSlice";
import { FaPlus } from "react-icons/fa6";
import { PiCrownSimpleThin } from "react-icons/pi";
import { IoStarOutline } from "react-icons/io5";

export default function CardWord({ word }: { word: Word }) {
  const displayBlock = useSelector(selectDisplayLesson);

  // const [viewEditImage, setViewEditImage] = useState(false);
  const [showPronunce, setShowPronunce] = useState(false);

  const showPopup = displayBlock?.thirdLang && word?.third;

  return (
    <>
      <div
        className={
          (word.type === "ph" ? "" : "") +
          "  flex flex-col flex-1 text-xl duration-200 group relative z-10 bg-destructive"
        }
      >
        {/* Word Body */}
        <div className="flex-1 flex items-stretch gap-4 relative py-2 px-4 md:py-4 md:px-6">
          {/* Word Image */}
          {word?.imageURL ? (
            <img
              src={word.imageURL}
              alt={word.first}
              className="object-contain max-h-24 max-w-20 my-auto"
            />
          ) : null}
          {/* Word first, second */}
          <div className="flex flex-col flex-wrap items-start justify-start gap-2 flex-1 my-auto">
            <div className="font-semibold relative group w-fit">
              <p
                className="cursor-pointer text-xl"
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
        </div>
        {/* Word Footer */}
        <div
          className={
            "h-0 invisible opacity-0 " +
            " flex items-center gap-4 text-sm border-t-[1px] border-accent bg-destructive text-destructive_foreground duration-200"
          }
        >
          <button className="">
            <FaPlus size={20} />
          </button>
          {/* Word type */}
          {/* <span className="font-normal">{WORD_TYPE[word?.type]}</span>
          <span className="font-light">
            <i>{WORD_GENDER_SHORT[word?.gender]}</i>
          </span> */}
          <IoStarOutline className="ml-auto" size={20} />
          <PiCrownSimpleThin size={24} title={word?.level} />
        </div>
      </div>
    </>
  );
}
