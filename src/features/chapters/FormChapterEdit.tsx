import React, {
  ChangeEvent,
  Dispatch,
  FormEvent,
  SetStateAction,
  useState,
} from "react";
import {
  useEditChapterMutation,
  useRemoveChapterMutation,
} from "./chapterSlice";
import { toast } from "react-toastify";
import FormContainer from "../components/FormContainer";
import { T_CHAPTER } from "../../data/templates";
import InputField from "../ui/InputField";

export default function FormChapterEdit({
  chapter,
  setEdit,
}: {
  chapter: Chapter;
  setEdit: Dispatch<SetStateAction<boolean>>;
}) {
  const [editChapter, { isLoading }] = useEditChapterMutation();
  const [removeChapter] = useRemoveChapterMutation();

  const [state, setState] = useState({ ...T_CHAPTER, ...chapter });

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
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
      try {
        const response = await editChapter(state).unwrap();
        toast.success("Chapter saved");
        setEdit(false);
      } catch (err) {
        toast.error("Failed to save the chapter");
      }
    }
  };

  const handleDelete = async () => {
    try {
      if (confirm("Delete this Chapter?")) {
        await removeChapter(chapter.id).unwrap();
      }
    } catch (err) {
      console.error("Failed to delete the chapter", err);
    }
  };

  return (
    <FormContainer
      title="Edit Chapter"
      type="edit"
      submitButton="Save Chapter"
      deleteButton={true}
      onDelete={handleDelete}
      onSubmit={handleSubmit}
      closeForm={setEdit}
    >
      <InputField
        label="Chapter Number"
        name="chapterNo"
        type="number"
        value={state.chapterNo}
        handleChange={handleChange}
      />
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
      <InputField
        label="Level"
        name="level"
        type="text"
        value={state.level}
        handleChange={handleChange}
      />
      <InputField
        label="Learning Time"
        name="learningTime"
        type="number"
        value={state.learningTime}
        handleChange={handleChange}
      />
    </FormContainer>
  );
}
