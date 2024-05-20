import { forwardRef } from "react";
import copy from "copy-to-clipboard";
import {
  CiCirclePlus,
  CiEdit,
  CiHashtag,
  CiTextAlignLeft,
  CiTrash,
  CiViewTable,
} from "react-icons/ci";
import { useRemoveSectionMutation } from "./sectionSlice";
import { CgDetailsMore } from "react-icons/cg";
import { toast } from "react-toastify";
import { BsBoxArrowUpRight } from "react-icons/bs";

const SectionDropDown = forwardRef(
  (
    {
      section,
      showDropDown,
      setEditTitle,
      setEditLessonID,
      setAddIntro,
      setAddDef,
      setAddTable,
      setAddList,
      setAddWord,
      setAddSentence,
    },
    ref
  ) => {
    const [removeSection, { isLoading }] = useRemoveSectionMutation();

    const copyIDtoClipboard = () => {
      const isCopy = copy(section?.id);
      if (isCopy) {
        toast.success("Section ID Copied");
      }
    };

    const handleDelete = async () => {
      if (confirm("Delete this section?")) {
        await removeSection(section?.id);
        toast.success("Section Deleted");
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
          <button title="Add Introduction" onClick={() => setAddIntro(true)}>
            <CiTextAlignLeft size={32} />
            <span>Introduction</span>
          </button>
        </li>
        <li>
          <button title="Add Definition" onClick={() => setAddDef(true)}>
            <CgDetailsMore size={32} />
            <span>Definition</span>
          </button>
        </li>
        <li>
          <button title="Add List" onClick={() => setAddList(true)}>
            <CgDetailsMore size={32} />
            <span>List</span>
          </button>
        </li>
        <li>
          <button title="Add Table" onClick={() => setAddTable(true)}>
            <CiViewTable size={32} />
            <span>Table</span>
          </button>
        </li>
        <li>
          <button title="Add Word" onClick={() => setAddWord(true)}>
            <CiCirclePlus size={32} />
            <span>Word</span>
          </button>
        </li>
        <li>
          <button title="Add Word" onClick={() => setAddSentence(true)}>
            <CiCirclePlus size={32} />
            <span>Sentence</span>
          </button>
        </li>
        <li className="dropdown-title">Edit...</li>
        <li title="Edit Section Title">
          <button onClick={() => setEditTitle(true)}>
            <CiEdit size={32} />
            <span>Title</span>
          </button>
        </li>
        <li title="Edit Section Title">
          <button onClick={() => setEditLessonID(true)}>
            <BsBoxArrowUpRight size={25} />
            <span>Move</span>
          </button>
        </li>
        <li title="Copy Section ID">
          <button onClick={copyIDtoClipboard}>
            <CiHashtag size={32} />
            <span>Copy ID</span>
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

export default SectionDropDown;
