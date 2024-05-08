import { useState } from "react";
import { useAddWordSentenceMutation } from "./wordsSlice";

const CardAddSentence = ({ word, setAddSentence }) => {
  const [addWordSentence, { isLoading }] = useAddWordSentenceMutation();

  const [newSentence, setNewSentence] = useState("");

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
        setAddSentence(false);
      } catch (err) {
        console.error("Failed to save the word", err);
      }
    }
  };

  const handleReset = () => {
    setAddSentence(false);
  };

  return (
    <div className="form-container">
      <form onSubmit={handleSubmit} onReset={handleReset}>
        <h2>Add Sentence</h2>
        <div>
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
          <div className="form-buttons">
            <button type="submit" title="Add" className="add">
              Add
            </button>
            <button type="reset" title="Cancel" className="cancel">
              Cancel
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default CardAddSentence;
