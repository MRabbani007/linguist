import { useState } from "react";
import { CiSquareMinus, CiSquarePlus } from "react-icons/ci";
import { useEditSectionIntroMutation } from "./sectionSlice";

export default function SectionIntroItemEdit({
  section,
  intro,
  index,
  setEdit,
}) {
  const [editSectionIntro, { isLoading }] = useEditSectionIntroMutation();

  const [input, setInput] = useState(intro);

  const canSave = !isLoading && input !== "";

  const handleSubmit = (e) => {
    e.preventDefault();
    if (canSave) {
      editSectionIntro({ id: section?.id, introduction: input, index });
    }
    setEdit(false);
  };

  const handleReset = () => {
    setEdit(false);
  };

  return (
    <div className="form-container">
      <form onSubmit={handleSubmit} onReset={handleReset}>
        <div>
          <div className="field">
            <label htmlFor="edit_intro_item" className="field__label">
              Introduction
            </label>
            <input
              id="edit_intro_item"
              name="edit_intro_item"
              type="text"
              value={input}
              autoFocus
              required
              title="Introduction"
              placeholder="Introduction"
              onChange={(e) => setInput(e.target.value)}
              className="field__input"
            />
          </div>
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
}
