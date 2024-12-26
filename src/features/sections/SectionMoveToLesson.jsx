import React, { useEffect, useState } from "react";
import { useEditSectionLessonIDMutation } from "./sectionSlice";
import { toast } from "react-toastify";
import FormContainer from "../components/FormContainer";

// TODO: fetch lessons, set options and update edit mutation
export default function SectionMoveToLesson({ section, setViewMoveLesson }) {
  const [editSectionLessonID] = useEditSectionLessonIDMutation();

  const [selected, setSelected] = useState("");

  let content = allLessons.map((block, index) => (
    <option value={index} key={index}>
      {block?.title}
    </option>
  ));

  const canSave = selected !== "" && !isNaN(selected) && selected >= 0;

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (canSave) {
      try {
        await editSectionLessonID({
          id: section?.id,
          chapterID: allLessons[selected].chapterID,
          lessonID: allLessons[selected].id,
        });
        toast.success("Section Moved");
        setViewMoveLesson(false);
      } catch (e) {
        console.log(e);
        toast.error("Server Error");
      }
    }
  };

  // const handleReset = () => {
  //   setSelected(() => {
  //     const idx = allLessons.findIndex(
  //       (block) => block.id === section.lessonID
  //     );
  //     if (idx >= 0) return idx;
  //     return "";
  //   });
  //   setViewMoveLesson(false);
  // };

  return (
    <FormContainer
      type="edit"
      title="Move Section to Lesson"
      onSubmit={handleSubmit}
      closeForm={setViewMoveLesson}
    >
      <div className="field">
        <label htmlFor="move-section-lesson" className="field__label">
          Move Section to Lesson
        </label>
        <select
          name="move-section-lesson"
          id="move-section-lesson"
          required
          value={selected}
          onChange={(e) => setSelected(e.target.value)}
          className="field__input"
        >
          <option value="">Select Lesson</option>
          {content}
        </select>
      </div>
    </FormContainer>
  );
}
