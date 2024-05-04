import { useEffect, useState } from "react";
import { useGetAllBlocksQuery } from "../blocks/blockSlice";
import { useEditWordBlockIDMutation } from "./wordsSlice";
import { CiSquareCheck, CiSquareRemove } from "react-icons/ci";

export default function MoveWord({ word, setViewMoveLesson }) {
  const [editWordBlockID, { isLoading }] = useEditWordBlockIDMutation();

  const {
    data,
    isLoading: loading,
    isSuccess: success,
  } = useGetAllBlocksQuery();

  const [allLessons, setAllLessons] = useState([]);

  useEffect(() => {
    if (success) {
      setAllLessons(() => data.ids.map((id) => data.entities[id]));
    }
  }, [data]);

  let content = allLessons.map((block, index) => (
    <option value={index} key={index}>
      {block?.title}
    </option>
  ));

  const [selected, setSelected] = useState("");

  useEffect(() => {
    setSelected(() => {
      const idx = allLessons.findIndex((block) => block.id === word.blockID);
      if (idx >= 0) return idx;
      return "";
    });
  }, [word, allLessons]);

  const canSave =
    selected !== "" && !isNaN(selected) && selected >= 0 && !isLoading;

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (canSave) {
      const newWord = {
        ...word,
        chapterID: allLessons[selected].chapterID,
        blockID: allLessons[selected].id,
      };
      await editWordBlockID(newWord);
    }
    setViewMoveLesson(false);
  };

  const handleReset = () => {
    setSelected(() => {
      const idx = allLessons.findIndex((block) => block.id === word.blockID);
      if (idx >= 0) return idx;
      return "";
    });
    setViewMoveLesson(false);
  };

  return (
    <div className="form-container">
      <form onSubmit={handleSubmit} onReset={handleReset}>
        <h2>Move Word to Lesson</h2>
        <div>
          <div className="field">
            <label htmlFor="move-word-lesson" className="field__label">
              Move Word to Lesson
            </label>
            <select
              name="move-word-lesson"
              id="move-word-lesson"
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
            <button type="submit" title="Save" className="add">
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
