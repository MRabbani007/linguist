import React, { useState } from "react";
import { useEditSectionListItemMutation } from "./sectionListSlice";
import { toast } from "react-toastify";
import FormContainer from "../components/FormContainer";

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

  return (
    <FormContainer
      type="edit"
      title="Edit List Point"
      onSubmit={handleSubmit}
      closeForm={setEdit}
    >
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
    </FormContainer>
  );
}
