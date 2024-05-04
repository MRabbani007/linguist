import { useState } from "react";
import { CiSquarePlus, CiSquareRemove } from "react-icons/ci";

import { useAddBlockMutation } from "./blockSlice";
import { useSelector } from "react-redux";
import { selectDisplayChapter } from "../globals/globalsSlice";

const CardBlockAdd = () => {
  const displayChapter = useSelector(selectDisplayChapter);

  const [addBlock, { isLoading }] = useAddBlockMutation();

  const [add, setAdd] = useState(false);

  const [title, setTitle] = useState("");
  const [subtitle, setSubtitle] = useState("");
  const [detail, setDetail] = useState("");

  const canSave = !isLoading; //[title, subtitle, detail].every(Boolean) &&

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (canSave) {
      try {
        let block = {
          id: crypto.randomUUID(),
          chapterID: displayChapter.id,
          title,
          subtitle,
          detail,
          firstLang: "",
          secondLang: "",
          thirdLang: "",
          fourthLang: "",
          introduction: "",
          caption: "",
          notes: "",
          text: "",
          imagesURL: "",
          createDate: new Date(),
        };
        const res = await addBlock(block).unwrap();
        console.log(res);
        // setAdd(false);
      } catch (err) {
        console.error("Failed to add the section", err);
      }
    }
  };

  const handleReset = () => {
    setAdd(false);
  };

  return (
    <div className="flex flex-col gap-2">
      <button className="btn btn-yellow mx-auto" onClick={() => setAdd(!add)}>
        Add Lesson
      </button>
      <form
        onSubmit={handleSubmit}
        onReset={handleReset}
        className={
          (add
            ? "visible opacity-100 translate-y-0"
            : "invisible opacity-0 -translate-y-3") +
          " flex flex-wrap justify-center items-center gap-2 duration-200"
        }
      >
        <input
          type="text"
          id="section_title"
          name="section_title"
          value={title}
          placeholder="Section Title"
          onChange={(e) => setTitle(e.target.value)}
          className="border-2 rounded-md"
        />
        <input
          type="text"
          id="section_subtitle"
          name="section_subtitle"
          value={subtitle}
          placeholder="Section Sub-Title"
          onChange={(e) => setSubtitle(e.target.value)}
          className="border-2 rounded-md"
        />
        <input
          type="text"
          id="section_detail"
          name="section_detail"
          value={detail}
          placeholder="Detail"
          onChange={(e) => setDetail(e.target.value)}
          className="border-2 rounded-md"
        />
        <button type="submit">
          <CiSquarePlus className="icon text-green-600" />
        </button>
        <button type="reset">
          <CiSquareRemove className="icon text-red-600" />
        </button>
      </form>
      <div className="hidden">
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
            value={subtitle}
            placeholder="Section Sub-Title"
            className="field__input"
            onChange={(e) => setSubtitle(e.target.value)}
          />
        </div>
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
      </div>
    </div>
  );
};

export default CardBlockAdd;
