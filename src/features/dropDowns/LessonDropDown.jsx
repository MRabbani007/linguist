import React, { forwardRef } from "react";
import { useRemoveBlockMutation } from "../blocks/blockSlice";
import copy from "copy-to-clipboard";
import { CiEdit, CiHashtag, CiTextAlignLeft, CiTrash } from "react-icons/ci";
import { toast } from "react-toastify";
import { RxSection, RxTextAlignLeft } from "react-icons/rx";
import { IoCopyOutline } from "react-icons/io5";

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
        toast.success("Lesson ID Copied!");
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
        toast.success("Lesson Deleted");
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
            <RxTextAlignLeft size={32} />
            <span>Introduction</span>
          </button>
          <button title="Add Section" onClick={handleAddSection}>
            <RxSection size={32} />
            <span>Section</span>
          </button>
        </li>
        <li className="dropdown-title">Edit...</li>
        <li>
          <button title="Edit Lesson Title" onClick={handleEditTitle}>
            <CiEdit size={32} />
            <span>Title</span>
          </button>
          <button title="Edit Lesson Details" onClick={handleEditDetails}>
            <CiEdit size={32} />
            <span>Details</span>
          </button>
        </li>
        <li>
          <button title="Copy Section ID" onClick={copyIDtoClipboard}>
            <IoCopyOutline size={30} />
            <span>Copy Lesson ID</span>
          </button>
          <button title="Delete Section" onClick={handleDelete}>
            <CiTrash size={32} />
            <span>Delete</span>
          </button>
        </li>
      </ul>
    );
  }
);

export default LessonDropDown;
