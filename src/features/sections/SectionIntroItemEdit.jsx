import { useState } from "react";
import { CiSquareMinus, CiSquarePlus } from "react-icons/ci";
import {
  useDeleteSectionIntroMutation,
  useEditSectionIntroMutation,
} from "./sectionSlice";
import { toast } from "react-toastify";
import FormContainer from "../components/FormContainer";

export default function SectionIntroItemEdit({
  section,
  intro,
  index,
  setEdit,
}) {
  const [editSectionIntro, { isLoading }] = useEditSectionIntroMutation();
  const [deleteSectionIntro] = useDeleteSectionIntroMutation();

  const [input, setInput] = useState(intro);

  const canSave = !isLoading && input !== "";

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (canSave) {
      const response = await editSectionIntro({
        id: section?.id,
        introduction: input,
        index,
      });
      if (response?.data) {
        toast.success("Intro item saved");
        setEdit(false);
      } else {
        toast.error("Failed to save introduction item");
      }
    }
  };

  const handleDelete = async () => {
    if (confirm("Delete Intro Item")) {
      const response = await deleteSectionIntro({ id: section.id, index });

      if (response?.data) {
        toast.success("Intro item deleted");
        setEdit(false);
      } else {
        toast.error("Failed to delete introduction item");
      }
    }
  };

  return (
    <FormContainer
      type="edit"
      title="Edit Section Intro"
      deleteButton={true}
      onSubmit={handleSubmit}
      onDelete={handleDelete}
      closeForm={setEdit}
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
