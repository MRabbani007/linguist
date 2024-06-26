import { useEffect, useState } from "react";
import { useGetAllBlocksQuery } from "../blocks/blockSlice";
import { useEditWordBlockIDMutation } from "./wordsSlice";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import { selectLanguage } from "../globals/globalsSlice";

export default function MoveWord({ word, setViewMoveLesson }) {
  const language = useSelector(selectLanguage);
  const [editWordBlockID] = useEditWordBlockIDMutation();

  const [allLessons, setAllLessons] = useState([]);
  const [selected, setSelected] = useState("");
  const { data, isSuccess } = useGetAllBlocksQuery(language?.id);

  useEffect(() => {
    if (isSuccess) {
      setAllLessons(() =>
        data.ids
          .map((id) => data.entities[id])
          .sort((a, b) =>
            a?.title.toString().localeCompare(b?.title.toString())
          )
      );
    }
  }, [data]);

  let content = allLessons.map((block, index) => (
    <option value={index} key={index}>
      {block?.title}
    </option>
  ));

  useEffect(() => {
    setSelected(() => {
      const idx = allLessons.findIndex((block) => block.id === word.blockID);
      if (idx >= 0) return idx;
      return "";
    });
  }, [word, allLessons]);

  const canSave = selected !== "" && !isNaN(selected) && selected >= 0;

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (canSave) {
      try {
        const newWord = {
          ...word,
          chapterID: allLessons[selected].chapterID,
          lessonID: allLessons[selected].id,
        };
        await editWordBlockID(newWord);
        toast.success("Word Moved");
        setViewMoveLesson(false);
      } catch (e) {
        toast.error("Server Error");
      }
    }
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
            {/* <input
              type="text"
              list="move-word-lesson"
              id="selected-lesson"
              name="selected-lesson"
            /> */}
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
