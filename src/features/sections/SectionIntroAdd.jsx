import { useState } from "react";
import { CiSquareMinus, CiSquarePlus } from "react-icons/ci";
import { useAddSectionIntroMutation } from "./sectionSlice";

export default function SectionIntroAdd({ section, setAdd }) {
  const [addSectionIntro, { isLoading }] = useAddSectionIntroMutation();

  const [input, setInput] = useState("");

  const canSave = !isLoading && input !== "";

  const handleSubmit = (e) => {
    e.preventDefault();
    if (canSave) {
      addSectionIntro({ id: section?.id, introduction: input });
      setAdd(false);
    }
  };

  const handleReset = () => {
    setAdd(false);
  };

  return (
    <form
      onSubmit={handleSubmit}
      onReset={handleReset}
      className="flex items-center gap-2 flex-1"
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
        <CiSquareMinus size={34} />
      </button>
    </form>
  );
}
