import React, { useState } from "react";
import { CiEdit, CiSquareCheck, CiSquareRemove } from "react-icons/ci";
import { useEditWordDetailsMutation } from "./wordsSlice";
import { useSelector } from "react-redux";
import { selectEditMode } from "../globals/globalsSlice";

const WordImage = ({ displayBlock, word }) => {
  const editMode = useSelector(selectEditMode);
  const [editWordDetails, { isLoading }] = useEditWordDetailsMutation();

  const [image, setImage] = useState(word?.image || "");

  const [editImage, setEditImage] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const newWord = { ...word, image };

      await editWordDetails(newWord).unwrap();

      setEditImage(false);
    } catch (err) {
      console.error("Failed to save the word", err);
    }
  };

  const handleReset = () => {
    setEditImage(false);
  };

  return (
    <div className="flex items-center justify-center">
      {editImage ? (
        <form onSubmit={handleSubmit} onReset={handleReset}>
          <input
            type="text"
            title="Image"
            placeholder="Image"
            autofocus
            value={image}
            onChange={(e) => setImage(e.target.value)}
          />
          <button type="submit">
            <CiSquareCheck />
          </button>
          <button type="reset">
            <CiSquareRemove />
          </button>
        </form>
      ) : word?.image ? (
        <div className="relative group">
          <img
            src={(displayBlock?.imagesURL || "") + word.image}
            alt=""
            className="max-w-[100px] max-h-[100px]"
          />
          {editMode && (
            <button
              className="absolute top-0 right-0 invisible group-hover:visible"
              onClick={() => setEditImage(!editImage)}
            >
              <CiEdit size={34} />
            </button>
          )}
        </div>
      ) : editMode ? (
        <button onClick={() => setEditImage(!editImage)}>Add Image</button>
      ) : null}
    </div>
  );
};

export default WordImage;
