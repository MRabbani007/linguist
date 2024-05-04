import { useState } from "react";
import { TABLE } from "../../data/actions";

export default function FormTableHeaders({ type, dispatch }) {
  const [value, setValue] = useState("");
  const [colSpan, setColSpan] = useState("");

  const formTitle =
    type === TABLE.CAPTION
      ? "Edit Table Caption"
      : type === TABLE.ADD_COLTITLE
      ? "Add Column Title"
      : type === TABLE.ADD_COL
      ? "Add Column"
      : type === TABLE.ADD_ROW
      ? "Add Row"
      : type === TABLE.EDIT_COLTITLE
      ? "Edit Column Title"
      : type === TABLE.EDIT_COL
      ? "Edit Column"
      : type === TABLE.EDIT_ROW
      ? "Edit Row"
      : "";

  const isCaption = type === TABLE.CAPTION;

  const canDelete = type !== TABLE.CAPTION && type.split("_")[0] === "EDIT";

  const canSave = value !== "" && !isNaN(colSpan) && colSpan > 0;

  const onSubmit = (e) => {
    e.preventDefault();
    if (canSave) {
      dispatch({ type, payload: { value, colSpan } });
    }
  };

  const onReset = () => {
    dispatch({ type: "" });
  };

  const handleDelete = () => {
    const typeArray = type.split("_", 1);
    const tempType =
      typeArray[1] === "ROW"
        ? TABLE.DELETE_ROW
        : typeArray[1] === "COL"
        ? TABLE.DELETE_COL
        : typeArray[1] === "COLTITLE"
        ? TABLE.DELETE_COLTITLE
        : "";
    dispatch({ type: tempType });
  };

  return (
    <div className="form-container">
      <form onSubmit={onSubmit} onReset={onReset} className="">
        <h2 className="">{formTitle}</h2>
        <div>
          <div className="field">
            <label htmlFor="value" className="field__label">
              Title
            </label>
            <input
              id="value"
              type="text"
              title="Title"
              placeholder="Title"
              value={value}
              onChange={(e) => setValue(e.target.value)}
              className="field__input"
            />
          </div>
          {!isCaption && (
            <div className="field">
              <label htmlFor="colSpan" className="field__label">
                Col-Span
              </label>
              <input
                id="colSpan"
                type="number"
                title="ColSpan"
                placeholder="ColSpan"
                min={1}
                step={1}
                value={colSpan}
                onChange={(e) => setColSpan(e.target.value)}
                className="field__input"
              />
            </div>
          )}
          <div className="flex items-center gap-3">
            <button type="submit" className="btn btn-blue">
              Save
            </button>
            <button type="reset" className="btn btn-yellow">
              Cancel
            </button>
            {canDelete && (
              <button
                type="button"
                className="btn btn-red"
                onClick={handleDelete}
              >
                Delete
              </button>
            )}
          </div>
        </div>
      </form>
    </div>
  );
}
