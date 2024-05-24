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
import {
  BsBoxArrowUpRight,
  BsChatLeftText,
  BsTextParagraph,
} from "react-icons/bs";
import { RxTextAlignLeft } from "react-icons/rx";
import { PiListBullets } from "react-icons/pi";
import { VscWholeWord } from "react-icons/vsc";
import { IoCopyOutline } from "react-icons/io5";

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
          <button title="Move Section" onClick={() => setEditLessonID(true)}>
            <BsBoxArrowUpRight size={25} />
            <span>Move</span>
          </button>
          <button title="Copy Section ID" onClick={copyIDtoClipboard}>
            <IoCopyOutline size={30} />
            <span>Copy ID</span>
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

export default SectionDropDown;
