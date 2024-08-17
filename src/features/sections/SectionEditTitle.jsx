import React, { useState } from "react";
import { useEditSectionHeaderMutation } from "./sectionSlice";
import { CiSquareCheck, CiSquareRemove } from "react-icons/ci";
import { toast } from "react-toastify";
import FormContainer from "../components/FormContainer";

export default function SectionEditTitle({ section, setEdit }) {
  const [editSectionHeader, { isLoading }] = useEditSectionHeaderMutation();

  const [title, setTitle] = useState(section?.title);
  const [subtitle, setSubtitle] = useState(section?.subtitle);
  const [sortIndex, setSortIndex] = useState(section?.sortIndex);

  const canSave = !isLoading && (title !== "" || subtitle !== "");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (canSave) {
      const newSection = { ...section, sortIndex, title, subtitle };
      await editSectionHeader(newSection);
      toast.success("Section Saved");
      setEdit(false);
    }
  };

  console.log(section);

  return (
    <FormContainer
      type="edit"
      title="Edit Section Title"
      submitButton="Save Section"
      onSubmit={handleSubmit}
      closeForm={setEdit}
    >
      <div className="field max-w-[25%]">
        <label htmlFor="section_number" className="field__label">
          Number
        </label>
        <input
          id="section_number"
          name="section_number"
          type="text"
          title="Number"
          placeholder="Number"
          min={0}
          step={1}
          value={sortIndex}
          onChange={(e) => setSortIndex(e.target.value)}
          className="field__input"
        />
      </div>
      <div className="field">
        <label htmlFor="section_title" className="field__label">
          Section Title
        </label>
        <input
          id="section_title"
          name="section_title"
          type="text"
          value={title}
          autoFocus
          required
          title="Section Title"
          placeholder="Section Title"
          onChange={(e) => setTitle(e.target.value)}
          className="field__input"
        />
      </div>
      <div className="field">
        <label htmlFor="section_subtitle" className="field__label">
          Section Sub-Title
        </label>
        <input
          id="section_subtitle"
          name="section_subtitle"
          type="text"
          title="Section SubTitle"
          placeholder="Section SubTitle"
          value={subtitle}
          onChange={(e) => setSubtitle(e.target.value)}
          className="field__input"
        />
      </div>
    </FormContainer>
  );
}
