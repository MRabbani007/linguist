import React, {
  ChangeEvent,
  Dispatch,
  FormEvent,
  SetStateAction,
  useState,
} from "react";
import {
  useEditSectionHeaderMutation,
  useRemoveSectionMutation,
} from "./sectionSlice";
import { toast } from "react-toastify";
import FormContainer from "../components/FormContainer";
import { Section } from "../../types/types";

interface Props {
  section: Section;
  setEdit: Dispatch<SetStateAction<boolean>>;
}

export default function SectionEdit({ section, setEdit }: Props) {
  const [editSectionHeader, { isLoading }] = useEditSectionHeaderMutation();
  const [removeSection] = useRemoveSectionMutation();

  const [state, setState] = useState(section);

  const onChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setState((prevProps) => ({
      ...prevProps,
      [name]: value,
    }));
  };

  const canSave = !isLoading;

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    if (canSave) {
      await editSectionHeader(state);
      toast.success("Section Saved");
      setEdit(false);
    }
  };

  const handleDelete = async () => {
    if (confirm("Delete this section?")) {
      await removeSection(section?.id);
      toast.success("Section Deleted");
    }
  };

  return (
    <FormContainer
      type="edit"
      title="Edit Section Title"
      submitButton="Save Section"
      deleteButton={true}
      onSubmit={handleSubmit}
      onDelete={handleDelete}
      closeForm={setEdit}
    >
      <div className="field__row">
        <label htmlFor="sortIndex" className="field__label">
          Number
        </label>
        <input
          id="sortIndex"
          name="sortIndex"
          type="text"
          title="Number"
          placeholder="Number"
          step={1}
          value={state?.sortIndex}
          onChange={onChange}
          className="field__input__row"
        />
      </div>
      <div className="field__row">
        <label htmlFor="title" className="field__label">
          Section Title
        </label>
        <input
          id="title"
          name="title"
          type="text"
          autoFocus
          required
          title="Section Title"
          placeholder="Section Title"
          value={state?.title || ""}
          onChange={onChange}
          className="field__input__row"
        />
      </div>
      <div className="field__row">
        <label htmlFor="subtitle" className="field__label">
          Section Sub-Title
        </label>
        <input
          id="subtitle"
          name="subtitle"
          type="text"
          title="Section SubTitle"
          placeholder="Section SubTitle"
          value={state?.subtitle || ""}
          onChange={onChange}
          className="field__input__row"
        />
      </div>
    </FormContainer>
  );
}
