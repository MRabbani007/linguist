import React, { useState } from "react";
import FormWordEdit from "./FormWordEdit";
import { FiEdit2 } from "react-icons/fi";
import { useSelector } from "react-redux";
import { selectDisplayBlock, selectEditMode } from "../globals/globalsSlice";
import MoveWordSection from "./MoveWordSection";
import { HiOutlineArrowsPointingOut } from "react-icons/hi2";

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
  const [showPronunce, setShowPronunce] = useState(false);

  const showPopup = displayBlock?.thirdLang && word?.third;

  return (
    <>
      <div
        className={
          (word.type === "ph" ? "min-w-[400px]" : "min-w-[200px]") +
          " w-fit flex flex-col items-center justify-center h-[150px] bg-gradient-to-b from-zinc-100 to-zinc-300 flex-1 text-center text-xl gap-2 hover:shadow-lg hover:shadow-zinc-400 duration-200 group relative z-0"
        }
      >
        {/* Word type */}
        <p className="py-2 px-4 flex items-center gap-2 justify-between absolute top-0 left-0 right-0 invisible opacity-0 group-hover:visible group-hover:opacity-100 -translate-y-2 group-hover:translate-y-0 duration-200">
          <span className="font-normal">{WORD_TYPE[word?.type]}</span>
          {word?.gender ? (
            <span className="font-light text-end">
              <i>{WORD_GENDER_SHORT[word?.gender]}</i>
            </span>
          ) : null}
        </p>
        <div className="font-semibold text-red-700 relative group w-full text-center">
          <p
            className="cursor-pointer px-2"
            onMouseOver={() => setShowPronunce(true)}
            onMouseOut={() => setShowPronunce(false)}
          >
            {word?.first}
          </p>
          {showPopup ? (
            <p
              className={
                showPronunce
                  ? "absolute top-full left-1/2 -translate-x-1/2 bg-zinc-50 text-start py-1 px-2 w-fit text-nowrap font-normal z-30"
                  : "hidden"
              }
            >
              {word?.third}
            </p>
          ) : null}
        </div>
        <p className="font-medium text-zinc-800 px-4">{word?.second}</p>
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
          </div>
        ) : null}
      </div>
      {viewEditWord ? (
        <FormWordEdit word={word} setViewEdit={setViewEditWord} />
      ) : null}
      {viewMoveSection && (
        <MoveWordSection word={word} setViewMoveSection={setViewMoveSection} />
      )}
    </>
  );
}
