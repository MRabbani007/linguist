import { useState } from "react";
import { CiEdit, CiTrash } from "react-icons/ci";
import { FaEye, FaEyeSlash } from "react-icons/fa6";
import { selectAllWords, useRemoveWordMutation } from "./wordsSlice";
import { useSelector } from "react-redux";
import { selectDisplayBlock, selectEditMode } from "../globals/globalsSlice";

const CardWord = ({ word = {}, index = 0, setEditWord = () => {} }) => {
  const [removeWord] = useRemoveWordMutation();
  const displayBlock = useSelector(selectDisplayBlock);
  const editMode = useSelector(selectEditMode);
  const words = useSelector(selectAllWords);

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
      : "";

  const label_2 =
    displayBlock?.secondLang === "Russian"
      ? "RU"
      : displayBlock?.secondLang === "English"
      ? "EN"
      : "";

  const [show, setShow] = useState(false);

  const handleShowWord = () => {
    setShow(!show);
  };

  return (
    <div className="min-w-[200px] shrink-0 group border-[1px] rounded-md">
      {/* Card Body */}
      <div className="flex flex-row gap-1 p-2 relative">
        {editMode && (
          <span className="invisible group-hover:visible absolute top-2 right-2">
            <CiEdit
              className="icon mr-1 cursor-pointer"
              onClick={() => {
                setEditWord(word);
              }}
            />
            <CiTrash className="icon" onClick={handleDelete} />
          </span>
        )}
        {/* Word */}
        <div className="flex flex-col">
          <div className="">
            <span className="">{label_1}</span>
            <span className="ml-2 font-semibold">{word?.first}</span>
          </div>
          <div className="">
            <span className="">{label_2}</span>
            <span className="ml-2 font-semibold">{word?.second}</span>
          </div>
          {displayBlock?.thirdLang ? (
            <div>
              <span className="font-semibold">{displayBlock?.thirdLang}:</span>
              <span className="ml-2">{word?.third}</span>
            </div>
          ) : null}
          {displayBlock?.fourthLang ? (
            <div>
              <span className="font-semibold">{displayBlock?.fourthLang}:</span>
              <span className="ml-2">{word?.fourth}</span>
            </div>
          ) : null}
        </div>
        {/* Image */}
        {!!word?.image && (
          <div className="flex items-center justify-center">
            <img
              src={(displayBlock?.imagesURL || "") + word.image}
              alt=""
              className="icon-xl"
            />
          </div>
        )}
      </div>
      <div className="card__footer bg-red-500 bg-opacity-60">
        <span></span>
        <span className="cursor-pointer text-slate-50">
          {show ? (
            <FaEyeSlash onClick={handleShowWord} />
          ) : (
            <FaEye onClick={handleShowWord} />
          )}
        </span>
      </div>
    </div>
  );
};

export default CardWord;
