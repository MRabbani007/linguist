import React, { useState } from "react";
import FormWordEdit from "./FormWordEdit";
import { FiEdit2 } from "react-icons/fi";
import { useSelector } from "react-redux";
import { selectDisplayBlock, selectEditMode } from "../globals/globalsSlice";
import MoveWordSection from "./MoveWordSection";
import { HiOutlineArrowsPointingOut } from "react-icons/hi2";
import { FaPlus } from "react-icons/fa6";
import { PiCrownSimpleThin } from "react-icons/pi";
import { IoChevronForwardOutline, IoStarOutline } from "react-icons/io5";
import { CiImageOn } from "react-icons/ci";
import FormWordImage from "./FormWordImage";

const WORD_TYPE = {
  v: "Verb",
  n: "Noun",
  p: "Pronoun",
  adj: "Adjective",
  adv: "Adverb",
  ph: "Phrase",
};

const WORD_GENDER = {
  m: "Masculine",
  f: "Feminine",
  n: "Neuter",
};

const WORD_GENDER_SHORT = {
  m: "masc",
  f: "fem",
  n: "neut",
};

export default function CardWord({ word }) {
  const editMode = useSelector(selectEditMode);
  const displayBlock = useSelector(selectDisplayBlock);

  const [viewEditWord, setViewEditWord] = useState(false);
  const [viewMoveSection, setViewMoveSection] = useState(false);
  const [viewEditImage, setViewEditImage] = useState(false);
  const [showPronunce, setShowPronunce] = useState(false);

  const showPopup = displayBlock?.thirdLang && word?.third;

  const [expand, setExpand] = useState(false);
  // min-w-[350px] lg:min-w-[400px] max-w-[600px]

  const WORD_LEVEL = {
    1: "text-green-600",
    2: "text-green-600",
    3: "text-orange-600",
    4: "text-orange-600",
    5: "text-red-600",
    6: "text-red-600",
  };

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
          {/* <button onClick={() => setExpand((curr) => !curr)}>
            <IoChevronForwardOutline
              className={
                (expand ? "rotate-90" : "") +
                " absolute top-2 left-2 invisible group-hover:visible duration-200"
              }
            />
          </button> */}
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
                {word?.first}
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
              {word?.second}
            </p>
          </div>
          {editMode ? (
            <div className="absolute bottom-2 right-2 invisible group-hover:visible flex items-center gap-2">
              <button
                title="Move to Section"
                onClick={() => setViewMoveSection(true)}
              >
                <HiOutlineArrowsPointingOut size={20} />
              </button>
              <button title="Edit Word" onClick={() => setViewEditWord(true)}>
                <FiEdit2 size={20} />
              </button>
              <button title="Edit Image" onClick={() => setViewEditImage(true)}>
                <CiImageOn size={20} />
              </button>
            </div>
          ) : null}
        </div>
        {/* Word Footer */}
        {/* expand ? "py-2 px-4 " : */}
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
          <span className="font-normal">{WORD_TYPE[word?.type]}</span>
          <span className="font-light">
            <i>{WORD_GENDER_SHORT[word?.gender]}</i>
          </span>
          <IoStarOutline className="ml-auto" size={20} />
          <PiCrownSimpleThin
            size={24}
            title={word?.level}
            className={word?.level && WORD_LEVEL[word.level]}
          />
        </div>
      </div>
      {viewEditWord ? (
        <FormWordEdit word={word} setViewEdit={setViewEditWord} />
      ) : null}
      {viewMoveSection && (
        <MoveWordSection word={word} setViewMoveSection={setViewMoveSection} />
      )}
      {/* {viewEditImage ? (
        <WordImageEdit word={word} setEdit={setViewEditImage} />
      ) : null} */}
      {viewEditImage ? (
        <FormWordImage word={word} setShowForm={setViewEditImage} type="edit" />
      ) : null}
    </>
  );
}
