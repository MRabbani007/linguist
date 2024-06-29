import React, { useState } from "react";
import FormWordEdit from "./FormWordEdit";
import { FiEdit2 } from "react-icons/fi";
import { useSelector } from "react-redux";
import { selectDisplayBlock, selectEditMode } from "../globals/globalsSlice";
import CardWordType from "./CardWordType";

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
  const [viewEditType, setViewEditType] = useState(false);
  const [showPronunce, setShowPronunce] = useState(false);

  const showPopup =
    (displayBlock?.thirdLang && word?.third) || word?.type || word?.gender;

  return (
    <>
      <div className="text-center min-w-[150px] max-w-[250px] flex-1 relative">
        <p className="py-2 px-4 bg-zinc-200 font-semibold text-red-700 relative group">
          {/* <span title={WORD_TYPE[word?.type]}>{word?.type}</span> */}
          <span
            className="mx-2 cursor-pointer"
            onMouseOver={() => setShowPronunce(true)}
            onMouseOut={() => setShowPronunce(false)}
          >
            {word?.first}
          </span>
          {showPopup ? (
            <div
              className={
                showPronunce
                  ? "absolute top-full left-1/2 -translate-x-1/2 bg-slate-50 border-[1px] border-red-400 z-10 text-start"
                  : "hidden"
              }
            >
              <p className="border-b-[1px] border-red-400 py-1 px-2 flex items-center gap-2 justify-between">
                <span className="font-normal">{WORD_TYPE[word?.type]}</span>
                {word?.gender ? (
                  <span className="font-light text-end">
                    <i>{WORD_GENDER_SHORT[word?.gender]}</i>
                  </span>
                ) : null}
              </p>
              <p className=" py-1 px-2 w-fit text-nowrap">{word?.third}</p>
            </div>
          ) : null}
          <span>
            <i>{word?.firstCaption}</i>
          </span>
          {editMode ? (
            <button onClick={() => setViewEditType(true)}>
              <FiEdit2
                size={20}
                className="inline absolute top-1 left-1 invisible group-hover:visible"
              />
            </button>
          ) : null}
          {editMode ? (
            <button onClick={() => setViewEditWord(true)}>
              <FiEdit2
                size={20}
                className="inline absolute top-1 right-1 invisible group-hover:visible"
              />
            </button>
          ) : null}
          {viewEditType ? (
            <CardWordType word={word} setEdit={setViewEditType} />
          ) : null}
        </p>
        <p className="py-2 px-4 bg-zinc-100 font-medium text-zinc-800">
          <span>{word?.second}</span>
          <span>
            <i>{word?.secondCaption}</i>
          </span>
        </p>
      </div>
      {viewEditWord ? (
        <FormWordEdit word={word} setViewEdit={setViewEditWord} />
      ) : null}
    </>
  );
}
