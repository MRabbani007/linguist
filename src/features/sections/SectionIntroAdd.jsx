import { useState } from "react";
import { useAddSectionIntroMutation } from "./sectionSlice";
import { toast } from "react-toastify";
import FormContainer from "../components/FormContainer";

export default function SectionIntroAdd({ section, setAdd }) {
  const [addSectionIntro, { isLoading }] = useAddSectionIntroMutation();

  const [input, setInput] = useState("");

  const canSave = !isLoading && input !== "";

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (canSave) {
      const response = await addSectionIntro({
        id: section?.id,
        introduction: input,
      });
      if (response?.data) {
        toast.success("Intro item added");
        setAdd(false);
      } else {
        toast.error("Failed to add introduction item");
      }
    }
  };

  return (
    <FormContainer
      type="add"
      title="Add Section Introduction"
      submitButton="Add Intro Item"
      onSubmit={handleSubmit}
      closeForm={setAdd}
    >
      <div className="field">
        <label htmlFor="introduction" className="field__label">
          Introduction
        </label>
        <textarea
          id="introduction"
          name="introduction"
          autoFocus
          className="field__input line-clamp-2 min-h-32"
          title="Introduction"
          placeholder="Introduction"
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
      </div>
    </FormContainer>
  );
}
