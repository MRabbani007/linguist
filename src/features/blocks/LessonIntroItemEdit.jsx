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
    <form
      onSubmit={handleSubmit}
      onReset={handleReset}
      className="flex items-center gap-2"
    >
      <input
        type="text"
        value={input}
        autoFocus
        required
        title="Introduction"
        placeholder="Introduction"
        onChange={(e) => setInput(e.target.value)}
      />
      <button type="submit">
        <CiSquarePlus size={34} />
      </button>
      <button type="reset">
        <CiSquareMinus size={34} />
      </button>
    </form>
  );
}
