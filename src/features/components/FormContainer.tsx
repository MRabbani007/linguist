import React, {
  Dispatch,
  FormEvent,
  ReactNode,
  SetStateAction,
  useEffect,
} from "react";
import { PiEmpty } from "react-icons/pi";
import {
  IoAddCircleOutline,
  IoCheckmarkCircleOutline,
  IoCloseCircleOutline,
} from "react-icons/io5";
import { AiOutlineDelete } from "react-icons/ai";
import { BiX } from "react-icons/bi";

interface Props {
  children: ReactNode;
  title?: string;
  type?: "add" | "edit";
  submitButton?: string;
  deleteButton?: boolean;
  clearButton?: boolean;
  clearOnSubmit?: boolean;
  setClearOnSubmit?: Dispatch<SetStateAction<boolean>>;
  onSubmit: (event: FormEvent) => void;
  onDelete?: () => void;
  handleClear?: () => void;
  closeForm: Dispatch<SetStateAction<boolean>>;
}

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
  closeForm,
}: Props) {
  const handleEscape = (ev: globalThis.KeyboardEvent) => {
    if (ev.key === "Escape") {
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
    <div className="fixed top-0 left-0 right-0 bottom-0 bg-zinc-700/70 flex justify-center items-center z-[60]">
      <form
        onSubmit={onSubmit}
        onReset={handleReset}
        className="bg-zinc-100 min-w-fit w-[70vw] max-w-[1024px] mx-4 flex flex-col"
      >
        <div className="py-2 px-4 bg-red-600 text-white flex items-center gap-4">
          <h2 className="flex-1 text-center">{title}</h2>
          <button type="button" onClick={() => closeForm(false)}>
            <BiX size={24} />
          </button>
        </div>
        <div className="max-h-[80vh] min-h-[60vh] h-full overflow-y-auto">
          <div className="flex flex-col justify-start items-stretch gap-4 p-4">
            {children}
          </div>
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
          <div className="flex flex-wrap items-center gap-4 p-4">
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
