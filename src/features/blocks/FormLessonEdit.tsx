import React, { Dispatch, FormEvent, SetStateAction, useState } from "react";
import {
  useEditBlockHeaderMutation,
  useRemoveBlockMutation,
} from "./blockSlice";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import FormContainer from "../components/FormContainer";
import { selectChapters } from "../globals/globalsSlice";
import { T_LESSON } from "../../data/templates";
import InputField from "../ui/InputField";

export default function FormLessonEdit({
  lesson,
  setEdit,
}: {
  lesson: Lesson;
  setEdit: Dispatch<SetStateAction<boolean>>;
}) {
  const chapters = useSelector(selectChapters);
  const [editBlockHeader, { isLoading }] = useEditBlockHeaderMutation();
  const [removeBlock] = useRemoveBlockMutation();

  const [state, setState] = useState({ ...T_LESSON, ...lesson });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setState((prevProps) => ({
      ...prevProps,
      [name]: value,
    }));
  };

  const canSave = !isLoading; //[title, subtitle, detail].every(Boolean) &&

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();

    if (canSave) {
      try {
        const response = await editBlockHeader(state).unwrap();

        if (response) {
          toast.success("Lesson Saved");
          setEdit(false);
        } else {
          toast.error("Failed to save the Lesson");
        }
      } catch (err) {
        toast.error("Error: Failed to save the Lesson");
      }
    }
  };

  const handleDelete = async () => {
    try {
      if (confirm("Delete this block?")) {
        await removeBlock(lesson?.id).unwrap();
      }
    } catch (err) {
      console.error("Failed to delete this lesson", err);
    }
  };

  const menuOptions =
    Array.isArray(chapters) &&
    chapters.map((item, index) => {
      return (
        <option value={item?.id} key={index}>
          {item?.title}
        </option>
      );
    });

  return (
    <FormContainer
      type="edit"
      title="Edit Lesson"
      deleteButton={true}
      onDelete={handleDelete}
      onSubmit={handleSubmit}
      closeForm={setEdit}
    >
      <InputField
        label="Lesson Number"
        name="lessonNo"
        type="number"
        value={state.lessonNo}
        handleChange={handleChange}
      />
      <InputField
        label="Sort Index"
        name="sortIndex"
        type="number"
        value={state.sortIndex}
        handleChange={handleChange}
      />
      <InputField
        label="Lesson Title"
        name="title"
        type="text"
        value={state.title}
        handleChange={handleChange}
      />
      <InputField
        label="Lesson SubTitle"
        name="subtitle"
        type="text"
        value={state.subtitle}
        handleChange={handleChange}
      />
      <InputField
        label="Lesson Detail"
        name="detail"
        type="text"
        value={state.detail}
        handleChange={handleChange}
      />
      <div className="field">
        <label htmlFor="chapterID" className="field__label">
          Chapter ID
        </label>
        <select
          id="chapterID"
          name="chapterID"
          value={state?.chapterID}
          onChange={handleChange}
          className="field__input"
        >
          <option value="">Select Chapter</option>
          {menuOptions}
        </select>
      </div>
      <InputField
        label="First Word"
        name="firstLang"
        type="text"
        value={state.firstLang}
        handleChange={handleChange}
      />
      <InputField
        label="Second Word"
        name="secondLang"
        type="text"
        value={state.secondLang}
        handleChange={handleChange}
      />
      <InputField
        label="Third Word"
        name="thirdLang"
        type="text"
        value={state.thirdLang}
        handleChange={handleChange}
      />
      <InputField
        label="Fourth Word"
        name="fourthLang"
        type="text"
        value={state.fourthLang}
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
