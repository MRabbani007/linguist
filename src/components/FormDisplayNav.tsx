import { motion, AnimatePresence } from "framer-motion";
import {
  Dispatch,
  ReactNode,
  SetStateAction,
  useEffect,
  useRef,
  useState,
} from "react";
import { BiChevronLeft, BiChevronRight, BiX } from "react-icons/bi";

export default function FormDisplayNav({
  showForm,
  setShowForm,
  handlePrev,
  handleNext,
  title,
  index,
  total,
  children,
}: {
  showForm: boolean;
  setShowForm: Dispatch<SetStateAction<boolean>>;
  handlePrev: () => void;
  handleNext: () => void;
  title: string;
  index: number;
  total: number;
  children: ReactNode;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [direction, setDirection] = useState(0); // 1 for next, -1 for prev

  useEffect(() => {
    const handleEscape = (ev: globalThis.KeyboardEvent) => {
      if (ev.key === "Escape") {
        setShowForm(false);
      }
    };

    if (showForm === true) {
      document.body.style.overflow = "hidden";
      document.addEventListener("keydown", handleEscape);
    } else {
      document.body.style.overflow = "unset";
      document.removeEventListener("keydown", handleEscape);
    }

    return () => {
      document.body.style.overflow = "unset";
      document.removeEventListener("keydown", handleEscape);
    };
  }, [showForm]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        setShowForm(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <>
      <div
        onClick={() => setShowForm(false)}
        className={
          (showForm ? "" : "scale-0 opacity-0 invisible ") +
          " fixed inset-0 bg-zinc-500/50 z-[1000] duration-100"
        }
      ></div>
      <button
        onClick={() => setShowForm(false)}
        className={
          (showForm ? "" : "scale-0 opacity-0 invisible ") +
          "p-2 bg-white/90 hover:bg-white hover:shadow-lg hover:shadow-zinc-500 duration-200 shadow-sm shadow-zinc-500 rounded-lg fixed top-4 right-4 z-[1100]"
        }
      >
        <BiX size={30} />
      </button>
      <div
        className={
          (showForm ? "" : "-translate-y-full ") +
          "fixed inset-0 flex items-center justify-center z-[1010] duration-200"
        }
      >
        <div
          ref={ref}
          className="bg-white rounded-lg w-full max-w-[1024px] min-h-[40vh] m-4 md:m-20 flex flex-col shadow-sm shadow-zinc-700 relative"
        >
          <div className="flex items-center gap-4 py-2 px-4 text-lg bg-red-900/90 text-white font-medium rounded-t-lg">
            <p>{title}</p>
          </div>
          <div className="flex-1 flex items-stretch gap-2 py-8 px-2 md:px-8 rounded-b-lg overflow-hidden relative">
            <AnimatePresence initial={false} custom={direction}>
              <motion.div
                key={index}
                custom={direction}
                initial={{ x: direction > 0 ? 300 : -300, opacity: 1 }}
                animate={{ x: 0, opacity: 1 }}
                exit={{ x: direction > 0 ? -300 : 300, opacity: 1 }}
                transition={{ duration: 0.4 }}
                className="absolute inset-0 m-4 flex text-2xl flex-1 flex-col gap-4"
              >
                {children}
              </motion.div>
            </AnimatePresence>
          </div>
          <button
            onClick={() => {
              handlePrev(), setDirection(-1);
            }}
            disabled={index === 0}
            className="absolute 
            top-full mt-2 right-0 mr-0 left-0 md:left-auto w-fit
             md:top-0 md:mt-0 md:right-full md:bottom-0 md:mr-2
            rounded-md bg-white/40 hover:bg-white disabled:bg-white/10 hover:shadow-lg hover:shadow-zinc-500 duration-200 p-0 md:p-2 shadow-sm shadow-zinc-500"
          >
            <BiChevronLeft size={30} />
          </button>
          <button
            onClick={() => {
              handleNext(), setDirection(1);
            }}
            disabled={index === total - 1}
            className="absolute 
            top-full mt-2 right-0 mr-0 left-auto md:right-auto w-fit
             md:top-0 md:mt-0 md:left-full md:bottom-0 md:ml-2
             rounded-md bg-white/40 hover:bg-white disabled:bg-white/10 hover:shadow-lg hover:shadow-zinc-500 duration-200 p-0 md:p-2 shadow-sm shadow-zinc-500"
          >
            <BiChevronRight size={30} />
          </button>
          <div className="flex items-center gap-4 py-2 px-4 text-lg bg-red-900/90 text-white font-medium rounded-b-lg">
            <p className="ml-auto">{`${index + 1} - ${total}`}</p>
          </div>
        </div>
      </div>
    </>
  );
}
