import React, { useState } from "react";
import { useEditWordDetailsMutation } from "./wordsSlice";

const imageFileTypes = ["png", "svg", "jpg", "jpeg"];

export default function WordImageEdit({ word, setEdit }) {
  const [editWordDetails, { isLoading }] = useEditWordDetailsMutation();

  const [image, setImage] = useState(word?.image.split(".")[0] || "");
  const [fileType, setFileType] = useState(word?.image.split(".")[1] ?? "png");
  const [input, setInput] = useState("");

  const canSave = fileType === "other" ? input !== "" : true;

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (canSave) {
        const newImage = fileType === "other" ? input : fileType;
        const newWord = { ...word, image: image + "." + newImage };

        await editWordDetails(newWord).unwrap();
        setEdit(false);
      }
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
          <div className="flex items-center gap-3">
            {imageFileTypes.map((type, index) => {
              return (
                <div key={index} className="flex items-center gap-2">
                  <input
                    id={"file_type_" + type}
                    type="radio"
                    name="file_type"
                    checked={fileType === type}
                    value={type}
                    onChange={(e) => setFileType(e.target.value)}
                  />
                  <label htmlFor={"file_type_" + type}>{type}</label>
                </div>
              );
            })}
            <div className="flex items-center gap-2">
              <input
                id={"file_type_other"}
                type="radio"
                name="file_type"
                checked={fileType === "other"}
                value={"other"}
                onChange={(e) => setFileType(e.target.value)}
              />
              <label htmlFor={"file_type_other"}>Other</label>
            </div>
            <div
              className={
                (fileType === "other"
                  ? "field"
                  : "opacity-0 invisible -translate-x-4") + " duration-200"
              }
            >
              <label htmlFor={"file_type_input"} className="field__label">
                File Type
              </label>
              <input
                id={"file_type_input"}
                type="text"
                placeholder="Image File Type"
                className="field__input"
                value={input}
                onChange={(e) => setInput(e.target.value)}
              />
            </div>
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
