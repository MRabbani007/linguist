import { useEffect, useRef, useState } from "react";
import { useEditTableHeadersMutation } from "./tablesSlice";
import { BsThreeDots } from "react-icons/bs";
import TableDropDownColsRows from "../dropDowns/TableDropDownColsRows";
import { TABLE } from "../../data/actions";
import FormTableHeaders from "./FormTableHeaders";

export default function TableEditHeaders({ table, setEdit }) {
  const [editTableHeaders, { isLoading }] = useEditTableHeadersMutation();

  const [showDropDown, setShowDropDown] = useState(false);

  const dropDownRef = useRef();
  const dropDownButtonRef = useRef();

  const handleDropDown = (e) => {
    if (!dropDownRef?.current?.contains(e.target)) {
      setShowDropDown(false);
      if (dropDownButtonRef.current?.contains(e.target)) {
        setShowDropDown(true);
      } else {
        setShowDropDown(false);
      }
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleDropDown);
    return () => {
      document.removeEventListener("mousedown", handleDropDown);
    };
  }, []);

  const [editType, setEditType] = useState(null);
  const [editIndex, setEditIndex] = useState(null);
  const [state, setState] = useState(table);

  const dispatch = ({ type, payload }) => {
    console.log(type);
    switch (type) {
      case TABLE.SET_EDIT_CAPTION: {
        setEditType(TABLE.CAPTION);
        break;
      }
      case TABLE.SET_ADD_COLTITLE: {
        setEditType(TABLE.ADD_COLTITLE);
        setEditIndex(payload ?? state?.colsTitles.length);
        break;
      }
      case TABLE.SET_ADD_COL: {
        setEditType(TABLE.ADD_COL);
        setEditIndex(payload ?? state?.cols.length);
        break;
      }
      case TABLE.SET_ADD_ROW: {
        setEditType(TABLE.ADD_ROW);
        setEditIndex(payload ?? state?.rows.length);
        break;
      }
      case TABLE.SET_EDIT_COLTITLE: {
        setEditType(TABLE.EDIT_COLTITLE);
        setEditIndex(payload);
        break;
      }
      case TABLE.SET_EDIT_COL: {
        setEditType(TABLE.EDIT_COL);
        setEditIndex(payload);
        break;
      }
      case TABLE.SET_EDIT_ROW: {
        setEditType(TABLE.EDIT_ROW);
        setEditIndex(payload);
        break;
      }
      case TABLE.CAPTION: {
        setState((curr) => {
          return { ...curr, caption: payload.value };
        });
        setEditType(null);
        break;
      }
      case TABLE.ADD_COLTITLE: {
        setState((curr) => {
          const newColsTitles = [...curr.colsTitles];
          newColsTitles.splice(editIndex, 0, payload?.value);
          const newColsTitleColSpan = [...curr.colsTitlesColSpan];
          newColsTitleColSpan.splice(editIndex, 0, payload?.colSpan);
          return {
            ...curr,
            colsTitles: newColsTitles,
            colsTitlesColSpan: newColsTitleColSpan,
          };
        });

        setEditType(null);
        setEditIndex(null);
        alert("Col Added");
        break;
      }
      case TABLE.ADD_COL: {
        setState((curr) => {
          const newCols = [...curr.cols];
          newCols.splice(editIndex, 0, payload?.value);
          const newColsColSpan = [...curr.colsColSpan];
          newColsColSpan.splice(editIndex, 0, payload?.colSpan);
          return {
            ...curr,
            cols: newCols,
            colsColSpan: newColsColSpan,
          };
        });

        setEditType(null);
        setEditIndex(null);
        alert("Col Added");
        break;
      }
      case TABLE.ADD_ROW: {
        setState((curr) => {
          const newRows = [...curr.rows];
          newRows.splice(editIndex, 0, payload?.value);
          return {
            ...curr,
            rows: newRows,
          };
        });

        setEditType(null);
        setEditIndex(null);
        alert("Row Added");
        break;
      }
      case TABLE.EDIT_COLTITLE: {
        setState((curr) => {
          const newColsTitles = [...curr.colsTitles];
          newColsTitles.splice(editIndex, 1, payload?.value);
          const newColsTitleColSpan = [...curr.colsTitlesColSpan];
          newColsTitleColSpan.splice(editIndex, 1, payload?.colSpan);
          return {
            ...curr,
            colsTitles: newColsTitles,
            colsTitlesColSpan: newColsTitleColSpan,
          };
        });

        setEditType(null);
        setEditIndex(null);
        alert("Col Modified");
        break;
      }
      case TABLE.EDIT_COL: {
        setState((curr) => {
          const newCols = [...curr.cols];
          newCols.splice(editIndex, 1, payload?.value);
          const newColsColSpan = [...curr.colsColSpan];
          newColsColSpan.splice(editIndex, 1, payload?.colSpan);
          return {
            ...curr,
            cols: newCols,
            colsColSpan: newColsColSpan,
          };
        });

        setEditType(null);
        setEditIndex(null);
        alert("Col Modified");
        break;
      }
      case TABLE.EDIT_ROW: {
        console.log(editIndex, payload);
        setState((curr) => {
          const newRows = [...curr.rows];
          newRows.splice(editIndex, 1, payload?.value);
          return {
            ...curr,
            rows: newRows,
          };
        });

        setEditType(null);
        setEditIndex(null);
        alert("Row Modified");
        break;
      }
      case TABLE.DELETE_COLTITLE: {
        setState((curr) => {
          const newColsTitles = [...curr.colsTitles];
          newColsTitles.splice(editIndex, 1);
          const newColsTitleColSpan = [...curr.colsTitlesColSpan];
          newColsTitleColSpan.splice(editIndex, 1);
          return {
            ...curr,
            colsTitles: newColsTitles,
            colsTitlesColSpan: newColsTitleColSpan,
          };
        });

        setEditType(null);
        setEditIndex(null);
        alert("Col Deleted");
        break;
      }
      case TABLE.DELETE_COL: {
        setState((curr) => {
          const newCols = [...curr.cols];
          newCols.splice(editIndex, 1);
          const newColsColSpan = [...curr.colsColSpan];
          newColsColSpan.splice(editIndex, 1);
          return {
            ...curr,
            cols: newCols,
            colsColSpan: newColsColSpan,
          };
        });

        setEditType(null);
        setEditIndex(null);
        alert("Col Deleted");
        break;
      }
      case TABLE.DELETE_ROW: {
        setState((curr) => {
          const newRows = [...curr.rows];
          newRows.splice(editIndex, 1);
          return {
            ...curr,
            rows: newRows,
          };
        });

        setEditType(null);
        setEditIndex(null);
        alert("Row Modified");
        break;
      }
      default: {
        setEditType(null);
        setEditIndex(null);
      }
    }
  };

  const canSave = !isLoading && !showDropDown;

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (canSave) {
      await editTableHeaders(state);
      alert("Table Modified");
      setEdit(false);
    }
  };

  const handleReset = () => {
    setEdit(false);
  };

  return (
    <>
      <form
        name="edit_table_headers"
        onSubmit={handleSubmit}
        onReset={handleReset}
        className="flex flex-col items-center justify-center gap-3"
      >
        <table className="lesson-table">
          <caption>
            <div className="flex flex-1 items-center gap-3 relative px-3">
              <span
                onClick={() =>
                  dispatch({ type: TABLE.SET_EDIT_CAPTION, payload: null })
                }
                className="flex-1"
              >
                {state?.caption}
              </span>
              <button
                type="button"
                ref={dropDownButtonRef}
                title="Edit Section"
                onClick={() => setShowDropDown(true)}
              >
                <BsThreeDots size={28} />
              </button>
              <TableDropDownColsRows
                table={table}
                ref={dropDownRef}
                showDropDown={showDropDown}
                dispatch={dispatch}
              />
            </div>
          </caption>
          <thead>
            {state?.colsTitles.length !== 0 ? (
              <tr>
                <th className="bg-transparent"></th>
                {state?.colsTitles.map((colTitle, index) => {
                  return (
                    <th
                      key={index}
                      colSpan={state?.colsTitlesColSpan[index]}
                      className="text-center"
                      onClick={() =>
                        dispatch({
                          type: TABLE.SET_EDIT_COLTITLE,
                          payload: index,
                        })
                      }
                    >
                      {colTitle}
                    </th>
                  );
                })}
              </tr>
            ) : null}
            {state?.cols.length !== 0 && (
              <tr>
                <th></th>
                {state?.cols.map((col, index) => {
                  return (
                    <th
                      key={index}
                      colSpan={state?.colsColSpan[index]}
                      onClick={() =>
                        dispatch({ type: TABLE.SET_EDIT_COL, payload: index })
                      }
                    >
                      {col}
                    </th>
                  );
                })}
              </tr>
            )}
          </thead>
          <tbody>
            {state?.rows.map((row, index) => {
              return (
                <tr key={"row_" + index}>
                  <th
                    onClick={() =>
                      dispatch({ type: TABLE.SET_EDIT_ROW, payload: index })
                    }
                  >
                    {row}
                  </th>
                  {state?.cols.map((col, idx) => {
                    return (
                      <td
                        colSpan={state?.colsColSpan[idx]}
                        key={"col_" + idx}
                      ></td>
                    );
                  })}
                </tr>
              );
            })}
          </tbody>
        </table>
        <div className="flex items-center gap-3">
          <button type="submit" title="Save" className="btn btn-blue">
            Save
          </button>
          <button type="reset" title="Cancel" className="btn btn-red">
            Cancel
          </button>
        </div>
      </form>
      {editType !== null ? (
        <FormTableHeaders type={editType} dispatch={dispatch} />
      ) : null}
    </>
  );
}
