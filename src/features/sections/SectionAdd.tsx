import React, {
  ChangeEvent,
  Dispatch,
  FormEvent,
  SetStateAction,
  useState,
} from "react";
import { useAddSectionMutation } from "./sectionSlice";
import {
  selectDisplayBlock,
  selectDisplayChapter,
} from "../globals/globalsSlice";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import FormContainer from "../components/FormContainer";

const template: Section = {
  id: "",
  chapterID: "",
  lessonID: "",
  title: "",
  subtitle: "",
  sortIndex: 1,
  sectionNo: 1,
};

interface Props {
  setAdd: Dispatch<SetStateAction<boolean>>;
}

export default function SectionAdd({ setAdd }: Props) {
  const displayBlock = useSelector(selectDisplayBlock);
  const displayChapter = useSelector(selectDisplayChapter);

  const [state, setState] = useState(template);

  const onChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setState((prevProps) => ({
      ...prevProps,
      [name]: value,
    }));
  };

  const [addSection, { isLoading }] = useAddSectionMutation();

  const canSave = !isLoading;

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    if (canSave) {
      try {
        await addSection({
          ...state,
          id: crypto.randomUUID(),
          chapterID: displayChapter?.id,
          lessonID: displayBlock?.id,
        });
        toast.success("Section Added");
        setAdd(false);
      } catch (e) {
        toast.error("Server Error");
      }
    }
  };

  return (
    <FormContainer
      title="Add Section"
      type="add"
      submitButton="Add Section"
      onSubmit={handleSubmit}
      closeForm={setAdd}
    >
      <div className="field__row">
        <label htmlFor="sortIndex" className="field__label">
          Number
        </label>
        <input
          id="sortIndex"
          name="sortIndex"
          type="number"
          title="Number"
          placeholder="Number"
          autoComplete="off"
          value={state?.sortIndex || 1}
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
          title="Section Sub-Title"
          placeholder="Section Sub-Title"
          value={state?.subtitle ?? ""}
          onChange={onChange}
          className="field__input__row"
        />
      </div>
    </FormContainer>
  );
}
