import React, { useContext, useState } from "react";
import { GlobalContext } from "../../context/GlobalState";
import { CiSquarePlus, CiSquareRemove } from "react-icons/ci";

const CardBlockAdd = () => {
  const { handleBlockAdd } = useContext(GlobalContext);

  const [add, setAdd] = useState(false);

  const [title, setTitle] = useState("");
  const [subTitle, setSubTitle] = useState("");
  const [detail, setDetail] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    handleBlockAdd(title, subTitle);
    setTitle("");
  };

  const handleReset = () => {
    setAdd(false);
  };

  return (
    <div className="flex flex-col gap-2">
      <div className="flex flex-1">
        <button className="btn btn-yellow mx-auto" onClick={() => setAdd(!add)}>
          Add Section
        </button>
      </div>
      <form
        onSubmit={handleSubmit}
        onReset={handleReset}
        className={
          add
            ? "flex flex-col justify-center items-center gap-2 visible translate-y-0 dur"
            : "invisible -translate-y-3"
        }
      >
        <div className="flex gap-2">
          <div className="field">
            <label htmlFor="section_title" className="field__label">
              Section Title
            </label>
            <input
              type="text"
              id="section_title"
              name="section_title"
              value={title}
              placeholder="Section Title"
              className="field__input"
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>
          <div className="field">
            <label htmlFor="section_subtitle" className="field__label">
              Section Sub-Title
            </label>
            <input
              type="text"
              id="section_subtitle"
              name="section_subtitle"
              value={subTitle}
              placeholder="Section Sub-Title"
              className="field__input"
              onChange={(e) => setSubTitle(e.target.value)}
            />
          </div>
        </div>
        <div className="flex gap-2">
          <div className="field">
            <label htmlFor="section_detail" className="field__label">
              Detail
            </label>
            <input
              type="text"
              id="section_detail"
              name="section_detail"
              value={detail}
              placeholder="Detail"
              className="field__input"
              onChange={(e) => setDetail(e.target.value)}
            />
          </div>
          <button type="submit">
            <CiSquarePlus className="icon text-green-600" />
          </button>
          <button type="reset">
            <CiSquareRemove className="icon text-red-600" />
          </button>
        </div>
      </form>
    </div>
  );
};

export default CardBlockAdd;
