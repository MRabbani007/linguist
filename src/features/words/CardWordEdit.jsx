import { useEffect, useState } from "react";
import { CiSquareCheck, CiSquareRemove } from "react-icons/ci";
import { useEditWordDetailsMutation, useEditWordMutation } from "./wordsSlice";

const CardWordEdit = ({ word, colSpan, setEditWord }) => {
  const [editWord, { isLoading }] = useEditWordMutation();

  const [first, setFirst] = useState(word?.first || "");
  const [second, setSecond] = useState(word?.second || "");
  const [third, setThird] = useState(word?.third || "");
  const [fourth, setFourth] = useState(word?.fourth || "");

  const canSave = !isLoading;

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (canSave) {
      try {
        const newWord = { ...word, first, second, third, fourth };

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
  }, [word]);

  return (
    <form
      onSubmit={handleSubmit}
      onReset={handleReset}
      className="flex flex-col gap-2"
    >
      <h3 className="bg-yellow-500 py-2 px-4 rounded-lg font-semibold">
        Edit Word
      </h3>
      <div className="flex gap-2 items-center">
        <div className="field">
          <label htmlFor="edit_firstword" className="field__label">
            First Lang
          </label>
          <input
            type="text"
            id="edit_firstWord"
            name="edit_firstWord"
            placeholder="First Lang"
            autoFocus
            className="field__input"
            value={first}
            onChange={(e) => {
              setFirst(e.target.value);
            }}
          />
        </div>
        <div className="field">
          <label htmlFor="edit_secondWord" className="field__label">
            Second Lang
          </label>
          <input
            type="text"
            value={second}
            id="edit_secondWord"
            name="edit_secondWord"
            className="field__input"
            placeholder="Second Word"
            onChange={(e) => {
              setSecond(e.target.value);
            }}
          />
        </div>
      </div>
      <div className="flex gap-2 items-center">
        {colSpan > 4 ? (
          <div className="field">
            <label htmlFor="edit_thirdWord" className="field__label">
              Third Lang
            </label>
            <input
              type="text"
              id="edit_thirdWord"
              name="edit_thirdWord"
              placeholder="Third Lang"
              className="field__input"
              value={third}
              onChange={(e) => {
                setThird(e.target.value);
              }}
            />
          </div>
        ) : null}
        {colSpan > 5 ? (
          <div className="field">
            <label htmlFor="edit_fourthWord" className="field__label">
              Fourth Lang
            </label>
            <input
              type="text"
              id="edit_fourthWord"
              name="edit_fourthWord"
              className="field__input"
              value={fourth}
              placeholder="Fourth Lang"
              onChange={(e) => {
                setFourth(e.target.value);
              }}
            />
          </div>
        ) : null}
      </div>
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
