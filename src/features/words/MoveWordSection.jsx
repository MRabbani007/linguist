import { useEffect, useState } from "react";
import { useEditWordSectionIDMutation } from "./wordsSlice";
import { CiSquareCheck, CiSquareRemove } from "react-icons/ci";

export default function MoveWordSection({
  word,
  sectionsList,
  setViewMoveSection,
}) {
  const [editWordSectionID, { isLoading }] = useEditWordSectionIDMutation();
  const [selected, setSelected] = useState("");

  useEffect(() => {
    setSelected(() => {
      const idx = sectionsList.findIndex(
        (section) => section?.id === word?.sectionID
      );
      if (idx >= 0) return idx;
      return "";
    });
  }, [word, sectionsList]);

  let content = sectionsList.map((section, index) => (
    <option value={index} key={index}>
      {section?.title}
    </option>
  ));

  const canSave = selected !== "" && !isNaN(selected) && selected >= 0;

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (canSave) {
      await editWordSectionID({
        id: word.id,
        sectionID: sectionsList[selected]?.id,
      });
    }
    setViewMoveSection(false);
  };

  const handleReset = () => {
    setSelected(() => {
      const idx = sectionsList.findIndex(
        (section) => section?.id === word?.sectionID
      );
      if (idx >= 0) return idx;
      return "";
    });
    setViewMoveSection(false);
  };

  return (
    <form
      onSubmit={handleSubmit}
      onReset={handleReset}
      className="flex items-center gap-2"
    >
      <label htmlFor="move-word">Move to Section:</label>
      <select
        name="move-word-section"
        id="move-word-section"
        required
        value={selected}
        onChange={(e) => setSelected(e.target.value)}
      >
        <option value="">Select Section</option>
        {content}
      </select>
      <button type="submit" title="Save">
        <CiSquareCheck size={34} />
      </button>
      <button type="reset" title="Cancel">
        <CiSquareRemove size={34} />
      </button>
    </form>
  );
}
