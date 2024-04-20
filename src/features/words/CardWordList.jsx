import { useState } from "react";
import { useRemoveWordMutation } from "./wordsSlice";
import { useSelector } from "react-redux";
import {
  selectDisplayBlock,
  selectEditMode,
  selectLanguagesCount,
} from "../globals/globalsSlice";
import { CiEdit, CiTrash } from "react-icons/ci";
import { FaCheck, FaEye, FaEyeSlash, FaPlus } from "react-icons/fa6";
import CardSentence from "./CardSentence";
import CardAddSentence from "./CardAddSentence";
import CardWordListEdit from "./CardWordListEdit";

const CardWordList = ({
  word = {},
  index = 0,
  setEditWord = () => {},
  toggleAddSentence = () => {},
}) => {
  const [removeWord] = useRemoveWordMutation();
  const displayBlock = useSelector(selectDisplayBlock);
  const languagesCount = useSelector(selectLanguagesCount);
  const editMode = useSelector(selectEditMode);

  const [viewEdit, setViewEdit] = useState(false);

  const handleDelete = async () => {
    try {
      if (confirm("Delete this Word?")) {
        await removeWord(word?.id).unwrap();
      }
    } catch (err) {
      console.error("Failed to delete the word", err);
    }
  };

  const label_1 =
    displayBlock?.firstLang === "Russian"
      ? "RU"
      : displayBlock?.firstLang === "English"
      ? "EN"
      : displayBlock?.firstLang === "Pronunciation"
      ? "Pronunced"
      : displayBlock?.firstLang;

  const label_2 =
    displayBlock?.secondLang === "Russian"
      ? "RU"
      : displayBlock?.secondLang === "English"
      ? "EN"
      : displayBlock?.secondLang === "Pronunciation"
      ? "Pronunced"
      : displayBlock?.secondLang;

  const label_3 =
    displayBlock?.thirdLang === "Russian"
      ? "RU"
      : displayBlock?.thirdLang === "English"
      ? "EN"
      : displayBlock?.thirdLang === "Pronunciation"
      ? "Pronunced"
      : displayBlock?.thirdLang;

  const [show, setShow] = useState(false);

  const handleShowWord = () => {
    setShow(!show);
  };

  return (
    <div className="min-w-[200px] px-2 shrink-0 group border-[1px] shadow-sm shadow-slate-400 ">
      {/* Card Body */}
      {viewEdit ? (
        <CardWordListEdit word={word} setViewEdit={setViewEdit} />
      ) : (
        <div className="flex flex-row flex-wrap md:justify-between gap-3 p-2 ">
          <div className="p-1">
            <input type="checkbox" />
          </div>
          {/* Image */}
          {!!word?.image && (
            <div className="flex items-center justify-center">
              <img
                src={(displayBlock?.imagesURL || "") + word.image}
                alt=""
                className="w-[150px]"
              />
            </div>
          )}
          {/* Word */}
          <div className="flex flex-col flex-1 gap-0 relative">
            {editMode && (
              <span className="invisible group-hover:visible absolute top-2 right-2">
                <CiEdit
                  className="icon mr-1 cursor-pointer"
                  onClick={() => {
                    setViewEdit(true);
                  }}
                />
                <CiTrash className="icon" onClick={handleDelete} />
              </span>
            )}
            <div className="">
              <span className="">{label_1}</span>
              <span className="text-xl mx-2 font-normal">{word?.first}</span>
              <span className="text-sm italic">{word?.firstCaption}</span>
            </div>
            <div className="">
              <span className="">{label_2}</span>
              <span className="ml-2 font-semibold">{word?.second}</span>
              <span className="text-sm italic">{word?.secondCaption}</span>
            </div>
            {languagesCount > 2 ? (
              <div>
                <span className="">{label_3}</span>
                <span className="font-semibold ml-2">{word?.third}</span>
              </div>
            ) : null}
            {languagesCount > 3 ? (
              <div>
                <span className="font-semibold">
                  {displayBlock?.fourthLang}:
                </span>
                <span className="ml-2">{word?.fourth}</span>
              </div>
            ) : null}
          </div>
          {/* Sentences */}
          {Array.isArray(word?.sentences) && word.sentences.length !== 0 && (
            <div className="flex flex-col flex-1 gap-3">
              {word.sentences.map((sentence, index) => {
                return (
                  <CardSentence
                    word={word}
                    sentence={sentence}
                    index={index}
                    key={index}
                  />
                );
              })}
            </div>
          )}
          {editMode && <CardAddSentence word={word} />}
          <div className="flex flex-col items-center justify-between text-slate-600 py-3">
            <FaPlus className="icon-md hover:scale-150 cursor-pointer duration-200" />
            <FaCheck className="icon-md hover:scale-150 cursor-pointer duration-200" />
            <FaEyeSlash
              className="icon-md hover:scale-150 cursor-pointer duration-200"
              onClick={handleShowWord}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default CardWordList;
