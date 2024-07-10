import React, { forwardRef } from "react";
import copy from "copy-to-clipboard";
import { CiEdit, CiTrash } from "react-icons/ci";
import { toast } from "react-toastify";
import { RxSection, RxTextAlignLeft } from "react-icons/rx";

const LessonDropDown = forwardRef(
  ({ lesson, showDropDown, setAddLessonIntro, setAddSection }, ref) => {
    const copyIDtoClipboard = () => {
      const isCopy = copy(lesson?.id);
      if (isCopy) {
        toast.success("Lesson ID Copied!");
      }
    };

    const handleAddIntro = () => {
      setAddLessonIntro((curr) => !curr);
    };

    const handleAddSection = () => {
      setAddSection((curr) => !curr);
    };

    return (
      <ul
        ref={ref}
        className={
          (showDropDown ? "" : "-translate-y-2 opacity-0 invisible") +
          " section-dropdown text-zinc-900"
        }
      >
        <li className="dropdown-title">Add...</li>
        <li>
          <button title="Add Introduction" onClick={handleAddIntro}>
            <RxTextAlignLeft size={32} />
            <span>Introduction</span>
          </button>
        </li>
        <li>
          <button title="Add Section" onClick={handleAddSection}>
            <RxSection size={32} />
            <span>Section</span>
          </button>
        </li>
      </ul>
    );
  }
);

export default LessonDropDown;
