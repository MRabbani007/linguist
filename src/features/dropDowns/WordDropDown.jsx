import { forwardRef } from "react";
import { useRemoveWordMutation } from "../words/wordsSlice";
import { CiEdit, CiImageOn, CiTextAlignLeft, CiTrash } from "react-icons/ci";
import { BiMove } from "react-icons/bi";
import { toast } from "react-toastify";
import { BsBoxArrowUpRight, BsTextParagraph } from "react-icons/bs";
import { HiOutlineArrowsPointingOut } from "react-icons/hi2";

const WordDropDown = forwardRef(
  (
    {
      word,
      showDropDown,
      setAddImage,
      setAddSentence,
      setEditWord,
      setViewMoveSection,
      setViewMoveLesson,
    },
    ref
  ) => {
    const [removeWord] = useRemoveWordMutation();

    const handleAddImage = () => {
      setAddImage((curr) => !curr);
    };

    const handleAddSentence = () => {
      setAddSentence((curr) => !curr);
    };

    const handleMoveSection = () => {
      setViewMoveSection((curr) => !curr);
    };

    const handleMoveLesson = () => {
      setViewMoveLesson((curr) => !curr);
    };

    const handleEditWord = () => {
      setEditWord((curr) => !curr);
    };

    const handleDelete = async () => {
      if (confirm("Delete this Word?")) {
        await removeWord(word?.id);
        toast.success("Word Deleted");
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
          <button title="Add Image" onClick={handleAddImage}>
            <CiImageOn size={32} />
            <span>Image</span>
          </button>
          <button title="Add Sentence" onClick={handleAddSentence}>
            <BsTextParagraph size={32} />
            <span>Sentence</span>
          </button>
        </li>
        <li className="dropdown-title">Edit...</li>
        <li>
          <button title="Edit Word" onClick={handleEditWord}>
            <CiEdit size={32} />
            <span>Word</span>
          </button>
          <button title="Move to Section" onClick={handleMoveSection}>
            <HiOutlineArrowsPointingOut size={25} />
            <span>Move to Section</span>
          </button>
          <button title="Move to Lesson" onClick={handleMoveLesson}>
            <BsBoxArrowUpRight size={25} />
            <span>Move to Lesson</span>
          </button>
          <button title="Delete Word" onClick={handleDelete}>
            <CiTrash size={32} />
            <span>Delete</span>
          </button>
        </li>
        <li></li>
      </ul>
    );
  }
);

export default WordDropDown;
