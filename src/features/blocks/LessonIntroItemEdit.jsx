import { useState } from "react";
import { CiSquareMinus, CiSquarePlus } from "react-icons/ci";
import {
  useDeleteBlockIntroMutation,
  useEditBlockIntroMutation,
} from "./blockSlice";
import { toast } from "react-toastify";
import FormContainer from "../components/FormContainer";

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
    <FormContainer
      title="Edit Introduction Item"
      type="edit"
      deleteButton={true}
      onDelete={handleDelete}
      onSubmit={handleSubmit}
    >
      <div className="field">
        <label htmlFor="introduction">Intro Item</label>
        <input
          type="text"
          id="introduction"
          name="introduction"
          title="Introduction"
          placeholder="Introduction"
          autoFocus
          required
          value={input}
          onChange={(e) => setInput(e.target.value)}
          className="field__input"
        />
      </div>
    </FormContainer>
  );
}
