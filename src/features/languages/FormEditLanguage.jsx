import React, { useState } from "react";
import { useSelector } from "react-redux";
import { axiosPrivate } from "../../api/axios";

export default function FormEditLanguage({ language, setEdit }) {
  // const auth = useSelector();

  const [title, setTitle] = useState(language?.title || "");
  const [subtitle, setSubtitle] = useState(language?.subtitle || "");
  const [detail, setDetail] = useState(language?.detail || "");
  const [name, setName] = useState(language?.name || "");
  const [text, setText] = useState(language?.text || "");
  const [image, setImage] = useState(language?.image || "");

  const canSave = true;

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (canSave) {
      const newLanguage = {
        id: language?.id,
        title,
        subtitle,
        detail,
        name,
        text,
        image,
        visible: language?.visible || true,
      };
      let response = await axiosPrivate.patch("/languages", {
        roles: [],
        action: {
          type: "EDIT_LANGUAGE",
          payload: {
            userName: "",
            language: newLanguage,
          },
        },
      });
    }
    setEdit(false);
  };

  const handleReset = () => {
    setEdit(false);
  };
  return (
    <div className="form-container">
      <form onSubmit={handleSubmit} onReset={handleReset}>
        <h2>Add Language</h2>
        <div className="">
          <div className="field_group">
            <div className="field">
              <label htmlFor="title" className="field__label">
                Title
              </label>
              <input
                id="title"
                name="title"
                type="text"
                title="Title"
                placeholder="Title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="field__input"
              />
            </div>
            <div className="field">
              <label htmlFor="subtitle" className="field__label">
                Sub Title
              </label>
              <input
                id="subtitle"
                name="subtitle"
                type="text"
                title="Sub-Title"
                placeholder="Sub-Title"
                value={subtitle}
                onChange={(e) => setSubtitle(e.target.value)}
                className="field__input"
              />
            </div>
          </div>
          <div className="field_group">
            <div className="field">
              <label htmlFor="name" className="field__label">
                Name
              </label>
              <input
                id="name"
                name="name"
                type="text"
                title="Name"
                placeholder="Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="field__input"
              />
            </div>
            <div className="field">
              <label htmlFor="detail" className="field__label">
                Detail
              </label>
              <input
                id="detail"
                name="detail"
                type="text"
                title="Detail"
                placeholder="Detail"
                value={detail}
                onChange={(e) => setDetail(e.target.value)}
                className="field__input"
              />
            </div>
            <div className="field">
              <label htmlFor="image" className="field__label">
                Image
              </label>
              <input
                id="image"
                name="image"
                type="text"
                title="Image"
                placeholder="Image"
                value={image}
                onChange={(e) => setImage(e.target.value)}
                className="field__input"
              />
            </div>
          </div>
          <div className="field w-full">
            <label htmlFor="text" className="field__label">
              Text
            </label>
            <input
              id="text"
              name="text"
              type="text"
              title="Text"
              placeholder="Text"
              value={text}
              onChange={(e) => setText(e.target.value)}
              className="field__input"
            />
          </div>
          <p className="form-buttons">
            <button type="submit" title="Save" className="save">
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
