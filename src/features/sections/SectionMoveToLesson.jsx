import React, { useEffect, useState } from "react";
import { useGetAllBlocksQuery } from "../blocks/blockSlice";
import { useEditSectionLessonIDMutation } from "./sectionSlice";
import { toast } from "react-toastify";

export default function SectionMoveToLesson({ section, setViewMoveLesson }) {
  const [editSectionLessonID] = useEditSectionLessonIDMutation();

  const [allLessons, setAllLessons] = useState([]);
  const [selected, setSelected] = useState("");
  const { data, isSuccess } = useGetAllBlocksQuery();

  useEffect(() => {
    if (isSuccess) {
      setAllLessons(() => data.ids.map((id) => data.entities[id]));
    }
  }, [data]);

  let content = allLessons.map((block, index) => (
    <option value={index} key={index}>
      {block?.title}
    </option>
  ));

  useEffect(() => {
    setSelected(() => {
      const idx = allLessons.findIndex((block) => block.id === section.blockID);
      if (idx >= 0) return idx;
      return "";
    });
  }, [section, allLessons]);

  const canSave = selected !== "" && !isNaN(selected) && selected >= 0;

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (canSave) {
      try {
        const sectionData = {
          id: section?.id,
          chapterID: allLessons[selected].chapterID,
          lessonID: allLessons[selected].id,
        };
        await editSectionLessonID(sectionData);
        toast.success("Section Moved");
        setViewMoveLesson(false);
      } catch (e) {
        console.log(e);
        toast.error("Server Error");
      }
    }
  };

  const handleReset = () => {
    setSelected(() => {
      const idx = allLessons.findIndex(
        (block) => block.id === section.lessonID
      );
      if (idx >= 0) return idx;
      return "";
    });
    setViewMoveLesson(false);
  };

  return (
    <div className="form-container">
      <form onSubmit={handleSubmit} onReset={handleReset}>
        <h2>Move Section to Lesson</h2>
        <div>
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
          <div className="form-buttons">
            <button type="submit" title="Save" className="save">
              Save
            </button>
            <button type="reset" title="Cancel" className="cancel">
              Cancel
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}
