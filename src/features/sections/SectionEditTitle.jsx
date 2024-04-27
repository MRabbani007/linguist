import React, { useState } from "react";
import { useEditSectionHeaderMutation } from "./sectionSlice";
import { CiSquareCheck, CiSquareRemove } from "react-icons/ci";

export default function SectionEditTitle({ section, setEdit }) {
  const [editSectionHeader, { isLoading }] = useEditSectionHeaderMutation();

  const [title, setTitle] = useState(section?.title);
  const [subtitle, setSubtitle] = useState(section?.subtitle);
  const [sectionNo, setSectionNo] = useState(section?.sectionNo);

  const canSave = !isLoading && (title !== "" || subtitle !== "");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (canSave) {
      const newSection = { ...section, sectionNo, title, subtitle };
      await editSectionHeader(newSection);
      setEdit(false);
    }
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
        value={sectionNo}
        title="Number"
        placeholder="Number"
        onChange={(e) => setSectionNo(e.target.value)}
        className="w-[100px]"
      />
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
        <CiSquareCheck size={34} />
      </button>
      <button type="reset">
        <CiSquareRemove size={34} />
      </button>
    </form>
  );
}
