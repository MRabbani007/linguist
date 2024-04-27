import { useState } from "react";
import { CiSquareMinus, CiSquarePlus } from "react-icons/ci";
import { useEditSectionIntroMutation } from "./sectionSlice";

export default function SectionIntroItemEdit({
  section,
  intro,
  index,
  setEdit,
}) {
  const [editSectionIntro, { isLoading }] = useEditSectionIntroMutation();

  const [input, setInput] = useState(intro);

  const canSave = !isLoading && input !== "";

  const handleSubmit = (e) => {
    e.preventDefault();
    if (canSave) {
      editSectionIntro({ id: section?.id, introduction: input, index });
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
