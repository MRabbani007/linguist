import { forwardRef } from "react";
import copy from "copy-to-clipboard";
import { ToastContainer, toast } from "react-toastify";
import {
  CiEdit,
  CiHashtag,
  CiTextAlignLeft,
  CiTrash,
  CiViewTable,
} from "react-icons/ci";
import { useRemoveSectionMutation } from "./sectionSlice";
import { CgDetailsMore } from "react-icons/cg";

const SectionDropDown = forwardRef(
  (
    {
      section,
      showDropDown,
      setEditTitle,
      setAddIntro,
      setAddDef,
      setAddTable,
    },
    ref
  ) => {
    const [removeSection, { isLoading }] = useRemoveSectionMutation();

    const copyIDtoClipboard = () => {
      const isCopy = copy(section?.id);
      if (isCopy) {
        toast.success("Section ID Copied!");
      }
    };

    const handleEditTitle = () => {
      setEditTitle((curr) => !curr);
    };

    const handleAddIntro = () => {
      setAddIntro((curr) => !curr);
    };

    const handleAddTable = () => {
      setAddTable((curr) => !curr);
    };

    const handleAddDefinition = () => {
      setAddDef((curr) => !curr);
    };

    const handleDelete = async () => {
      if (confirm("Delete this section?")) {
        await removeSection(section?.id);
        alert("Section Deleted");
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
          <button title="Add Definition" onClick={handleAddDefinition}>
            <CgDetailsMore size={32} />
            <span>Definition</span>
          </button>
        </li>
        <li>
          <button title="Add Table" onClick={handleAddTable}>
            <CiViewTable size={32} />
            <span>Table</span>
          </button>
        </li>
        <li className="dropdown-title">Edit...</li>
        <li title="Edit Section Title">
          <button onClick={handleEditTitle}>
            <CiEdit size={32} />
            <span>Title</span>
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
