import React, { useState } from "react";
import { useSelector } from "react-redux";
import { selectDisplayBlock } from "../globals/globalsSlice";
import { useAddSentenceMutation } from "./sentencesSlice";
import { toast } from "react-toastify";

export default function FormSentenceAdd({ sectionID = "", setAdd = () => {} }) {
  const displayBlock = useSelector(selectDisplayBlock);
  const [addSentence, { isLoading }] = useAddSentenceMutation();

  const [sortIndex, setSortIndex] = useState(9);
  const [text, setText] = useState("");
  const [translation, setTranslation] = useState("");
  const [pronunce, setPronunce] = useState("");

  const canSave = !isLoading && !isNaN(sortIndex) && sortIndex >= 0;

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (canSave) {
      try {
        const sentence = {
          id: crypto.randomUUID(),
          chapterID: displayBlock?.chapterID,
          lessonID: displayBlock?.id,
          sectionID: sectionID || "",
          text,
          translation,
          pronunce,
          sortIndex,
        };
        await addSentence(sentence);
        toast.success("Sentence Added");
        // setAdd(false);
      } catch (e) {
        toast.error("Server Error");
      }
    }
  };

  const handleReset = () => {
    setAdd(false);
  };

  return (
    <div className="form-container">
      <form onSubmit={handleSubmit} onReset={handleReset}>
        <h2>Add New Sentence</h2>
        <div>
          <div className="field max-w-[25%]">
            <label htmlFor="sentence_number" className="field__label">
              Number
            </label>
            <input
              id="sentence_number"
              name="sentence_number"
              type="number"
              title="Number"
              placeholder="Number"
              min={0}
              step={1}
              value={sortIndex}
              onChange={(e) => setSortIndex(e.target.value)}
              className="field__input"
            />
          </div>
          <div className="field">
            <label htmlFor="sentence_text" className="field__label">
              Sentence
            </label>
            <input
              id="sentence_text"
              name="sentence_text"
              type="text"
              autoFocus
              title="Sentence"
              placeholder="Sentence"
              value={text}
              onChange={(e) => setText(e.target.value)}
              className="field__input"
            />
          </div>
          <div className="field">
            <label htmlFor="sentence_translation" className="field__label">
              Translation
            </label>
            <input
              id="sentence_translation"
              name="sentence_translation"
              type="text"
              title="Translation"
              placeholder="Translation"
              value={translation}
              onChange={(e) => setTranslation(e.target.value)}
              className="field__input"
            />
          </div>
          <div className="field">
            <label htmlFor="sentence_pronunce" className="field__label">
              Pronunce
            </label>
            <input
              id="sentence_pronunce"
              name="sentence_pronunce"
              type="text"
              title="Pronunce"
              placeholder="Pronunce"
              value={pronunce}
              onChange={(e) => setPronunce(e.target.value)}
              className="field__input"
            />
          </div>
          <div className="form-buttons">
            <button type="submit" title="Add" className="add">
              Add Sentence
            </button>
            <button type="reset" title="Cancel" className="cancel">
              Cancel
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}
