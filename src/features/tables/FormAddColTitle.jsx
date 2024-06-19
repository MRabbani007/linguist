import React, { useState } from "react";
import FormContainer from "../components/FormContainer";

export default function FormAddColTitle({ handleSubmit, handleReset }) {
  const [colTitle, setColTitle] = useState("");
  const [colTitleSpan, setColTitleSpan] = useState("");

  const canSaveColTitle =
    colTitle !== "" && !isNaN(colTitleSpan) && colTitleSpan > 0;

  const onSubmit = (e) => {
    e.preventDefault();
    if (canSaveColTitle) {
      handleSubmit(colTitle, colTitleSpan);
    }
  };

  return (
    <FormContainer
      type="add"
      title="Add Title Column"
      onSubmit={onSubmit}
      closeForm={handleReset}
    >
      <div className="field">
        <label htmlFor="colTitle" className="field__label">
          Title
        </label>
        <input
          id="colTitle"
          type="text"
          title="Col Title"
          placeholder="Col Title"
          value={colTitle}
          onChange={(e) => setColTitle(e.target.value)}
          className="field__input"
        />
      </div>
      <div className="field">
        <label htmlFor="colSpan" className="field__label">
          Col-Span
        </label>
        <input
          id="colSpan"
          type="number"
          title="ColSpan"
          min={1}
          step={1}
          placeholder="ColSpan"
          value={colTitleSpan}
          onChange={(e) => setColTitleSpan(e.target.value)}
          className="field__input"
        />
      </div>
    </FormContainer>
  );
}
