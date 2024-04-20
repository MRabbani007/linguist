import { useEffect, useState } from "react";
import { CiSquareCheck, CiSquareRemove } from "react-icons/ci";
import { useEditWordMutation } from "./wordsSlice";
import { useSelector } from "react-redux";
import {
  selectDisplayBlock,
  selectLanguagesCount,
} from "../globals/globalsSlice";

const CardWordListEdit = ({ word, setViewEdit }) => {
  const [editWord, { isLoading }] = useEditWordMutation();
  const languagesCount = useSelector(selectLanguagesCount);
  const displayBlock = useSelector(selectDisplayBlock);

  const [first, setFirst] = useState(word?.first || "");
  const [firstCaption, setFirstCaption] = useState(word?.firstCaption || "");
  const [second, setSecond] = useState(word?.second || "");
  const [secondCaption, setSecondCaption] = useState(word?.secondCaption || "");
  const [third, setThird] = useState(word?.third || "");
  const [fourth, setFourth] = useState(word?.fourth || "");

  const canSave = !isLoading;

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

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (canSave) {
      try {
        const newWord = {
          ...word,
          first,
          second,
          third,
          fourth,
          firstCaption,
          secondCaption,
        };

        await editWord(newWord).unwrap();

        setViewEdit(false);
      } catch (err) {
        console.error("Failed to save the word", err);
      }
    }
  };

  const handleReset = () => {
    setViewEdit(false);
  };

  useEffect(() => {
    setFirst(word?.first || "");
    setSecond(word?.second || "");
    setThird(word?.third || "");
    setFourth(word?.fourth || "");
    setFirstCaption(word?.firstCaption || "");
    setSecondCaption(word?.secondCaption || "");
  }, [word]);

  return (
    <form
      onSubmit={handleSubmit}
      onReset={handleReset}
      className="flex flex-row gap-3 p-2 relative"
    >
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
      <div className="flex flex-col flex-1 gap-3">
        {/* First Word */}
        <div className="flex gap-2 items-center">
          <span className="">{label_1}</span>
          <input
            type="text"
            id="edit_firstWord"
            name="edit_firstWord"
            placeholder={displayBlock?.firstLang || "First Language"}
            autoFocus
            className=""
            value={first}
            onChange={(e) => {
              setFirst(e.target.value);
            }}
          />
          <input
            type="text"
            id="edit_firstWord"
            name="edit_firstWord"
            placeholder="First Word Caption"
            autoFocus
            className=""
            value={firstCaption}
            onChange={(e) => {
              setFirstCaption(e.target.value);
            }}
          />
        </div>
        {/* Second Word */}
        <div className="flex gap-2 items-center">
          <span className="">{label_2}</span>
          <input
            type="text"
            value={second}
            id="edit_secondWord"
            name="edit_secondWord"
            className=""
            placeholder={displayBlock?.secondLang || "Second Language"}
            onChange={(e) => {
              setSecond(e.target.value);
            }}
          />
          <input
            type="text"
            id="edit_secondWord"
            name="edit_secondWord"
            placeholder="Second Word Caption"
            autoFocus
            className=""
            value={secondCaption}
            onChange={(e) => {
              setSecondCaption(e.target.value);
            }}
          />
        </div>
        {/* Third Word */}
        {languagesCount > 2 ? (
          <div className="flex gap-2 items-center">
            <span className="">{label_3}</span>
            <input
              type="text"
              id="edit_thirdWord"
              name="edit_thirdWord"
              placeholder={displayBlock?.thirdLang || "Third Language"}
              className=""
              value={third}
              onChange={(e) => {
                setThird(e.target.value);
              }}
            />
          </div>
        ) : null}
        {/* Fourth Word */}
        {languagesCount > 3 ? (
          <div className="flex gap-2 items-center">
            <span className="font-semibold">{displayBlock?.fourthLang}:</span>
            <input
              type="text"
              id="edit_fourthWord"
              name="edit_fourthWord"
              className=""
              value={fourth}
              placeholder={displayBlock?.fourthLang || "Fourth Language"}
              onChange={(e) => {
                setFourth(e.target.value);
              }}
            />
          </div>
        ) : null}
      </div>
      {/* Form Buttons */}
      <div className="flex flex-col gap-2 justify-center">
        <button type="submit" className="btn btn-blue">
          {/* <CiSquareCheck className="icon" /> */}
          Save
        </button>
        <button type="reset" className="btn btn-yellow">
          {/* <CiSquareRemove className="icon" /> */}
          Cancel
        </button>
      </div>
    </form>
  );
};

export default CardWordListEdit;
