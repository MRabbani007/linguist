import React, { useState } from "react";
import { CiCirclePlus, CiSquarePlus, CiSquareRemove } from "react-icons/ci";

export default function FormEditCaption({ caption = "", dispatch }) {
  const [val, setVal] = useState(caption);

  const canSave = val !== "";

  const onSubmit = (e) => {
    e.preventDefault();
    if (canSave) {
      dispatch({ type: "CAPTION", payload: val });
    }
  };

  const onReset = () => {
    dispatch({ type: "" });
  };

  return (
    <div className="fixed top-0 left-0 right-0 bottom-0 bg-slate-600 bg-opacity-50 flex items-center justify-center">
      <form
        onSubmit={onSubmit}
        onReset={onReset}
        className="flex flex-col gap-3 items-center bg-slate-100 rounded-md p-3"
      >
        <h2 className="font-semibold text-slate-800">Table Caption</h2>
        <div className="field">
          <label htmlFor="caption" className="field__label">
            Caption
          </label>
          <input
            id="caption"
            type="text"
            title="Caption"
            placeholder="Caption"
            value={val}
            onChange={(e) => setVal(e.target.value)}
          />
        </div>
        <div className="flex items-center gap-3">
          <button type="submit" className="btn btn-red">
            Save
          </button>
          <button type="reset" className="btn btn-yellow">
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}
