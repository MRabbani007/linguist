import React, { useState } from "react";
import { useEditWordDetailsMutation } from "./wordsSlice";

export default function WordImageEdit({ word, setEdit }) {
  const [editWordDetails, { isLoading }] = useEditWordDetailsMutation();

  const [image, setImage] = useState(word?.image || "");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const newWord = { ...word, image };

      await editWordDetails(newWord).unwrap();
      console.log(newWord);
      setEdit(false);
    } catch (err) {
      console.error("Failed to save the word", err);
    }
  };

  const handleReset = () => {
    setEdit(false);
  };

  return (
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
  );
}
