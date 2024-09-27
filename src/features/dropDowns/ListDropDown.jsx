import React, { forwardRef } from "react";
import { useRemoveSectionListMutation } from "../sectionList/sectionListSlice";
import { CiEdit, CiTextAlignLeft, CiTrash } from "react-icons/ci";
import { toast } from "react-toastify";

// TODO: not in use, Remove
const ListDropDown = forwardRef(
  (
    { list, showDropDown, setEditContent, setEditLessonID, setAddItem },
    ref
  ) => {
    const [removeSectionList, { isLoading }] = useRemoveSectionListMutation();

    const handleDelete = async () => {
      if (confirm("Delete this List?")) {
        await removeSectionList(list?.id);
        toast.success("List Deleted");
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
          <button title="Add Item" onClick={() => setAddItem(true)}>
            <CiTextAlignLeft size={32} />
            <span>Item</span>
          </button>
        </li>
        <li className="dropdown-title">Edit...</li>
        <li>
          <button
            title="Edit List Content"
            onClick={() => setEditContent(true)}
          >
            <CiEdit size={32} />
            <span>Content</span>
          </button>
        </li>
        <li>
          <button
            title="Edit List LessonID"
            onClick={() => setEditLessonID(true)}
          >
            <CiEdit size={32} />
            <span>LessonID</span>
          </button>
        </li>
        <li title="Delete List">
          <button onClick={handleDelete}>
            <CiTrash size={32} />
            <span>Delete</span>
          </button>
        </li>
      </ul>
    );
  }
);

export default ListDropDown;
