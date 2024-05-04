import React, { useState } from "react";
import { CiSquareCheck, CiSquareRemove } from "react-icons/ci";
import { useEditTableLessonIDMutation } from "./tablesSlice";

export default function TableEditLessonID({ table, setEdit }) {
  const [editTableLessonID, { isLoading }] = useEditTableLessonIDMutation();

  const [lessonID, setLessonID] = useState(table?.lessonID);
  const [sectionID, setSectionID] = useState(table?.sectionID);

  const canSave = lessonID !== "" && !isLoading;

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (canSave) {
      const newTable = { ...table, lessonID, sectionID };
      await editTableLessonID(newTable);
      alert("Table Modified");
      setEdit(false);
    }
  };

  const handleReset = () => {
    setEdit(false);
  };

  return (
    <div className="form-container">
      <form onSubmit={handleSubmit} onReset={handleReset}>
        <h2>Move Table</h2>
        <div>
          <div className="field">
            <label htmlFor="table_lesson_id" className="field__label">
              Lesson ID
            </label>
            <input
              id="table_lesson_id"
              name="table_lesson_id"
              type="text"
              title="LessonID"
              placeholder="LessonID"
              value={lessonID}
              onChange={(e) => setLessonID(e.target.value)}
              className="field__input"
            />
          </div>
          <div className="field">
            <label htmlFor="table_section_id" className="field__label">
              Section ID
            </label>
            <input
              id="table_section_id"
              name="table_section_id"
              type="text"
              title="SectionID"
              placeholder="SectionID"
              value={sectionID}
              onChange={(e) => setSectionID(e.target.value)}
              className="field__input"
            />
          </div>
          <p className="form-buttons">
            <button type="submit" title="Save" className="add">
              Save
            </button>
            <button type="reset" title="Cancel" className="cancel">
              Cancel
            </button>
          </p>
        </div>
      </form>
    </div>
  );
}
