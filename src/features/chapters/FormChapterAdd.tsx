import React, { ChangeEvent, Dispatch, SetStateAction, useState } from "react";
import { useAddChapterMutation } from "./chapterSlice";
import { useSelector } from "react-redux";
import { selectLanguage } from "../globals/globalsSlice";
import { toast } from "react-toastify";
import FormContainer from "../components/FormContainer";
import InputField from "../ui/InputField";
import { T_CHAPTER } from "../../data/templates";

export default function FormChapterAdd({
  setAdd,
}: {
  setAdd: Dispatch<SetStateAction<boolean>>;
}) {
  const language = useSelector(selectLanguage);
  const [addChapter, { isLoading }] = useAddChapterMutation();

  const [state, setState] = useState(T_CHAPTER);

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setState((prevProps) => ({
      ...prevProps,
      [name]: value,
    }));
  };

  const canSave = !isLoading; //[title, subtitle, detail].every(Boolean) &&

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (canSave) {
      try {
        await addChapter({
          ...state,
          id: crypto.randomUUID(),
          langID: language?.id,
        }).unwrap();
        toast.success("Chapter Added");
        setAdd(false);
      } catch (err) {
        toast.error("Failed to add the chapter");
      }
    }
  };

  return (
    <FormContainer
      title="Add Chapter"
      type="add"
      submitButton="Add Chapter"
      onSubmit={handleSubmit}
      closeForm={setAdd}
    >
      <InputField
        label="Chapter Title"
        name="title"
        type="text"
        value={state.title}
        handleChange={handleChange}
      />
      <InputField
        label="Chapter Subtitle"
        name="subtitle"
        type="text"
        value={state.subtitle}
        handleChange={handleChange}
      />
      <InputField
        label="Chapter Detail"
        name="detail"
        type="text"
        value={state.detail}
        handleChange={handleChange}
      />
    </FormContainer>
  );
}
