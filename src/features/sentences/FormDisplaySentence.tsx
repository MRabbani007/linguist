import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { BiChevronLeft, BiChevronRight, BiX } from "react-icons/bi";

export default function FormDisplaySentence({
  sentences,
  title,
  setShowForm,
}: {
  sentences: Sentence[];
  title: string;
  setShowForm: Dispatch<SetStateAction<boolean>>;
}) {
  const [index, setIndex] = useState(0);
  function handlePrev() {
    if (index > 0) {
      setIndex((curr) => curr - 1);
    }
  }
  function handleNext() {
    if (index < sentences?.length - 1) {
      setIndex((curr) => curr + 1);
    }
  }

  useEffect(() => {
    const handleEscape = (ev: globalThis.KeyboardEvent) => {
      if (ev.key === "Escape") {
        setShowForm(false);
      }
    };

    document.body.style.overflow = "hidden";
    document.addEventListener("keydown", handleEscape);

    return () => {
      document.body.style.overflow = "unset";
      document.removeEventListener("keydown", handleEscape);
    };
  }, []);

  return (
    <div className="fixed inset-0 bg-zinc-500/50 flex items-center justify-center z-[1000]">
      <button
        onClick={() => setShowForm(false)}
        className="p-2 bg-zinc-50 rounded-lg fixed top-4 right-4"
      >
        <BiX size={30} />
      </button>
      <div className="bg-white rounded-lg w-full max-w-[1024px] min-h-[40vh] m-4 md:m-20 flex flex-col shadow-sm shadow-zinc-700 ">
        <div className="flex items-center gap-4 p-4 text-lg bg-white text-black font-medium rounded-t-lg">
          <p>{title}</p>
          <p className="ml-auto">{`${index + 1} / ${sentences?.length}`}</p>
        </div>
        <div className="flex-1 flex items-stretch gap-2 py-8 px-2 md:px-8 relative rounded-b-lg">
          <button
            onClick={handlePrev}
            className="absolute 
            top-full mt-2 right-0 mr-0 left-0 md:left-auto w-fit
             md:top-0 md:mt-0 md:right-full md:bottom-0 md:mr-2
            rounded-md bg-zinc-50 hover:bg-zinc-200 duration-200 p-0 md:p-2"
          >
            <BiChevronLeft size={30} />
          </button>
          <div className="flex-1 flex flex-col gap-4">
            <p className="flex-1 flex items-center justify-center text-xl font-medium text-black p-4 rounded-md bg-red-100">
              {sentences[index]?.text}
            </p>
            <p className="flex-1 flex items-center justify-center text-xl font-medium text-black p-4 rounded-md bg-green-100">
              {sentences[index]?.translation}
            </p>
            {/* <p className="whitespace-break-spaces">
              {JSON.stringify(sentences[index]).replaceAll(`","`, `" "`)}
            </p> */}
          </div>
          <button
            onClick={handleNext}
            className="absolute 
            top-full mt-2 right-0 mr-0 left-auto md:right-auto w-fit
             md:top-0 md:mt-0 md:left-full md:bottom-0 md:ml-2
            rounded-md bg-zinc-50 hover:bg-zinc-200 duration-200 p-0 md:p-2"
          >
            <BiChevronRight size={30} />
          </button>
        </div>
      </div>
    </div>
  );
}
