import { useState } from "react";
import { CiSquarePlus, CiSquareRemove } from "react-icons/ci";
import { useAddBlockIntroMutation } from "./blockSlice";

export default function LessonIntroAdd({ lesson, setAdd }) {
  const [addBlockIntro, { isLoading }] = useAddBlockIntroMutation();

  const [input, setInput] = useState("");

  const canSave = !isLoading && input !== "";

  const handleSubmit = (e) => {
    e.preventDefault();
    if (canSave) {
      addBlockIntro({ id: lesson?.id, introduction: input });
    }
  };

  const handleReset = () => {
    setAdd(false);
  };

  return (
    <form
      onSubmit={handleSubmit}
      onReset={handleReset}
      className="flex items-center gap-0 flex-1"
    >
      <input
        type="text"
        value={input}
        autoFocus
        required
        title="Introduction"
        placeholder="Introduction"
        onChange={(e) => setInput(e.target.value)}
        className="flex-1"
      />
      <button type="submit">
        <CiSquarePlus size={34} />
      </button>
      <button type="reset">
        <CiSquareRemove size={34} />
      </button>
    </form>
  );
}
