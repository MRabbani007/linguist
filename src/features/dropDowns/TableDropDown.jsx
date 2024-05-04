import { forwardRef } from "react";
import { useRemoveWordMutation } from "../words/wordsSlice";
import { CiEdit, CiTextAlignLeft, CiTrash, CiViewColumn } from "react-icons/ci";
import { useRemoveTableMutation } from "../tables/tablesSlice";
import { BsArrowBarUp } from "react-icons/bs";

const TableDropDown = forwardRef(
  (
    {
      table,
      showDropDown,
      setViewEditTitle,
      setViewEditHeaders,
      setViewMoveTable,
    },
    ref
  ) => {
    const [removeTable, { isLoading }] = useRemoveTableMutation();

    const handleEditTitle = () => {
      setViewEditTitle(true);
    };

    const handleEditHeaders = () => {
      setViewEditHeaders(true);
    };

    const handleMoveTable = () => {
      setViewMoveTable(true);
    };

    const handleDelete = async () => {
      if (confirm("Delete this Table?")) {
        await removeTable(table?.id);
        alert("Table Deleted");
      }
    };

    return (
      <ul
        ref={ref}
        className={
          (showDropDown ? "" : "-translate-y-2 opacity-0 invisible") +
          " section-dropdown text-black"
        }
      >
        <li className="dropdown-title">Edit...</li>
        <li title="Edit Title">
          <button onClick={handleEditTitle}>
            <CiEdit size={32} />
            <span>Title</span>
          </button>
        </li>
        <li title="Edit Cols/Rows">
          <button onClick={handleEditHeaders}>
            <CiViewColumn size={32} />
            <span>Cols/Rows</span>
          </button>
        </li>
        <li title="Move Table">
          <button onClick={handleMoveTable}>
            <BsArrowBarUp size={32} />
            <span>Move Table</span>
          </button>
        </li>
        <li title="Delete Word">
          <button onClick={handleDelete}>
            <CiTrash size={32} />
            <span>Delete</span>
          </button>
        </li>
      </ul>
    );
  }
);

export default TableDropDown;
