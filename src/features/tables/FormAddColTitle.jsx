import React, { useState } from "react";
import { CiCirclePlus, CiSquarePlus, CiSquareRemove } from "react-icons/ci";

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
    <div className="fixed top-0 left-0 right-0 bottom-0 bg-slate-600 bg-opacity-50 flex items-center justify-center">
      <form
        onSubmit={onSubmit}
        onReset={handleReset}
        className="flex flex-col gap-3 items-center bg-slate-100 rounded-md p-3"
      >
        <h2 className="font-semibold text-slate-800">Add Columns Title</h2>
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
        <div className="flex items-center gap-3">
          <button type="submit" className="btn btn-red">
            Save
            {/* <CiSquarePlus size={32} /> */}
          </button>
          <button type="reset" className="btn btn-yellow">
            Cancel
            {/* <CiSquareRemove size={32} /> */}
          </button>
        </div>
      </form>
    </div>
  );
}
