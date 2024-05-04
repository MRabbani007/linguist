import React, { useState } from "react";
import { CiEdit, CiSquareCheck, CiSquareRemove } from "react-icons/ci";
import { useEditWordDetailsMutation } from "./wordsSlice";
import { useSelector } from "react-redux";
import { selectEditMode } from "../globals/globalsSlice";

const WordImage = ({ displayBlock, word, addImage, setAddImage }) => {
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
      setAddImage(false);
    } catch (err) {
      console.error("Failed to save the word", err);
    }
  };

  const handleReset = () => {
    setEditImage(false);
    setAddImage(false);
  };

  return (
    <div className="flex items-center justify-center">
      {editImage || addImage ? (
        <div className="form-container">
          <form onSubmit={handleSubmit} onReset={handleReset}>
            <h2>Edit Word Image</h2>
            <div>
              <div className="field">
                <label htmlFor="image_url" className="field__label">
                  Image URL
                </label>
                <input
                  type="text"
                  title="Image"
                  id="image_url"
                  name="image_url"
                  placeholder="Image"
                  autoFocus
                  value={image}
                  onChange={(e) => setImage(e.target.value)}
                  className="field__input"
                />
              </div>
              <div className="form-buttons">
                <button type="submit" title="Save" className="add">
                  Save
                </button>
                <button type="reset" title="Cancel" className="cancel">
                  Cancel
                </button>
              </div>
            </div>
          </form>
        </div>
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
      ) : null}
    </div>
  );
};

export default WordImage;
