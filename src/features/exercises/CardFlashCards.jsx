import React, { useEffect, useState } from "react";
import { BiCheck, BiX } from "react-icons/bi";
import { toast } from "react-toastify";

export default function CardFlashCards({
  word,
  firstLang = true,
  options = [],
}) {
  const [show, setShow] = useState(false);
  const [newWord, setNewWord] = useState(true);
  const [status, setStatus] = useState("select");

  const [showWord, setShowWord] = useState(
    options[Math.floor(Math.random() * options.length)]
  );

  const [selected, setSelected] = useState(null);

  useEffect(() => {
    if (selected?.id && selected?.id === showWord?.id) {
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
        <div className="text-white text-center min-w-[300px] text-xl">
          <p className="bg-orange-600 font-medium p-4 border-b-2 rounded-t-lg">
            {firstLang ? showWord?.second : showWord?.first}
          </p>
          <p className="p-4 bg-yellow-500 rounded-b-lg min-h-[60px]">
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
      <div className="flex items-center gap-4 mx-auto p-4">
        {options.map((item, index) => {
          return (
            <button
              key={index}
              className="py-2 px-4 bg-lime-700 text-white font-medium hover:bg-lime-600 duration-200 uppercase"
              onClick={() => setSelected(item)}
            >
              {item?.first}
            </button>
          );
        })}
      </div>
      <button
        onClick={() => {
          setNewWord(false);
          setShow((curr) => !curr);
        }}
        className="mt-auto mb-4 mx-auto py-2 px-4 bg-sky-700 text-white font-medium hover:bg-sky-600 duration-200 w-fit"
      >
        {show ? "Hide" : "Show"}
      </button>
    </div>
  );
}
