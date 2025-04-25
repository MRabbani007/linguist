import {
  Dispatch,
  FormEvent,
  ReactNode,
  SetStateAction,
  useEffect,
  useRef,
  useState,
} from "react";
import { BiX } from "react-icons/bi";
import { IoSettingsOutline } from "react-icons/io5";

interface Props {
  children: ReactNode;
  title?: string;
  type?: "add" | "edit";
  submitButton?: string;
  deleteButton?: boolean;
  clearButton?: boolean;
  clearOnSubmit?: boolean;
  showClearOnSubmit?: boolean;
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
  showClearOnSubmit,
  clearOnSubmit = false,
  setClearOnSubmit = () => {},
  onSubmit = () => {},
  onReset = () => {},
  onDelete = () => {},
  handleClear = () => {},
  closeForm,
}: Props) {
  const [formSettings, setFormSettings] = useState(false);

  const ref = useRef<HTMLDivElement>(null);

  const handleReset = () => {
    closeForm(false);
    onReset(false);
  };

  useEffect(() => {
    const handleEscape = (ev: globalThis.KeyboardEvent) => {
      if (ev.key === "Escape") {
        closeForm(false);
      }
    };

    document.body.style.overflow = "hidden";
    document.addEventListener("keydown", handleEscape);

    return () => {
      document.body.style.overflow = "unset";
      document.removeEventListener("keydown", handleEscape);
    };
  }, []);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        setFormSettings(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
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
        className="bg-zinc-50 min-w-fit w-full max-w-[1024px] mx-4 flex flex-col rounded-lg overflow-clip"
      >
        {/* Form Header */}
        <div className="py-2 px-4 bg-zinc-800 text-white flex items-center gap-4">
          <h2 className="flex-1 ">{title}</h2>
          <button type="button" onClick={() => closeForm(false)}>
            <BiX size={24} />
          </button>
        </div>
        {/* Form Content */}
        <div className="max-h-[70vh] min-h-[30vh] h-full overflow-y-auto">
          <div className="flex flex-col justify-start items-stretch gap-4 p-4">
            {children}
          </div>
        </div>
        {/* Form Buttons */}
        <div className="flex items-center justify-center gap-4 px-4">
          {/* Form Settings */}
          <div className="relative">
            {showClearOnSubmit && (
              <button
                type="button"
                title="Settings"
                onClick={() => setFormSettings((curr) => !curr)}
                className="bg-zinc-200 hover:bg-zinc-100 duration-200 p-1 rounded-md"
              >
                <IoSettingsOutline size={25} />
              </button>
            )}
            {showClearOnSubmit === true && (
              <div
                ref={ref}
                className={
                  (formSettings ? "" : "translate-y-4 opacity-0 invisible") +
                  " absolute bottom-full left-0 bg-zinc-200 text-sm py-1 px-4 rounded-md duration-200"
                }
              >
                <div className="flex items-center gap-2 ">
                  <input
                    type="checkbox"
                    id="clearOnSubmit"
                    checked={clearOnSubmit}
                    onChange={() => setClearOnSubmit((curr) => !curr)}
                  />
                  <label htmlFor="clearOnSubmit" className="whitespace-nowrap">
                    Clear On Submit
                  </label>
                </div>
              </div>
            )}
          </div>
          {/* Submit, cancel, delete buttons */}
          <div className="flex flex-wrap items-center justify-center gap-2 py-2 text-sm mx-auto">
            {type === "add" ? (
              <button
                type="submit"
                title="Add"
                className="py-2 px-4 rounded-md bg-zinc-800 text-white hover:bg-zinc-700 duration-150 transition-all flex items-center gap-2"
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
                className="py-2 px-4 rounded-md bg-zinc-800 text-white hover:bg-zinc-700 duration-150 transition-all flex items-center gap-2"
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
          {/* Clear form button */}
          {clearButton ? (
            <button
              type="button"
              title="Clear Form"
              className="py-1 px-2 md:py-2 md:px-4 text-sm font-medium rounded-md bg-zinc-300 text-zinc-800 hover:bg-zinc-200 duration-150 transition-all flex items-center gap-2"
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
