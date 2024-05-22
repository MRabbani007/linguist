import React, { useState } from "react";
import { useAddTableMutation } from "./tablesSlice";
import { CiCirclePlus, CiSquarePlus, CiSquareRemove } from "react-icons/ci";
import {
  tableTemplateAdjective,
  tableTemplatePronouns,
  tableTemplateVerb,
} from "../../data/templates";
import { toast } from "react-toastify";

export default function TableAdd({ lessonID, sectionID = "", setAdd }) {
  const [addTable, { isLoading }] = useAddTableMutation();

  const [title, setTitle] = useState("");
  const [subtitle, setSubtitle] = useState("");
  const [text, setText] = useState("");
  const [notes, setNotes] = useState("");
  const [sortIndex, setSortIndex] = useState(99);

  const canSave = !isLoading;

  const [template, setTemplate] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    let table;
    if (template === "Verb") {
      table = {
        ...tableTemplateVerb,
        id: crypto.randomUUID(),
        lessonID,
        sectionID,
      };
    } else if (template === "Pronoun") {
      table = {
        ...tableTemplatePronouns,
        id: crypto.randomUUID(),
        lessonID,
        sectionID,
      };
    } else if (template === "Adjective") {
      table = {
        ...tableTemplateAdjective,
        id: crypto.randomUUID(),
        lessonID,
        sectionID,
      };
    } else {
      table = {
        id: crypto.randomUUID(),
        lessonID,
        sectionID,
        title,
        subtitle,
        text,
        notes,
        caption: "",
        sortIndex,
        showRows: false,
      };
    }

    if (canSave) {
      await addTable(table);
      toast.success("Table Created");
      setAdd(false);
    }
  };

  const handleReset = () => {
    setAdd(false);
  };

  return (
    <div className="form-container">
      <form onSubmit={handleSubmit} onReset={handleReset} className="">
        <h2>Add Table</h2>
        <div>
          <div className="field_group">
            <div className="field">
              <label htmlFor="table_title" className="field__label">
                Title
              </label>
              <input
                id="table_title"
                name="table_title"
                type="text"
                title="Title"
                placeholder="Title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="field__input"
              />
            </div>
            <div className="field">
              <label htmlFor="table_subtitle" className="field__label">
                Sub-Title
              </label>
              <input
                id="table_subtitle"
                name="table_subtitle"
                type="text"
                title="Sub-Title"
                placeholder="Sub-Title"
                value={subtitle}
                onChange={(e) => setSubtitle(e.target.value)}
                className="field__input"
              />
            </div>
          </div>
          <div className="field  w-full">
            <label htmlFor="table_text" className="field__label">
              Text
            </label>
            <input
              id="table_text"
              name="table_text"
              type="text"
              title="Table Text"
              placeholder="Table Text"
              value={text}
              onChange={(e) => setText(e.target.value)}
              className="field__input"
            />
          </div>
          <div className="field_group">
            <div className="field">
              <label htmlFor="table_sortIndex" className="field__label">
                Sort Index
              </label>
              <input
                id="table_sortIndex"
                name="table_sortIndex"
                type="text"
                title="sortIndex"
                placeholder="sortIndex"
                value={sortIndex}
                onChange={(e) => setSortIndex(e.target.value)}
                className="field__input"
              />
            </div>
            <div className="field">
              <label htmlFor="table_note" className="field__label">
                Note
              </label>
              <input
                id="table_note"
                name="table_note"
                type="text"
                title="Note"
                placeholder="Note"
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                className="field__input"
              />
            </div>
          </div>
          <div className="field_group">
            <input
              id="radio_blank"
              type="radio"
              name="template"
              checked={template === ""}
              value={""}
              onChange={(e) => setTemplate(e.target.value)}
            />
            <label htmlFor="radio_blank">Blank Table</label>
            <input
              id="radio_template_verb"
              type="radio"
              name="template"
              value={"Verb"}
              checked={template === "Verb"}
              onChange={(e) => setTemplate(e.target.value)}
            />
            <label htmlFor="radio_template_verb">Verb</label>
            <input
              id="radio_template_pronoun"
              type="radio"
              name="template"
              value={"Pronoun"}
              checked={template === "Pronoun"}
              onChange={(e) => setTemplate(e.target.value)}
            />
            <label htmlFor="radio_template_pronoun">Pronoun</label>
            <input
              id="radio_template_adjective"
              type="radio"
              name="template"
              value={"Adjective"}
              checked={template === "Adjective"}
              onChange={(e) => setTemplate(e.target.value)}
            />
            <label htmlFor="radio_template_adjective">Adjective</label>
          </div>
          <p className="form-buttons">
            <button type="submit" title="Add" className="add">
              Add Table
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
