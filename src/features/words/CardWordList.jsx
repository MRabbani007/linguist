import { useEffect, useRef, useState } from "react";
import { useEditWordExerciseMutation } from "./wordsSlice";
import { useSelector } from "react-redux";
import {
  selectDisplayBlock,
  selectEditMode,
  selectLanguagesCount,
} from "../globals/globalsSlice";
import { CiEdit } from "react-icons/ci";
import { FaCheck, FaEye, FaEyeSlash, FaPlus } from "react-icons/fa6";
import CardSentence from "./CardSentence";
import CardAddSentence from "./CardAddSentence";
import CardWordListEdit from "./CardWordListEdit";
import MoveWord from "./MoveWord";
import MoveWordSection from "./MoveWordSection";
import { BsThreeDots } from "react-icons/bs";
import WordDropDown from "../dropDowns/WordDropDown";
import WordImageEdit from "./WordImageEdit";

const CardWordList = ({ word, sectionsList }) => {
  const [editWordExercise] = useEditWordExerciseMutation();
  const displayBlock = useSelector(selectDisplayBlock);
  const languagesCount = useSelector(selectLanguagesCount);
  const editMode = useSelector(selectEditMode);

  const [showDropDown, setShowDropDown] = useState(false);

  const dropDownRef = useRef();
  const dropDownButtonRef = useRef();

  const handleDropDown = (e) => {
    if (!dropDownRef?.current?.contains(e.target)) {
      setShowDropDown(false);
      if (dropDownButtonRef.current?.contains(e.target)) {
        setShowDropDown(true);
      } else {
        setShowDropDown(false);
      }
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleDropDown);
    return () => {
      document.removeEventListener("mousedown", handleDropDown);
    };
  }, []);

  const [viewEditWord, setViewEditWord] = useState(false);
  const [editImage, setEditImage] = useState(false);
  const [viewMoveLesson, setViewMoveLesson] = useState(false);
  const [viewMoveSection, setViewMoveSection] = useState(false);
  const [addSentence, setAddSentence] = useState(false);

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

  const isExercise = word.exercises === "all";

  const handleAddExer = async () => {
    await editWordExercise({
      id: word.id,
      exercises: isExercise ? "" : "all",
      display: word.display,
    });
  };

  return (
    <>
      <div className="min-w-[200px] p-2 shrink-0 group border-[1px] shadow-sm shadow-slate-400 flex items-stretch">
        {/* Left Col */}
        <div className=" px-1">
          <input type="checkbox" />
        </div>
        {/* Card Body */}
        <div className="flex flex-wrap flex-1 md:justify-between gap-3 relative">
          {editMode && (
            <button
              ref={dropDownButtonRef}
              title="Edit Section"
              onClick={() => setShowDropDown(true)}
              className="absolute top-0 right-0"
            >
              <BsThreeDots size={28} />
            </button>
          )}
          <WordDropDown
            word={word}
            showDropDown={showDropDown}
            setAddImage={setEditImage}
            setAddSentence={setAddSentence}
            setEditWord={setViewEditWord}
            setViewMoveSection={setViewMoveSection}
            setViewMoveLesson={setViewMoveLesson}
          />
          <div className="flex flex-wrap flex-1 gap-3 px-2">
            {/* Image */}
            {word?.image ? (
              <div className="relative group w-28 flex items-center justify-center">
                <img
                  src={(displayBlock?.imagesURL || "") + word.image}
                  alt=""
                  className="object-fill max-w-full max-h-[100px]"
                />
                {editMode && (
                  <button
                    className="absolute top-0 right-0 invisible group-hover:visible"
                    onClick={() => setEditImage(!editImage)}
                  >
                    <CiEdit size={34} />
                  </button>
                )}
              </div>
            ) : null}
            {/* Word */}
            <div className="flex flex-col flex-1 gap-0">
              <div className="">
                <span className="">{label_1}</span>
                <span className="text-xl mx-2 font-normal">{word?.first}</span>
                <span className="text-sm italic">{word?.firstCaption}</span>
                {editMode && (
                  <button onClick={() => setViewEditWord(true)}>
                    <CiEdit size={32} className="inline" />
                  </button>
                )}
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
          </div>
        </div>
        <div className="flex flex-col justify-between px-1 text-slate-600">
          <button onClick={handleAddExer}>
            <FaPlus
              className={
                (isExercise ? "text-lime-500 " : "") +
                "icon-md hover:scale-150 cursor-pointer duration-200"
              }
            />
          </button>
          <FaCheck className="icon-md hover:scale-150 cursor-pointer duration-200" />
          <FaEyeSlash
            className="icon-md hover:scale-150 cursor-pointer duration-200"
            onClick={handleShowWord}
          />
        </div>
      </div>
      {viewEditWord ? (
        <CardWordListEdit word={word} setViewEdit={setViewEditWord} />
      ) : null}
      {editImage ? <WordImageEdit word={word} setEdit={setEditImage} /> : null}
      {addSentence ? (
        <CardAddSentence
          word={word}
          addSentence={addSentence}
          setAddSentence={setAddSentence}
        />
      ) : null}
      {viewMoveSection && (
        <MoveWordSection
          word={word}
          sectionsList={sectionsList}
          setViewMoveSection={setViewMoveSection}
        />
      )}
      {viewMoveLesson && (
        <MoveWord word={word} setViewMoveLesson={setViewMoveLesson} />
      )}
    </>
  );
};

export default CardWordList;
