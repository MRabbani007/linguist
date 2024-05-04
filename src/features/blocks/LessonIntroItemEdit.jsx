import { useState } from "react";
import { CiSquareMinus, CiSquarePlus } from "react-icons/ci";
import { useEditBlockIntroMutation } from "./blockSlice";

export default function LessonIntroItemEdit({ lesson, intro, index, setEdit }) {
  const [editBlockIntro, { isLoading }] = useEditBlockIntroMutation();

  const [input, setInput] = useState(intro);

  const canSave = !isLoading && input !== "";

  const handleSubmit = (e) => {
    e.preventDefault();
    if (canSave) {
      editBlockIntro({ id: lesson?.id, introduction: input, index });
    }
    setEdit(false);
  };

  const handleReset = () => {
    setEdit(false);
  };

  return (
    <div className="form-container">
      <form onSubmit={handleSubmit} onReset={handleReset}>
        <h2>Edit Introduction Item</h2>
        <div>
          <div className="field">
            <input
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
  );
}
