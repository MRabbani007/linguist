import { useState } from "react";
import { useAddSectionMutation } from "./sectionSlice";
import {
  selectDisplayBlock,
  selectDisplayChapter,
} from "../globals/globalsSlice";
import { useSelector } from "react-redux";
import { CiSquarePlus, CiSquareRemove } from "react-icons/ci";

export default function SectionAdd({ setAdd }) {
  const displayBlock = useSelector(selectDisplayBlock);
  const displayChapter = useSelector(selectDisplayChapter);

  const [addSection, { isLoading }] = useAddSectionMutation();

  const [title, setTitle] = useState("");
  const [subtitle, setSubtitle] = useState("");

  const canSave = !isLoading && (title !== "" || subtitle !== "");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (canSave) {
      const section = {
        id: crypto.randomUUID(),
        chapterID: displayChapter?.id,
        lessonID: displayBlock?.id,
        title,
        subtitle,
      };
      addSection(section);
    }
  };

  const handleReset = () => {
    setAdd(false);
  };

  return (
    <form
      onSubmit={handleSubmit}
      onReset={handleReset}
      className="flex items-center gap-2"
    >
      <input
        type="text"
        value={title}
        autoFocus
        required
        title="Section Title"
        placeholder="Section Title"
        onChange={(e) => setTitle(e.target.value)}
      />
      <input
        type="text"
        value={subtitle}
        title="Section SubTitle"
        placeholder="Section SubTitle"
        onChange={(e) => setSubtitle(e.target.value)}
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
