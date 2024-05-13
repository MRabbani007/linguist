import React, { useState } from "react";
import { useSelector } from "react-redux";
import { selectDisplayChapter } from "../globals/globalsSlice";
import { useAddBlockMutation } from "./blockSlice";

export default function LessonAdd() {
  const displayChapter = useSelector(selectDisplayChapter);

  const [addBlock, { isLoading }] = useAddBlockMutation();

  const [add, setAdd] = useState(false);
  const [statusMessage, setStatusMessage] = useState(null);

  const [title, setTitle] = useState("");
  const [subtitle, setSubtitle] = useState("");
  const [detail, setDetail] = useState("");
  const [lessonNo, setLessonNo] = useState(0);

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
          lessonNo,
          firstLang: "",
          secondLang: "",
          thirdLang: "",
          fourthLang: "",
          introduction: [],
          caption: "",
          notes: "",
          text: "",
          imagesURL: "",
          createDate: new Date(),
        };
        const res = await addBlock(block).unwrap();
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
    <>
      <button className="btn btn-yellow mx-auto" onClick={() => setAdd(!add)}>
        Add Lesson
      </button>
      {add && (
        <div className="form-container">
          <form onSubmit={handleSubmit} onReset={handleReset}>
            <h2>Add Lesson</h2>
            <div>
              <div className="field_group">
                <div className="field">
                  <label htmlFor="title" className="field__label">
                    Lesson Title
                  </label>
                  <input
                    type="text"
                    id="title"
                    name="title"
                    placeholder="Lesson Title"
                    title="Lesson Title"
                    className="field__input"
                    value={title}
                    onChange={(e) => {
                      setTitle(e.target.value);
                    }}
                  />
                </div>
                <div className="field">
                  <label htmlFor="subtitle" className="field__label">
                    Sub-Title
                  </label>
                  <input
                    type="text"
                    id="subtitle"
                    name="subtitle"
                    placeholder="Sub Title"
                    className="field__input"
                    value={subtitle}
                    onChange={(e) => {
                      setSubtitle(e.target.value);
                    }}
                  />
                </div>
              </div>
              <div className="field_group">
                <div className="field max-w-[25%]">
                  <label htmlFor="lessonNo" className="field__label">
                    Number
                  </label>
                  <input
                    type="text"
                    id="lessonNo"
                    name="lessonNo"
                    placeholder="Number"
                    title="Lesson Number"
                    className="field__input"
                    value={lessonNo}
                    onChange={(e) => {
                      setLessonNo(e.target.value);
                    }}
                  />
                </div>
                <div className="field">
                  <label htmlFor="detail" className="field__label">
                    Detail
                  </label>
                  <input
                    type="text"
                    id="detail"
                    name="detail"
                    placeholder="Detail"
                    className="field__input"
                    value={detail}
                    onChange={(e) => {
                      setDetail(e.target.value);
                    }}
                  />
                </div>
              </div>
              <p className="form-buttons">
                <button type="submit" title="Add" className="add">
                  Save
                </button>
                <button type="reset" title="Cancel" className="cancel">
                  Cancel
                </button>
              </p>
            </div>
          </form>
        </div>
      )}
    </>
  );
}
