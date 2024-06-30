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
      await editSectionIntro({ id: section?.id, introduction: input, index });
      toast.success("Intro item saved");
      setEdit(false);
    }
  };

  const handleDelete = async () => {
    if (confirm("Delete Intro Item")) {
      await deleteSectionIntro({ id: section.id, index });
      toast.success("Intro item deleted");
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
        <label htmlFor="edit_intro_item" className="field__label">
          Introduction
        </label>
        <input
          id="edit_intro_item"
          name="edit_intro_item"
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
