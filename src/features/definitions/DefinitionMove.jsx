import React, { useState } from "react";
import { CiSquareCheck, CiSquareRemove } from "react-icons/ci";
import { useEditDefinitionLessonIDMutation } from "./definitionsSlice";
import { toast } from "react-toastify";

export default function DefinitionMove({ definition, setMove }) {
  const [editDefinitionLessonID, { isLoading }] =
    useEditDefinitionLessonIDMutation();

  const [lessonID, setLessonID] = useState(definition?.lessonID);
  const [sectionID, setSectionID] = useState(definition?.sectionID);

  const canSave = lessonID !== "" && !isLoading;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (canSave) {
      const newDefinition = { ...definition, lessonID, sectionID };
      editDefinitionLessonID(newDefinition);
      toast.success("Definition Modified");
      setMove(false);
    }
  };

  const handleReset = () => {
    setMove(false);
  };

  return (
    <div className="form-container">
      <form onSubmit={handleSubmit} onReset={handleReset}>
        <h2>Move Definition</h2>
        <div>
          <div className="field">
            <label htmlFor="LessonID" className="field__label">
              Lesson ID
            </label>
            <input
              type="text"
              title="LessonID"
              id="LessonID"
              placeholder="LessonID"
              value={lessonID}
              onChange={(e) => setLessonID(e.target.value)}
              className="field__input"
            />
          </div>
          <div className="field">
            <label htmlFor="SectionID" className="field__label">
              Section ID
            </label>
            <input
              type="text"
              title="SectionID"
              id="SectionID"
              placeholder="SectionID"
              value={sectionID}
              onChange={(e) => setSectionID(e.target.value)}
              className="field__input"
            />
          </div>
          <p className="form-buttons">
            <button type="submit" className="add">
              Save
            </button>
            <button type="reset" className="cancel">
              Cancel
            </button>
          </p>
        </div>
      </form>
    </div>
  );
}
