import { useState } from "react";
import { CiSquareMinus, CiSquarePlus } from "react-icons/ci";
import {
  useDeleteBlockIntroMutation,
  useEditBlockIntroMutation,
} from "./blockSlice";
import { toast } from "react-toastify";

export default function LessonIntroItemEdit({ lesson, intro, index, setEdit }) {
  const [editBlockIntro, { isLoading: isLoadingEdit }] =
    useEditBlockIntroMutation();
  const [deleteLessonIntro, { isLoading: isLoadingDelete }] =
    useDeleteBlockIntroMutation();

  console.log(lesson);
  const [input, setInput] = useState(intro);

  const canSaveEdit = !isLoadingEdit && input !== "";

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (canSaveEdit) {
      await editBlockIntro({ id: lesson?.id, introduction: input, index });
      toast.success("Lesson intro item saved");
      setEdit(false);
    }
  };

  const handleReset = () => {
    setEdit(false);
  };

  const handleDelete = async () => {
    if (confirm("Delete Intro Item")) {
      await deleteLessonIntro({ id: lesson.id, index });
      toast.success("Intro Item Deleted");
      setEdit(false);
    }
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
            <button
              type="submit"
              title="Delete"
              className="delete"
              onClick={handleDelete}
            >
              Delete
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}
