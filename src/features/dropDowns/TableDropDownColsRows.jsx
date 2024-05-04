import React, { forwardRef } from "react";
import { TABLE } from "../../data/actions";

const TableDropDownColsRows = forwardRef(
  ({ table, showDropDown, dispatch }, ref) => {
    return (
      <ul
        ref={ref}
        className={
          (showDropDown ? "" : "-translate-y-2 opacity-0 invisible") +
          " section-dropdown text-black"
        }
      >
        <li>
          <button
            onClick={() => {
              dispatch({ type: TABLE.SET_ADD_COLTITLE });
            }}
          >
            <span>Add Titles Column</span>
          </button>
        </li>
        <li>
          <button
            onClick={() => {
              dispatch({ type: TABLE.SET_ADD_COL });
            }}
          >
            <span>Add Column</span>
          </button>
        </li>
        <li>
          <button
            onClick={() => {
              dispatch({ type: TABLE.SET_ADD_ROW });
            }}
          >
            <span>Add Row</span>
          </button>
        </li>
      </ul>
    );
  }
);

export default TableDropDownColsRows;
