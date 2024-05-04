import React, { useState } from "react";
import { CiCirclePlus, CiSquarePlus, CiSquareRemove } from "react-icons/ci";

export default function FormAddRow({ handleSubmit, handleReset }) {
  const [row, setRow] = useState("");

  const canSave = row !== "";

  const onSubmit = (e) => {
    e.preventDefault();
    if (canSave) {
      handleSubmit(row);
    }
  };

  const onReset = () => {
    handleReset();
  };

  return (
    <div className="fixed top-0 left-0 right-0 bottom-0 bg-slate-600 bg-opacity-50 flex items-center justify-center">
      <form
        onSubmit={onSubmit}
        onReset={onReset}
        className="flex flex-col gap-3 items-center bg-slate-100 rounded-md p-3"
      >
        <h2 className="font-semibold text-slate-800">Add Row</h2>
        <div className="field">
          <label htmlFor="rowName" className="field__label">
            Row Name
          </label>
          <input
            id="rowName"
            type="text"
            title="Row Name"
            placeholder="Row Name"
            value={row}
            onChange={(e) => setRow(e.target.value)}
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
