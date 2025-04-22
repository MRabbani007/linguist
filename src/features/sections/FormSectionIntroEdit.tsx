import { Dispatch, FormEvent, SetStateAction, useState } from "react";
import {
  useDeleteSectionIntroMutation,
  useEditSectionIntroMutation,
} from "./sectionSlice";
import { toast } from "react-toastify";
import FormContainer from "../../components/FormContainer";

export default function FormSectionIntroEdit({
  sectionID,
  introItem,
  index,
  setEdit,
}: {
  sectionID: string;
  introItem: string;
  index: number;
  setEdit: Dispatch<SetStateAction<boolean>>;
}) {
  const [editSectionIntro] = useEditSectionIntroMutation();
  const [deleteSectionIntro] = useDeleteSectionIntroMutation();

  const [input, setInput] = useState(introItem);

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();

    try {
      await editSectionIntro({
        id: sectionID,
        introduction: input,
        index,
      });
      toast.success("Intro item saved");
      setEdit(false);
    } catch (error) {
      toast.error("Failed to save introduction item");
    }
  };

  const handleDelete = async () => {
    if (!confirm("Delete Intro Item")) {
      return null;
    }

    try {
      await deleteSectionIntro({ id: sectionID, index });

      toast.success("Intro item deleted");
      setEdit(false);
    } catch (error) {
      toast.error("Failed to delete introduction item");
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
