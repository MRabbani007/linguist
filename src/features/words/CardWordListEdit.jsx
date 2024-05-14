import { useEffect, useState } from "react";
import { CiSquareCheck, CiSquareRemove } from "react-icons/ci";
import { useEditWordMutation } from "./wordsSlice";
import { useSelector } from "react-redux";
import {
  selectDisplayBlock,
  selectLanguagesCount,
} from "../globals/globalsSlice";
import { toast } from "react-toastify";

const CardWordListEdit = ({ word, setViewEdit }) => {
  const [editWord, { isLoading }] = useEditWordMutation();
  const languagesCount = useSelector(selectLanguagesCount);
  const displayBlock = useSelector(selectDisplayBlock);

  const [sortIndex, setSortIndex] = useState(word?.sortIndex || "");
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
          sortIndex,
        };

        await editWord(newWord).unwrap();
        toast.success("Word Saved");
        setViewEdit(false);
      } catch (err) {
        toast.error("Server Error");
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
    <div className="form-container">
      <form onSubmit={handleSubmit} onReset={handleReset}>
        <h2>Edit Word</h2>
        <div>
          <div className="field max-w-[25%]">
            <label htmlFor="edit_sortIndex" className="field__label">
              Sort Index
            </label>
            <input
              type="text"
              id="edit_sortIndex"
              name="edit_sortIndex"
              placeholder={"Sort Index"}
              autoFocus
              value={sortIndex}
              onChange={(e) => {
                setSortIndex(e.target.value);
              }}
              className="field__input"
            />
          </div>
          {/* Word */}
          <div className="field_group">
            {/* First Word */}
            <div className="field">
              <label htmlFor="edit_sortIndex" className="field__label">
                {label_1}
              </label>
              <input
                type="text"
                id="edit_firstWord"
                name="edit_firstWord"
                placeholder={displayBlock?.firstLang || "First Language"}
                autoFocus
                value={first}
                onChange={(e) => {
                  setFirst(e.target.value);
                }}
                className="field__input"
              />
            </div>
            <div className="field">
              <label htmlFor="edit_firstWord_caption" className="field__label">
                First Word Caption
              </label>
              <input
                type="text"
                id="edit_firstWord_caption"
                name="edit_firstWord_caption"
                placeholder="First Word Caption"
                value={firstCaption}
                onChange={(e) => {
                  setFirstCaption(e.target.value);
                }}
                className="field__input"
              />
            </div>
          </div>
          <div className="field_group">
            {/* Second Word */}
            <div className="field">
              <label htmlFor="edit_secondWord" className="field__label">
                {label_2}
              </label>
              <input
                type="text"
                value={second}
                id="edit_secondWord"
                name="edit_secondWord"
                placeholder={displayBlock?.secondLang || "Second Language"}
                onChange={(e) => {
                  setSecond(e.target.value);
                }}
                className="field__input"
              />
            </div>
            <div className="field">
              <label htmlFor="edit_secondWord_caption" className="field__label">
                Second Word Caption
              </label>
              <input
                type="text"
                id="edit_secondWord_caption"
                name="edit_secondWord_caption"
                placeholder="Second Word Caption"
                value={secondCaption}
                onChange={(e) => {
                  setSecondCaption(e.target.value);
                }}
                className="field__input"
              />
            </div>
          </div>
          <div className="field_group">
            {/* Third Word */}
            {languagesCount > 2 ? (
              <div className="field">
                <label htmlFor="edit_thirdWord" className="field__label">
                  {label_3}
                </label>
                <input
                  type="text"
                  id="edit_thirdWord"
                  name="edit_thirdWord"
                  placeholder={displayBlock?.thirdLang || "Third Language"}
                  value={third}
                  onChange={(e) => {
                    setThird(e.target.value);
                  }}
                  className="field__input"
                />
              </div>
            ) : null}
            {/* Fourth Word */}
            {languagesCount > 3 ? (
              <div className="field">
                <label htmlFor="edit_fourthWord" className="field__label">
                  {displayBlock?.fourthLang}:
                </label>
                <input
                  type="text"
                  id="edit_fourthWord"
                  name="edit_fourthWord"
                  value={fourth}
                  placeholder={displayBlock?.fourthLang || "Fourth Language"}
                  onChange={(e) => {
                    setFourth(e.target.value);
                  }}
                  className="field__input"
                />
              </div>
            ) : null}
          </div>
          <div className="form-buttons">
            <button type="submit" className="add">
              Save
            </button>
            <button type="reset" className="cancel">
              Cancel
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default CardWordListEdit;
