import { useState } from "react";
import { CiSquarePlus, CiSquareRemove } from "react-icons/ci";
import { useAddBlockIntroMutation } from "./blockSlice";
import { toast } from "react-toastify";
import FormContainer from "../components/FormContainer";

export default function LessonIntroAdd({ lesson, setAdd }) {
  const [addBlockIntro, { isLoading }] = useAddBlockIntroMutation();

  const [input, setInput] = useState("");

  const canSave = !isLoading && input !== "";

  const handleSubmit = async (e) => {
    e.preventDefault();
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
