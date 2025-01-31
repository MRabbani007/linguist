import {
  Dispatch,
  FormEvent,
  ReactNode,
  SetStateAction,
  useEffect,
} from "react";
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
  onReset?: Dispatch<SetStateAction<boolean>>;
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
  onReset = () => {},
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
    onReset(false);
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
        className="bg-zinc-100 min-w-fit w-full max-w-[1024px] mx-4 flex flex-col rounded-lg overflow-clip"
      >
        <div className="py-2 px-4 bg-zinc-800 text-white flex items-center gap-4">
          <h2 className="flex-1 ">{title}</h2>
          <button type="button" onClick={() => closeForm(false)}>
            <BiX size={24} />
          </button>
        </div>
        <div className="max-h-[70vh] min-h-[60vh] h-full overflow-y-auto">
          <div className="flex flex-col justify-start items-stretch gap-4 p-4">
            {children}
          </div>
        </div>
        {/* Form Buttons */}
        <div className="flex items-center justify-center gap-4 px-4">
          {/* <div className="md:flex items-center gap-2 hidden">
            <input
              type="checkbox"
              id="clearOnSubmit"
              checked={clearOnSubmit}
              onChange={() => setClearOnSubmit((curr) => !curr)}
            />
            <label htmlFor="clearOnSubmit">Clear On Submit</label>
          </div> */}
          <div className="flex flex-wrap items-center justify-center gap-2 py-2 text-sm">
            {type === "add" ? (
              <button
                type="submit"
                title="Add"
                className="py-2 px-4 rounded-md  bg-zinc-800 text-white hover:bg-zinc-700 duration-150 transition-all flex items-center gap-2"
              >
                {/* <IoAddCircleOutline
                  size={25}
                  className="hidden md:inline-block"
                /> */}
                <span>{submitName}</span>
              </button>
            ) : type === "edit" ? (
              <button
                type="submit"
                title="Save"
                className="py-2 px-4 rounded-md  bg-zinc-800 text-white hover:bg-zinc-700 duration-150 transition-all flex items-center gap-2"
              >
                {/* <IoCheckmarkCircleOutline
                  size={25}
                  className="hidden md:inline-block"
                /> */}
                <span>{submitName}</span>
              </button>
            ) : null}
            <button
              type="reset"
              title="Cancel"
              className="py-2 px-4 rounded-md bg-zinc-300 text-zinc-800 hover:bg-zinc-200 duration-150 transition-all flex items-center gap-2"
            >
              {/* <IoCloseCircleOutline
                size={25}
                className="hidden md:inline-block"
              /> */}
              <span>Cancel</span>
            </button>
            {deleteButton ? (
              <button
                type="button"
                title="Delete"
                className="py-2 px-4 rounded-md bg-red-600 text-white hover:bg-red-500 duration-150 transition-all flex items-center gap-2"
                onClick={onDelete}
              >
                {/* <AiOutlineDelete size={25} className="hidden md:inline-block" /> */}
                <span>Delete</span>
              </button>
            ) : null}
          </div>
          {clearButton ? (
            <button
              type="button"
              title="Clear Form"
              className="py-2 px-4 rounded-md bg-zinc-300 text-zinc-800 hover:bg-zinc-200 duration-150 transition-all flex items-center gap-2"
              onClick={handleClear}
            >
              {/* <PiEmpty size={25} /> */}
              <span>Clear</span>
            </button>
          ) : null}
        </div>
      </form>
    </div>
  );
}
