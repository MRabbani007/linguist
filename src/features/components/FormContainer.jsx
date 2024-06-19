import React, { useEffect } from "react";

export default function FormContainer({
  children,
  title = "",
  type = "add",
  submitButton = "",
  deleteButton = false,
  onSubmit = () => {},
  onDelete = () => {},
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
      </form>
    </div>
  );
}
