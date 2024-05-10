import { useEffect, useState } from "react";
import { useEditWordSectionIDMutation } from "./wordsSlice";

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
        id: word?.id,
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
    <div className="form-container">
      <form onSubmit={handleSubmit} onReset={handleReset}>
        <h2>Move Word to Section</h2>
        <div>
          <div className="field">
            <label htmlFor="move-word" className="field__label">
              Move to Section:
            </label>
            <select
              name="move-word-section"
              id="move-word-section"
              required
              value={selected}
              onChange={(e) => setSelected(e.target.value)}
              className="field__input"
            >
              <option value="">Select Section</option>
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
