import { Dispatch, FormEvent, SetStateAction, useState } from "react";
import { toast } from "react-toastify";
import FormContainer from "../../components/FormContainer";
import { useAddLessonIntroMutation } from "./lessonSlice";

export default function LessonIntroAdd({
  lesson,
  setAdd,
}: {
  lesson: Lesson;
  setAdd: Dispatch<SetStateAction<boolean>>;
}) {
  const [addBlockIntro, { isLoading }] = useAddLessonIntroMutation();

  const [input, setInput] = useState("");

  const canSave = !isLoading && input !== "";

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    if (canSave) {
      await addBlockIntro({ id: lesson?.id, introduction: input });
      toast.success("Introduction item Added");
    }
  };

  return (
    <FormContainer
      title="Add Lesson Introduction"
      type="add"
      submitButton="Add Intro"
      onSubmit={handleSubmit}
      closeForm={setAdd}
    >
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
    </FormContainer>
  );
}
