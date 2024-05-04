import React, { forwardRef } from "react";
import { useRemoveBlockMutation } from "../blocks/blockSlice";
import copy from "copy-to-clipboard";
import { CiEdit, CiHashtag, CiTextAlignLeft, CiTrash } from "react-icons/ci";

const LessonDropDown = forwardRef(
  (
    {
      lesson,
      showDropDown,
      setAddLessonIntro,
      setAddSection,
      setEditLessonTitle,
      setEditLessonDetails,
    },
    ref
  ) => {
    const [removeBlock, { isLoading }] = useRemoveBlockMutation();

    const copyIDtoClipboard = () => {
      const isCopy = copy(lesson?.id);
      if (isCopy) {
        alert("Lesson ID Copied!");
      }
    };

    const handleEditTitle = () => {
      setEditLessonTitle((curr) => !curr);
    };

    const handleEditDetails = () => {
      setEditLessonDetails((curr) => !curr);
    };

    const handleAddIntro = () => {
      setAddLessonIntro((curr) => !curr);
    };

    const handleAddSection = () => {
      setAddSection((curr) => !curr);
    };

    const handleDelete = async () => {
      if (confirm("Delete this lesson?")) {
        await removeBlock(lesson?.id);
        alert("Lesson Deleted");
      }
    };

    return (
      <ul
        ref={ref}
        className={
          (showDropDown ? "" : "-translate-y-2 opacity-0 invisible") +
          " section-dropdown"
        }
      >
        <li className="dropdown-title">Add...</li>
        <li>
          <button title="Add Introduction" onClick={handleAddIntro}>
            <CiTextAlignLeft size={32} />
            <span>Introduction</span>
          </button>
        </li>
        <li>
          <button title="Add Section" onClick={handleAddSection}>
            <CiTextAlignLeft size={32} />
            <span>Section</span>
          </button>
        </li>
        <li className="dropdown-title">Edit...</li>
        <li title="Edit Lesson Title">
          <button onClick={handleEditTitle}>
            <CiEdit size={32} />
            <span>Title</span>
          </button>
        </li>
        <li title="Edit Lesson Details">
          <button onClick={handleEditDetails}>
            <CiEdit size={32} />
            <span>Details</span>
          </button>
        </li>
        <li title="Copy Section ID">
          <button onClick={copyIDtoClipboard}>
            <CiHashtag size={32} />
            <span>Copy Lesson ID</span>
          </button>
        </li>
        <li title="Delete Section">
          <button onClick={handleDelete}>
            <CiTrash size={32} />
            <span>Delete</span>
          </button>
        </li>
      </ul>
    );
  }
);

export default LessonDropDown;
