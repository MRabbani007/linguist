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
    <form
      onSubmit={handleSubmit}
      onReset={handleReset}
      className="flex flex-col justify-center gap-2"
    >
      <label htmlFor="move-word-lesson" className="hidden">
        Move Word to Lesson
      </label>
      <div className="flex items-center">
        <select
          name="move-word-lesson"
          id="move-word-lesson"
          required
          value={selected}
          onChange={(e) => setSelected(e.target.value)}
        >
          <option value="">Select Lesson</option>
          {content}
        </select>
        <button type="submit" title="Save">
          <CiSquareCheck size={34} />
        </button>
        <button type="reset" title="Cancel">
          <CiSquareRemove size={34} />
        </button>
      </div>
    </form>
  );
}
