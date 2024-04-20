import { useEffect, useState } from "react";
import { CiSquareCheck, CiSquareRemove } from "react-icons/ci";
import { useEditWordMutation } from "./wordsSlice";
import { useSelector } from "react-redux";
import {
  selectDisplayBlock,
  selectLanguagesCount,
} from "../globals/globalsSlice";

const CardWordEdit = ({ word, setEditWord }) => {
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

        setEditWord(false);
      } catch (err) {
        console.error("Failed to save the word", err);
      }
    }
  };

  const handleReset = () => {
    setEditWord(false);
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
      className="flex flex-col gap-2 my-2"
    >
      <h3 className="bg-yellow-500 py-2 px-4 rounded-lg font-semibold">
        Edit Word
      </h3>
      {/* First Word & First Word Caption */}
      <div className="flex gap-2 items-center">
        {/* First Word */}
        <div className="field">
          <label htmlFor="edit_firstword" className="field__label">
            {displayBlock?.firstLang || "First Language"}
          </label>
          <input
            type="text"
            id="edit_firstWord"
            name="edit_firstWord"
            placeholder={displayBlock?.firstLang || "First Language"}
            autoFocus
            className="field__input"
            value={first}
            onChange={(e) => {
              setFirst(e.target.value);
            }}
          />
        </div>
        {/* First Word Caption */}
        <div className="field">
          <label htmlFor="edit_firstCaption" className="field__label">
            First Word Caption
          </label>
          <input
            type="text"
            id="edit_firstWord"
            name="edit_firstWord"
            placeholder="First Word Caption"
            autoFocus
            className="field__input"
            value={firstCaption}
            onChange={(e) => {
              setFirstCaption(e.target.value);
            }}
          />
        </div>
      </div>
      {/* Second Word & Second Word Caption */}
      <div className="flex gap-2 items-center">
        {/* Second Word */}
        <div className="field">
          <label htmlFor="edit_secondWord" className="field__label">
            {displayBlock?.secondLang || "Second Language"}
          </label>
          <input
            type="text"
            value={second}
            id="edit_secondWord"
            name="edit_secondWord"
            className="field__input"
            placeholder={displayBlock?.secondLang || "Second Language"}
            onChange={(e) => {
              setSecond(e.target.value);
            }}
          />
        </div>
        {/* Second Word Caption */}
        <div className="field">
          <label htmlFor="edit_secondCaption" className="field__label">
            Second Word Caption
          </label>
          <input
            type="text"
            id="edit_secondWord"
            name="edit_secondWord"
            placeholder="Second Word Caption"
            autoFocus
            className="field__input"
            value={secondCaption}
            onChange={(e) => {
              setSecondCaption(e.target.value);
            }}
          />
        </div>
      </div>
      {/* Third Word & Fourth Word */}
      <div className="flex gap-2 items-center">
        {/* Third Word */}
        {languagesCount > 2 ? (
          <div className="field">
            <label htmlFor="edit_thirdWord" className="field__label">
              {displayBlock?.thirdLang || "Third Language"}
            </label>
            <input
              type="text"
              id="edit_thirdWord"
              name="edit_thirdWord"
              placeholder={displayBlock?.thirdLang || "Third Language"}
              className="field__input"
              value={third}
              onChange={(e) => {
                setThird(e.target.value);
              }}
            />
          </div>
        ) : null}
        {/* Fourth Word */}
        {languagesCount > 3 ? (
          <div className="field">
            <label htmlFor="edit_fourthWord" className="field__label">
              {displayBlock?.fourthLang || "Fourth Language"}
            </label>
            <input
              type="text"
              id="edit_fourthWord"
              name="edit_fourthWord"
              className="field__input"
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
      <div className="flex justify-center items-center my-1">
        <button type="submit">
          <CiSquareCheck className="icon" />
        </button>
        <button type="reset">
          <CiSquareRemove className="icon" onClick={handleReset} />
        </button>
      </div>
    </form>
  );
};

export default CardWordEdit;
