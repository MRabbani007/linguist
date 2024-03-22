import React, { useContext, useState } from "react";
import { MdOutlineDarkMode, MdDarkMode } from "react-icons/md";
import { FaTimes } from "react-icons/fa";
import { GlobalContext } from "../context/GlobalState";

const CardThemes = () => {
  const [edit, setEdit] = useState(false);
  // const { handleTheme } = useContext(GlobalContext);
  const handleTheme = () => {};

  return (
    <div className="inline-block">
      {!edit ? (
        <MdOutlineDarkMode className="icon" onClick={() => setEdit(true)} />
      ) : (
        <>
          <span
            className="bg-red-600 w-10 h-10 py-1 px-2 border-[1px] border-white rounded-lg cursor-pointer"
            onClick={() => {
              handleTheme("red");
              setEdit(false);
            }}
          >
            R
          </span>
          <span
            className="bg-sky-800 mx-2 w-10 h-10 py-1 px-2 border-[1px] border-white rounded-lg cursor-pointer"
            onClick={() => {
              handleTheme("blue");
              setEdit(false);
            }}
          >
            B
          </span>
          <span
            className="bg-black mr-2 w-10 h-10 py-1 px-2 border-[1px] border-white rounded-lg cursor-pointer"
            onClick={() => {
              handleTheme("black");
              setEdit(false);
            }}
          >
            B
          </span>
          <span>
            <FaTimes
              className="icon"
              onClick={() => {
                setEdit(false);
              }}
            />
          </span>
        </>
      )}
    </div>
  );
};

export default CardThemes;
