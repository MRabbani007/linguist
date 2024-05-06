import { useState } from "react";
import { CiSquarePlus, CiSquareRemove } from "react-icons/ci";
import { useAddBlockIntroMutation } from "./blockSlice";

export default function LessonIntroAdd({ lesson, setAdd }) {
  const [addBlockIntro, { isLoading }] = useAddBlockIntroMutation();

  const [input, setInput] = useState("");

  const canSave = !isLoading && input !== "";

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (canSave) {
      await addBlockIntro({ id: lesson?.id, introduction: input });
      alert("Introduction item Added");
    }
  };

  const handleReset = () => {
    setAdd(false);
  };

  return (
    <div className="form-container">
      <form onSubmit={handleSubmit} onReset={handleReset}>
        <h2>Add Lesson Introduction</h2>
        <div>
          <div className="field w-full">
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
          <p className="form-buttons">
            <button type="submit" title="Add" className="add">
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
