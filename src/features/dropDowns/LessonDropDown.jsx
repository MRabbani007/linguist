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

    return (
      <div
        ref={ref}
        className={
          (showDropDown ? "" : "-translate-y-2 opacity-0 invisible") +
          " absolute top-full right-0 bg-zinc-200 text-zinc-900"
        }
      >
        <p className="py-2 px-4 bg-zinc-300 font-semibold">Add...</p>
        <ul className="flex items-center">
          <li className="py-2 px-4">
            <button
              title="Add Introduction"
              onClick={() => setAddLessonIntro(true)}
            >
              <RxTextAlignLeft size={32} />
              {/* <span>Introduction</span> */}
            </button>
          </li>
          <li className="py-2 px-4">
            <button title="Add Section" onClick={() => setAddSection(true)}>
              <RxSection size={32} />
              {/* <span>Section</span> */}
            </button>
          </li>
        </ul>
      </div>
    );
  }
);

export default LessonDropDown;
