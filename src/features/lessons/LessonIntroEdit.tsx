import { Dispatch, FormEvent, SetStateAction, useState } from "react";
import { toast } from "react-toastify";
import FormContainer from "../../components/FormContainer";
import {
  useDeleteLessonIntroMutation,
  useEditLessonIntroMutation,
} from "./lessonSlice";

export default function LessonIntroEdit({
  lesson,
  intro,
  index,
  setEdit,
}: {
  lesson: Lesson;
  intro: string;
  index: number;
  setEdit: Dispatch<SetStateAction<boolean>>;
}) {
  const [editBlockIntro] = useEditLessonIntroMutation();
  const [deleteLessonIntro] = useDeleteLessonIntroMutation();

  const [input, setInput] = useState(intro);

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();

    await editBlockIntro({ id: lesson?.id, introduction: input, index });
    toast.success("Lesson intro item saved");
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
      closeForm={setEdit}
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
