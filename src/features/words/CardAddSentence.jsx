import { useState } from "react";
import { useAddWordSentenceMutation } from "./wordsSlice";
import { toast } from "react-toastify";

const CardAddSentence = ({ word, setAddSentence }) => {
  const [addWordSentence, { isLoading }] = useAddWordSentenceMutation();

  const [newSentence, setNewSentence] = useState("");
  const [newTranslation, setNewTranslation] = useState("");

  const canSave = !isLoading;

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (canSave) {
      try {
        const sentenceData = {
          id: word?.id,
          sentence: newSentence,
          translation: newTranslation,
        };

        await addWordSentence(sentenceData).unwrap();
        toast.success("Sentence Added");
        // setAddSentence(false);
      } catch (err) {
        toast.error("Error");
        // console.error("Failed to save the word", err);
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
          <div className="field w-full">
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
          <div className="field w-full">
            <label htmlFor="translationInput" className="field__label">
              Enter translation
            </label>
            <input
              type="text"
              id="translationInput"
              name="translationInput"
              placeholder="Enter translation"
              className="field__input"
              value={newTranslation}
              onChange={(e) => {
                setNewTranslation(e.target.value);
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
