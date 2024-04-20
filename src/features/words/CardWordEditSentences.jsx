import { useEffect, useState } from "react";
import { CiSquareCheck, CiSquareRemove } from "react-icons/ci";
import { useAddWordSentenceMutation } from "./wordsSlice";
import { useSelector } from "react-redux";
import {
  selectDisplayBlock,
  selectLanguagesCount,
} from "../globals/globalsSlice";

const CardWordEditSentences = ({
  word,
  setEditWord,
  addSentence,
  toggleAddSentence,
}) => {
  const [addWordSentence, { isLoading }] = useAddWordSentenceMutation();
  const languagesCount = useSelector(selectLanguagesCount);
  const displayBlock = useSelector(selectDisplayBlock);

  const [sentences, setSentences] = useState(word?.sentences || []);
  const [newSentence, setNewSentence] = useState("");

  const canSave = !isLoading;

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (canSave) {
      try {
        const newWord = {
          ...word,
          sentences: [...sentences, newSentence],
        };

        await addWordSentence(newWord).unwrap();

        // toggleAddSentence();
      } catch (err) {
        console.error("Failed to save the word", err);
      }
    }
  };

  const handleReset = () => {
    toggleAddSentence();
  };

  useEffect(() => {
    setSentences(word?.sentences || []);
  }, [word]);

  return (
    <form
      onSubmit={handleSubmit}
      onReset={handleReset}
      className={
        addSentence
          ? "flex flex-col gap-2 my-2 translate-y-0 duration-200"
          : "invisible h-0 -translate-y-2"
      }
    >
      <h3 className="bg-yellow-500 py-2 px-4 rounded-lg font-semibold">
        Word Sentences
      </h3>
      {/* First Word & First Word Caption */}
      <div className="flex gap-2 items-center">
        {/* First Word */}
        <div className="field">
          <label htmlFor="sentenceInput" className="field__label">
            Enter Sentence
          </label>
          <input
            type="text"
            id="sentenceInput"
            name="sentenceInput"
            placeholder="Enter Sentence"
            autoFocus
            className="field__input"
            value={newSentence}
            onChange={(e) => {
              setNewSentence(e.target.value);
            }}
          />
        </div>
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

export default CardWordEditSentences;
