import React, { useEffect } from "react";
import { PiEmpty } from "react-icons/pi";
import {
  IoAddCircleOutline,
  IoCheckmarkCircleOutline,
  IoCloseCircleOutline,
} from "react-icons/io5";
import { AiOutlineDelete } from "react-icons/ai";

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
  showForm = true,
  setShowForm = () => {},
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
        {/* Form Buttons */}
        <div className="flex items-center justify-between gap-4 px-4">
          <div className="md:flex items-center gap-2 hidden">
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
                <IoAddCircleOutline size={30} />
                <span>{submitName}</span>
              </button>
            ) : type === "edit" ? (
              <button type="submit" title="Save" className="save">
                <IoCheckmarkCircleOutline size={30} />
                <span>{submitName}</span>
              </button>
            ) : null}
            <button type="reset" title="Cancel" className="cancel text-center">
              <IoCloseCircleOutline size={30} />
              <span>Cancel</span>
            </button>
            {deleteButton ? (
              <button
                type="button"
                title="Delete"
                className="delete"
                onClick={onDelete}
              >
                <AiOutlineDelete size={30} />
                <span>Delete</span>
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
                <PiEmpty size={30} />
                <span>Clear</span>
              </button>
            ) : null}
          </div>
        </div>
      </form>
    </div>
  );
}
