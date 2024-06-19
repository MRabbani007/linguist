import React, { useState } from "react";
import { useAddSectionListItemMutation } from "./sectionListSlice";
import { toast } from "react-toastify";
import FormContainer from "../components/FormContainer";

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

  return (
    <FormContainer
      type="add"
      title="Add List Point"
      onSubmit={handleSubmit}
      closeForm={setAdd}
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
