import React, { useState } from "react";
import { useAddSectionListItemMutation } from "./sectionListSlice";
import { toast } from "react-toastify";

export default function ListItemAdd({ list, setAdd }) {
  const [addListItem, { isLoading }] = useAddSectionListItemMutation();

  const [item, setItem] = useState("");

  const canSave = !isLoading;

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (canSave) {
      const itemData = {
        id: list?.id,
        item,
      };
      await addListItem(itemData);
      toast.success("List Point Added");
    }
  };

  const handleReset = () => {
    setAdd(false);
  };

  return (
    <div className="form-container">
      <form onSubmit={handleSubmit} onReset={handleReset}>
        <h2>Add List Point</h2>
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
            <button type="submit" title="Add" className="add">
              Add
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
