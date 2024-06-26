import React, { useState } from "react";
import { useEditSectionListLessonIDMutation } from "./sectionListSlice";
import { toast } from "react-toastify";
import FormContainer from "../components/FormContainer";

export default function ListEditLessonID({ list, setEdit }) {
  const [editSectionListLessonID, { isLoading }] =
    useEditSectionListLessonIDMutation();

  const [lessonID, setLessonID] = useState(list?.lessonID);
  const [sectionID, setSectionID] = useState(list?.sectionID);

  const canSave = lessonID !== "" && !isLoading;

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (canSave) {
      const newList = { id: list.id, lessonID, sectionID };
      await editSectionListLessonID(newList);
      toast.success("List Modified");
      setEdit(false);
    }
  };

  return (
    <FormContainer
      type="edit"
      title="Move List"
      onSubmit={handleSubmit}
      closeForm={setEdit}
    >
      <div className="field">
        <label htmlFor="table_lesson_id" className="field__label">
          Lesson ID
        </label>
        <input
          id="table_lesson_id"
          name="table_lesson_id"
          type="text"
          title="LessonID"
          placeholder="LessonID"
          value={lessonID}
          onChange={(e) => setLessonID(e.target.value)}
          className="field__input"
        />
      </div>
      <div className="field">
        <label htmlFor="table_section_id" className="field__label">
          Section ID
        </label>
        <input
          id="table_section_id"
          name="table_section_id"
          type="text"
          title="SectionID"
          placeholder="SectionID"
          value={sectionID}
          onChange={(e) => setSectionID(e.target.value)}
          className="field__input"
        />
      </div>
    </FormContainer>
  );
}
