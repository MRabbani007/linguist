import { useState } from "react";

export default function FormEditRow({ row = "", dispatch }) {
  const [val, setVal] = useState(row);

  const canSave = val !== "";

  const onSubmit = (e) => {
    e.preventDefault();
    if (canSave) {
      dispatch({ type: "EDIT_ROW", payload: val });
    }
  };

  const onReset = () => {
    dispatch({ type: "" });
  };

  return (
    <div className="fixed top-0 left-0 right-0 bottom-0 bg-slate-600 bg-opacity-90 flex items-center justify-center z-30">
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
            value={val}
            onChange={(e) => setVal(e.target.value)}
          />
        </div>
        <div className="flex items-center gap-3">
          <button type="submit" className="btn btn-blue">
            Save
          </button>
          <button type="reset" className="btn btn-yellow">
            Cancel
          </button>
          <button type="button" className="btn btn-red">
            Delete
          </button>
        </div>
      </form>
    </div>
  );
}
