import { forwardRef, useState } from "react";
import copy from "copy-to-clipboard";
import { CiEdit, CiImageOn, CiViewTable } from "react-icons/ci";
import { toast } from "react-toastify";
import {
  BsBoxArrowUpRight,
  BsChatLeftText,
  BsTextParagraph,
  BsThreeDots,
} from "react-icons/bs";
import { RxTextAlignLeft } from "react-icons/rx";
import { PiListBullets } from "react-icons/pi";
import { VscWholeWord } from "react-icons/vsc";
import { IoCopyOutline } from "react-icons/io5";
import { useSelector } from "react-redux";
import { selectEditMode } from "../admin/adminSlice";

const SectionDropDown = forwardRef(
  (
    {
      section,
      setEditTitle,
      setEditLessonID,
      setEditImage,
      setAddIntro,
      setAddDef,
      setAddTable,
      setAddList,
      setAddWord,
      setAddSentence,
    },
    ref
  ) => {
    const editMode = useSelector(selectEditMode);

    const [showDropDown, setShowDropDown] = useState(false);

    const copyIDtoClipboard = () => {
      const isCopy = copy(section?.id);
      if (isCopy) {
        toast.success("Section ID Copied");
      }
    };

    if (!editMode) return null;

    return (
      <div className="relative" onMouseLeave={() => setShowDropDown(false)}>
        <button
          title="Edit Section"
          onMouseOver={() => setShowDropDown(true)}
          className="ml-auto px-2 "
        >
          <BsThreeDots size={28} className="" />
        </button>
        <ul
          ref={ref}
          className={
            (showDropDown ? "" : "-translate-y-2 opacity-0 invisible") +
            " section-dropdown"
          }
        >
          <li className="dropdown-title">Add...</li>
          <li className="flex flex-row flex-wrap gap-2 items-center justify-start">
            <button title="Add Introduction" onClick={() => setAddIntro(true)}>
              <RxTextAlignLeft size={32} />
            </button>
            <button title="Add Definition" onClick={() => setAddDef(true)}>
              <BsChatLeftText size={28} />
            </button>
            <button title="Add Table" onClick={() => setAddTable(true)}>
              <CiViewTable size={32} />
            </button>
            <button title="Add List" onClick={() => setAddList(true)}>
              <PiListBullets size={32} />
            </button>
          </li>
          <li>
            <button title="Add Word" onClick={() => setAddWord(true)}>
              <VscWholeWord size={32} />
              <span>Word</span>
            </button>
            <button title="Add Sentence" onClick={() => setAddSentence(true)}>
              <BsTextParagraph size={32} />
              <span>Sentence</span>
            </button>
          </li>
          <li className="dropdown-title">Edit...</li>
          <li>
            <button title="Edit Section" onClick={() => setEditTitle(true)}>
              <CiEdit size={32} />
              <span>Title</span>
            </button>
            <button title="Edit Image" onClick={() => setEditImage(true)}>
              <CiImageOn size={32} />
              <span>Image</span>
            </button>
            <button title="Move Section" onClick={() => setEditLessonID(true)}>
              <BsBoxArrowUpRight size={25} />
              <span>Move</span>
            </button>
            <button title="Copy Section ID" onClick={copyIDtoClipboard}>
              <IoCopyOutline size={30} />
              <span>Copy ID</span>
            </button>
          </li>
        </ul>
      </div>
    );
  }
);

export default SectionDropDown;
