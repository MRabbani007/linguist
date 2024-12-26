import { useEffect, useState } from "react";
import { BiCheck, BiX } from "react-icons/bi";
import { toast } from "react-toastify";
import { BiChevronLeft, BiChevronRight } from "react-icons/bi";

type FlashCardWord = { id: string; first: string; second: string };

type Props = {
  word: Word;
  firstLang: boolean;
  options: FlashCardWord[];
  handlePrev: () => void;
  handleNext: () => void;
  isFirst: boolean;
  isLast: boolean;
};

export default function CardFlashCards({
  firstLang = true,
  options = [],
  handlePrev = () => {},
  handleNext = () => {},
  isFirst = false,
}: Props) {
  const [show, setShow] = useState(false);
  const [newWord, setNewWord] = useState(true);
  const [status, setStatus] = useState("select");

  const [showWord, setShowWord] = useState(
    options[Math.floor(Math.random() * options.length)]
  );

  const [selected, setSelected] = useState<FlashCardWord | null>(null);

  useEffect(() => {
    if (selected && selected?.id === showWord?.id) {
      setNewWord(false);
      setShow(true);
      setStatus("success");
      toast.success("Correct!");
    } else if (selected?.id) {
      setStatus("fail");
      toast?.error("Wrong!");
    }
  }, [selected]);

  useEffect(() => {
    setShow(false);
    setNewWord(true);
    setSelected(null);
    setShowWord(options[Math.floor(Math.random() * options.length)]);
  }, [options]);

  // handle success message
  useEffect(() => {
    const timer = setTimeout(() => setStatus("select"), 1000);
    return () => {
      clearTimeout(timer);
    };
  }, [status]);

  return (
    <div className="min-w-[300px] min-h-[200px] w-fit h-fit mx-auto flex flex-col justify-items-stretch gap-4 relative px-10">
      <span className="absolute top-0 left-2">
        {status === "success" ? (
          <BiCheck size={32} className="text-green-500" />
        ) : status === "fail" ? (
          <BiX size={32} className="text-red-600" />
        ) : null}
      </span>
      <div className="w-fit mx-auto">
        <div className="text-destructive_foreground text-center min-w-[300px] text-xl">
          <p className="bg-destructive font-medium p-4 border-b-2 rounded-t-lg">
            {firstLang ? showWord?.second : showWord?.first}
          </p>
          <p className="p-4 bg-accent_foreground text-accent rounded-b-lg min-h-[60px]">
            <span
              className={
                (show ? "opacity-100" : "opacity-0") +
                " duration-500 font-semibold"
              }
            >
              {!newWord ? (firstLang ? showWord?.first : showWord?.second) : ""}
            </span>
          </p>
        </div>
      </div>
      <div className="flex flex-wrap items-center gap-4 mx-auto p-4">
        {options.map((item, index) => {
          return (
            <button
              key={index}
              className="py-2 px-4 bg-destructive text-destructive_foreground font-medium  duration-200 uppercase"
              onClick={() => setSelected(item)}
            >
              {firstLang ? item?.first : item?.second}
            </button>
          );
        })}
      </div>
      <div className="mt-auto flex items-center justify-between gap-4">
        <button
          title="Previous"
          onClick={handlePrev}
          disabled={isFirst}
          className="text-red-600 disabled:text-zinc-500"
        >
          <BiChevronLeft size={40} />
        </button>
        <button
          onClick={() => {
            setNewWord(false);
            setShow((curr) => !curr);
          }}
          className="py-2 px-4 bg-sky-700 text-white font-medium hover:bg-sky-600 duration-200 w-fit"
        >
          {show ? "Hide" : "Show"}
        </button>
        <button
          title="Next"
          onClick={handleNext}
          className="text-red-600 disabled:text-zinc-500"
        >
          <BiChevronRight size={40} />
        </button>
      </div>
    </div>
  );
}
