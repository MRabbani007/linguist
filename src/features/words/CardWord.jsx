import React, { useState } from "react";
import FormWordEdit from "./FormWordEdit";
import { FiEdit2 } from "react-icons/fi";
import { useSelector } from "react-redux";
import { selectDisplayBlock, selectEditMode } from "../globals/globalsSlice";
import MoveWordSection from "./MoveWordSection";
import { HiOutlineArrowsPointingOut } from "react-icons/hi2";
import { FaPlus } from "react-icons/fa6";
import { PiCrownSimpleThin } from "react-icons/pi";
import { IoStarOutline } from "react-icons/io5";
import { CiImageOn } from "react-icons/ci";
import WordImageEdit from "./WordImageEdit";

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

  return (
    <>
      <div
        className={
          (word.type === "ph" ? "" : "") +
          " min-w-[350px] lg:min-w-[400px] max-w-[600px] flex flex-col min-h-[150px] flex-1 text-xl  duration-200 group relative z-0  border-red-600"
        }
      >
        <div className="flex-1 flex items-stretch gap-4 relative py-4 px-6">
          {word?.imageURL ? (
            <img
              src={word.imageURL}
              alt={word.first}
              className="max-h-28 max-w-24"
            />
          ) : null}
          {/* <div className="p-4 flex flex-col items-center">
            <input type="checkbox" />
          </div> */}
          <div className="flex flex-col justify-center flex-1">
            <div className="font-semibold text-red-600 relative group w-fit">
              <p
                className="cursor-pointer text-2xl"
                onMouseOver={() => setShowPronunce(true)}
                onMouseOut={() => setShowPronunce(false)}
              >
                {word?.first}
              </p>
              {showPopup ? (
                <p
                  className={
                    showPronunce
                      ? "absolute top-0 left-full bg-zinc-50 text-start py-1 px-2 w-fit text-nowrap font-normal z-30"
                      : "hidden"
                  }
                >
                  {word?.third}
                </p>
              ) : null}
            </div>
            <p className="font-medium text-zinc-800 text-base">
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
        <div className="py-2 px-4 flex items-center gap-4 text-sm  border-red-600 bg-red-100">
          <button className="text-zinc-700">
            <FaPlus size={20} />
          </button>
          {/* Word type */}
          <span className="font-normal">{WORD_TYPE[word?.type]}</span>
          <span className="font-light">
            <i>{WORD_GENDER_SHORT[word?.gender]}</i>
          </span>
          <IoStarOutline className="ml-auto" size={20} />
          <PiCrownSimpleThin size={24} title={word?.level} />
        </div>
      </div>
      {viewEditWord ? (
        <FormWordEdit word={word} setViewEdit={setViewEditWord} />
      ) : null}
      {viewMoveSection && (
        <MoveWordSection word={word} setViewMoveSection={setViewMoveSection} />
      )}
      {viewEditImage ? (
        <WordImageEdit word={word} setEdit={setViewEditImage} />
      ) : null}
    </>
  );
}
