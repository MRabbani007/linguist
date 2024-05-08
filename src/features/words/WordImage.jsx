import React, { useState } from "react";
import { CiEdit, CiSquareCheck, CiSquareRemove } from "react-icons/ci";
import { useEditWordDetailsMutation } from "./wordsSlice";
import { useSelector } from "react-redux";
import { selectEditMode } from "../globals/globalsSlice";

const WordImage = ({ word, imagesURL, setEdit }) => {
  const editMode = useSelector(selectEditMode);

  return (
    <div className="flex items-center justify-center">
      {word?.image ? (
        
      ) : null}
    </div>
  );
};

export default WordImage;
