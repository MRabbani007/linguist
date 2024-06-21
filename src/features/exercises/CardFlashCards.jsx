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
    if (selected?.id === showWord?.id) {
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
    <div className="border-2 border-red-600 min-w-[300px] min-h-[200px] w-fit h-fit mx-auto flex flex-col justify-items-stretch gap-4">
      <div className="font-medium p-4 bg-red-600 text-white w-full text-center flex items-center">
        <span className="flex-1">
          {firstLang ? showWord?.second : showWord?.first}
        </span>
      </div>
      <div className="w-full relative">
        <span className="absolute top-0 left-2">
          {status === "success" ? (
            <BiCheck size={32} className="text-green-500" />
          ) : status === "fail" ? (
            <BiX size={32} className="text-red-600" />
          ) : null}
        </span>
        <p
          className={
            (show ? "opacity-100" : "opacity-0") +
            " duration-500 font-semibold text-xl text-center p-4 text-zinc-900 h-full w-full relative"
          }
        >
          {!newWord ? (firstLang ? showWord?.first : showWord?.second) : ""}
        </p>
      </div>
      <div className="flex items-center gap-4 mx-auto p-4">
        {options.map((item, index) => {
          return (
            <button
              key={index}
              className="btn btn-red"
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
        className="mt-auto mb-4 mx-auto py-2 px-4 bg-red-600 text-white font-medium hover:bg-red-700 duration-200 w-fit"
      >
        {show ? "Hide" : "Show"}
      </button>
    </div>
  );
}
