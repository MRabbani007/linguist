import React, { useState } from "react";
import { CiEdit, CiSquareCheck, CiSquareRemove } from "react-icons/ci";
import {
  useDeleteWordSentenceMutation,
  useEditWordSentenceMutation,
} from "./wordsSlice";
import { useSelector } from "react-redux";
import { selectEditMode } from "../globals/globalsSlice";

const CardSentence = ({ word, sentence, index }) => {
  const editMode = useSelector(selectEditMode);

  const [edit, setEdit] = useState(false);
  const [editWordSentence] = useEditWordSentenceMutation();
  const [deleteWordSentece] = useDeleteWordSentenceMutation();

  const [newSentence, setNewSentence] = useState(sentence || "");

  const handleSubmit = (e) => {
    e.preventDefault();
    editWordSentence({ id: word.id, sentence: newSentence, index });
  };

  const handleReset = () => {
    setEdit(false);
  };

  const handleDelete = () => {
    if (confirm("Delete this Sentence?")) {
      deleteWordSentece({ id: word.id, sentence, index });
    }
  };

  return (
    <div className="group">
      <span>
        {edit ? (
          <div className="form-container">
            <form onSubmit={handleSubmit} onReset={handleReset}>
              <h2>Edit Sentence</h2>
              <div>
                <div className="field">
                  <label htmlFor="edit_sentence" className="field__label">
                    Sentence
                  </label>
                  <input
                    id="edit_sentence"
                    name="edit_sentence"
                    title="Sentence"
                    placeholder="Sentence"
                    value={newSentence}
                    onChange={(e) => setNewSentence(e.target.value)}
                    className="field__input"
                  />
                </div>
                <div className="form-buttons">
                  <button type="submit" title="Save" className="add">
                    Save
                  </button>
                  <button type="reset" title="Cancel" className="cancel">
                    Cancel
                  </button>
                </div>
              </div>
            </form>
          </div>
        ) : (
          sentence
        )}
      </span>
      {editMode && (
        <span className="invisible group-hover:visible">
          <CiEdit className="icon" onClick={() => setEdit(true)} />
          <CiSquareRemove className="icon" onClick={handleDelete} />
        </span>
      )}
    </div>
  );
};

export default CardSentence;
