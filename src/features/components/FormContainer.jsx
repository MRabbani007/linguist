import React, { useEffect } from "react";

export default function FormContainer({
  children,
  title = "",
  type = "add",
  submitButton = "",
  deleteButton = false,
  clearButton = false,
  clearOnSubmit = false,
  setClearOnSubmit = () => {},
  onSubmit = () => {},
  onDelete = () => {},
  handleClear = () => {},
  closeForm = () => {},
}) {
  const handleEscape = (e) => {
    if (e.key === "Escape") {
      closeForm(false);
    }
  };

  const handleReset = () => {
    closeForm(false);
  };

  useEffect(() => {
    document.body.style.overflow = "hidden";
    document.addEventListener("keydown", handleEscape);

    return () => {
      document.body.style.overflow = "unset";
      document.removeEventListener("keydown", handleEscape);
    };
  }, []);

  const submitName =
    submitButton !== ""
      ? submitButton
      : type === "add"
      ? "Add"
      : type === "edit"
      ? "Save"
      : "Submit";

  return (
    <div className="form-container">
      <form onSubmit={onSubmit} onReset={handleReset}>
        <h2>{title}</h2>
        <div>
          <div className="content">{children}</div>
        </div>
        <div className="flex items-center justify-between gap-4 px-4">
          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              id="clearOnSubmit"
              checked={clearOnSubmit}
              onChange={() => setClearOnSubmit((curr) => !curr)}
            />
            <label htmlFor="clearOnSubmit">Clear On Submit</label>
          </div>
          <div className="form-buttons">
            {type === "add" ? (
              <button type="submit" title="Add" className="add">
                {submitName}
              </button>
            ) : type === "edit" ? (
              <button type="submit" title="Save" className="save">
                {submitName}
              </button>
            ) : null}
            <button type="reset" title="Cancel" className="cancel">
              Cancel
            </button>
            {deleteButton ? (
              <button
                type="button"
                title="Delete"
                className="delete"
                onClick={onDelete}
              >
                Delete
              </button>
            ) : null}
          </div>
          <div>
            {clearButton ? (
              <button
                type="button"
                title="Clear Form"
                className="cancel"
                onClick={handleClear}
              >
                Clear
              </button>
            ) : null}
          </div>
        </div>
      </form>
    </div>
  );
}
