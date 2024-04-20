import { useState } from "react";
import {
  CiSquareCheck,
  CiSquareMinus,
  CiSquarePlus,
  CiSquareRemove,
} from "react-icons/ci";
import { useAddWordSentenceMutation } from "./wordsSlice";

const CardAddSentence = ({ word }) => {
  const [addWordSentence, { isLoading }] = useAddWordSentenceMutation();

  const [newSentence, setNewSentence] = useState("");
  const [addSentence, setAddSentence] = useState(false);

  const toggleAddSentence = () => {
    setAddSentence(!addSentence);
  };

  const canSave = !isLoading;

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (canSave) {
      try {
        const sentenceData = {
          id: word?.id,
          sentence: newSentence,
        };

        await addWordSentence(sentenceData).unwrap();
      } catch (err) {
        console.error("Failed to save the word", err);
      }
    }
  };

  const handleReset = () => {
    toggleAddSentence();
  };

  return (
    <div>
      <button onClick={toggleAddSentence}>
        {addSentence ? (
          <CiSquareMinus className="icon" />
        ) : (
          <CiSquarePlus className="icon" />
        )}
      </button>
      <form
        onSubmit={handleSubmit}
        onReset={handleReset}
        className={
          addSentence
            ? "flex flex-row gap-2 my-2 translate-y-0 duration-200"
            : "invisible h-0 -translate-y-2"
        }
      >
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
        {/* Form Buttons */}
        <div className="flex justify-center items-center my-1">
          <button type="submit">
            <CiSquareCheck className="icon" />
          </button>
          <button type="reset">
            <CiSquareRemove className="icon" />
          </button>
        </div>
      </form>
    </div>
  );
};

export default CardAddSentence;
