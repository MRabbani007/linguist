import React, { useState } from "react";
import { useEditSectionListItemMutation } from "./sectionListSlice";
import { toast } from "react-toastify";

export default function ListItemEdit({ list, editItem, setEdit }) {
  const [editListItem, { isLoading }] = useEditSectionListItemMutation();
  const [item, setItem] = useState(list?.items[editItem]);

  const canSave = !isLoading;

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (canSave) {
      const itemData = {
        id: list?.id,
        index: editItem,
        item,
      };
      await editListItem(itemData);
      setEdit(null);
      toast.success("List Point Saved");
    }
  };

  const handleReset = () => {
    setEdit(null);
  };

  return (
    <div className="form-container">
      <form onSubmit={handleSubmit} onReset={handleReset}>
        <h2>Edit List Point</h2>
        <div className="">
          <div className="field">
            <label htmlFor="item" className="field__label">
              List Point
            </label>
            <input
              id="item"
              type="text"
              title="List Point"
              placeholder="List Point"
              value={item}
              onChange={(e) => setItem(e.target.value)}
              className="field__input"
            />
          </div>
          <p className="form-buttons">
            <button type="submit" title="Save" className="add">
              Save
            </button>
            <button type="reset" title="Cancel" className="cancel">
              Cancel
            </button>
          </p>
        </div>
      </form>
    </div>
  );
}
