import React from "react";
import { BsArrowBarUp } from "react-icons/bs";
import { CiEdit } from "react-icons/ci";
import { useSelector } from "react-redux";
import { selectEditMode } from "../globals/globalsSlice";

export default function TableTitle({ table, setEdit, setMove }) {
  return (
    <div className="w-full">
      <div className="group relative">
        <p>{table?.title}</p>
        <p>{table?.subtitle}</p>
      </div>
      <div>{table?.text}</div>
    </div>
  );
}
