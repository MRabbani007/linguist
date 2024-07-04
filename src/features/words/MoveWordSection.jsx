import { useEffect, useState } from "react";
import { useEditWordSectionIDMutation } from "./wordsSlice";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import { selectSections } from "../globals/globalsSlice";
import FormContainer from "../components/FormContainer";

export default function MoveWordSection({ word, setViewMoveSection }) {
  const [editWordSectionID, { isLoading }] = useEditWordSectionIDMutation();
  const sections = useSelector(selectSections);
  const [selected, setSelected] = useState("");

  useEffect(() => {
    setSelected(() => {
      const idx = sections.findIndex(
        (section) => section?.id === word?.sectionID
      );
      if (idx >= 0) return idx;
      return "";
    });
  }, [word, sections]);

  let content = sections.map((section, index) => (
    <option value={index} key={index}>
      {section?.title}
    </option>
  ));

  const canSave = selected !== "" && !isNaN(selected) && selected >= 0;

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (canSave) {
      try {
        await editWordSectionID({
          id: word?.id,
          sectionID: sections[selected]?.id,
        });
        toast.success("Word Moved");
        setViewMoveSection(false);
      } catch (e) {
        toast.error("Server Error");
      }
    }
  };

  return (
    <FormContainer
      title="Move Word to Section"
      type="edit"
      onSubmit={handleSubmit}
      closeForm={setViewMoveSection}
    >
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
    </FormContainer>
  );
}
