import { useState } from "react";
import { CiEdit, CiTrash } from "react-icons/ci";
import { FaEye, FaEyeSlash } from "react-icons/fa6";
import { useRemoveWordMutation } from "./wordsSlice";
import { useSelector } from "react-redux";
import { selectDisplayBlock, selectEditMode } from "../globals/globalsSlice";

const CardWord = ({ word = {}, colSpan = 4, setEditWord = () => {} }) => {
  const [removeWord] = useRemoveWordMutation();
  const displayBlock = useSelector(selectDisplayBlock);
  const editMode = useSelector(selectEditMode);

  const handleDelete = async () => {
    try {
      if (confirm("Delete this Word? !\nEither OK or Cancel.")) {
        await removeWord(word.id).unwrap();
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
    <div className="flex flex-col justify-center min-w-[200px] shrink-0 group border-2 rounded-lg border-red-500">
      {/* Card Header */}
      {editMode && (
        <div className="flex justify-between items-center bg-red-500 py-2 px-4">
          {/* <span>{index + 1 + " / " + words?.length}</span> */}
          <span className="invisible group-hover:visible">
            <>
              <CiEdit
                className="icon mr-1 cursor-pointer"
                onClick={() => {
                  setEditWord(word);
                }}
              />
              <CiTrash className="icon" onClick={handleDelete} />
            </>
          </span>
        </div>
      )}
      {/* Card Body */}
      <div className="flex py-2 px-4 gap-3 items-center justify-center bg-slate-200 rounded-t-lg">
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
          {colSpan > 4 ? (
            <div>
              <span className="font-semibold">{displayBlock?.thirdLang}:</span>
              <span className="ml-2">{word?.third}</span>
            </div>
          ) : null}
          {colSpan > 5 ? (
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
      <div className="flex items-center justify-between px-4 py-2 bg-red-500">
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
