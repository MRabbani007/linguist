import React, { useState } from "react";
import { selectAllChapters } from "../chapters/chapterSlice";
import { useEditBlockHeaderMutation } from "./blockSlice";
import { useSelector } from "react-redux";
import { CiSquareCheck, CiSquareRemove } from "react-icons/ci";

const SectionHeaderEdit = ({ section, setEditSectionHeader }) => {
  const chapters = useSelector(selectAllChapters);
  const [editBlockHeader, { isLoading }] = useEditBlockHeaderMutation();

  const [title, setTitle] = useState(section?.title);
  const [subtitle, setSubtitle] = useState(section?.subtitle);
  const [detail, setDetail] = useState(section?.detail);
  const [chapterID, setChapterID] = useState(section?.chapterID);
  const [lessonNo, setLessonNo] = useState(section?.lessonNo || 0);

  const canSave = !isLoading; //[title, subtitle, detail].every(Boolean) &&

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (canSave) {
      try {
        let newBlock = {
          ...section,
          title,
          subtitle,
          detail,
          lessonNo,
        };
        if (chapterID !== undefined) {
          newBlock.chapterID = chapterID;
        }
        await editBlockHeader(newBlock).unwrap();
        setEditSectionHeader((curr) => !curr);
      } catch (err) {
        console.error("Failed to save the chapter", err);
      }
    }
  };

  const handleReset = () => {
    setEditSectionHeader((curr) => !curr);
  };

  const menuOptions =
    Array.isArray(chapters) &&
    chapters.map((item) => {
      return (
        <option value={item?.id} key={item?.id}>
          {item?.title}
        </option>
      );
    });

  return (
    <form
      onSubmit={handleSubmit}
      onReset={handleReset}
      className="flex flex-col gap-1"
    >
      <div className="flex gap-3 items-stretch">
        <input
          name="lessonNo"
          type="text"
          placeholder="Number"
          title="Lesson Number"
          value={lessonNo}
          onChange={(e) => {
            setLessonNo(e.target.value);
          }}
          className="w-[100px]"
        />
        <input
          name="title"
          type="text"
          placeholder="Lesson Title"
          title="Lesson Title"
          value={title}
          onChange={(e) => {
            setTitle(e.target.value);
          }}
          className="flex-1"
        />
        <select
          name="chapter_id"
          id="chapter_id"
          required
          value={chapterID}
          onChange={(e) => setChapterID(e.target.value)}
        >
          <option value="">Select Chapter</option>
          {menuOptions}
        </select>
      </div>
      <div className="flex gap-3 items-center">
        <input
          name="subtitle"
          type="text"
          placeholder="Sub Title"
          value={subtitle}
          onChange={(e) => {
            setSubtitle(e.target.value);
          }}
        />
        <input
          name="detail"
          type="text"
          placeholder="Detail"
          value={detail}
          onChange={(e) => {
            setDetail(e.target.value);
          }}
        />
        <button type="submit">
          <CiSquareCheck size={34} />
        </button>
        <button type="reset">
          <CiSquareRemove size={34} />
        </button>
      </div>
    </form>
  );
};

export default SectionHeaderEdit;
