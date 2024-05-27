import { useEffect, useRef, useState } from "react";
import TableEditContent from "./TableEditContent";
import { CiEdit } from "react-icons/ci";
import TableEditHeaders from "./TableEditHeaders";
import { useSelector } from "react-redux";
import { selectEditMode } from "../globals/globalsSlice";
import TableEditLessonID from "./TableEditLessonID";
import TableTitle from "./TableTitle";
import TableDropDown from "../dropDowns/TableDropDown";
import { BsThreeDots } from "react-icons/bs";
import { IoAdd } from "react-icons/io5";
import FormTableWordAdd from "./FormTableWordAdd";
import FormTableWordEdit from "./FormTableWordEdit";

export default function TableCard({ table, tableWords }) {
  const editMode = useSelector(selectEditMode);

  const [showRowName, setShowRowName] = useState(table?.showRows);

  // Toggle Edit Table Content / headers
  const [viewEditTitle, setViewEditTitle] = useState(false);
  const [editHeaders, setEditHeaders] = useState(false);
  const [editLessonID, setEditLessonID] = useState(false);

  // Toggle Edit/Add
  const [addWord, setAddWord] = useState(null);
  const [editWord, setEditWord] = useState(null);

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

  return (
    <div className="flex flex-col gap-1 items-center">
      {viewEditTitle ? (
        <TableEditContent table={table} setEdit={setViewEditTitle} />
      ) : editLessonID ? (
        <TableEditLessonID table={table} setEdit={setEditLessonID} />
      ) : null}
      <TableTitle table={table} />
      {editHeaders ? (
        <TableEditHeaders table={table} setEdit={setEditHeaders} />
      ) : (
        <table className="lesson-table">
          {editMode || table?.caption !== "" ? (
            <caption className="group relative">
              <span>{table?.caption ? table?.caption : "Add Caption"}</span>
              {editMode && (
                <button
                  ref={dropDownButtonRef}
                  onClick={() => setShowDropDown(true)}
                  title="Edit Table"
                  className="inline invisible group-hover:visible"
                >
                  <BsThreeDots size={28} className="inline" />
                </button>
              )}
              <TableDropDown
                showDropDown={showDropDown}
                ref={dropDownRef}
                table={table}
                setViewEditTitle={setViewEditTitle}
                setViewEditHeaders={setEditHeaders}
                setViewMoveTable={setEditLessonID}
              />
            </caption>
          ) : null}
          <thead>
            {table.colsTitles.length !== 0 && (
              <tr>
                {showRowName && <th></th>}
                {Array.isArray(table?.colsTitles) &&
                  table.colsTitles.map((colTitle, index) => {
                    return (
                      <th
                        key={index}
                        scope="col"
                        colSpan={table?.colsTitlesColSpan[index]}
                        className=""
                      >
                        {colTitle}
                      </th>
                    );
                  })}
                {editMode ? <th scope="col"></th> : null}
              </tr>
            )}
            {table?.cols.length !== 0 && (
              <tr>
                {showRowName && <th></th>}
                {table?.cols.map((col, index) => {
                  return (
                    <th
                      key={index}
                      scope="col"
                      colSpan={table?.colsColSpan[index]}
                    >
                      {col}
                    </th>
                  );
                })}
                {editMode ? (
                  <th scope="col">
                    <button
                      title="Add Word After"
                      onClick={() => setAddWord(0)}
                    >
                      <IoAdd size={28} />
                    </button>
                  </th>
                ) : null}
              </tr>
            )}
          </thead>
          <tbody>
            {Array.isArray(tableWords) && tableWords.length !== 0
              ? tableWords.map((word, idx) => {
                  return Array.isArray(word?.cases) ? (
                    <tr key={idx} onClick={() => console.log(word)}>
                      {showRowName ? (
                        <th scope="row">{table.rows[idx]}</th>
                      ) : null}
                      {table.cols.map((col, index) => {
                        return <td key={index}>{word.cases[index] ?? ""}</td>;
                      })}
                      {editMode ? (
                        <td>
                          <button
                            title="Edit Word"
                            onClick={() => setEditWord(word)}
                          >
                            <CiEdit size={28} />
                          </button>
                          <button
                            title="Add Word After"
                            onClick={() => setAddWord(idx + 1)}
                          >
                            <IoAdd size={28} />
                          </button>
                        </td>
                      ) : null}
                    </tr>
                  ) : null;
                })
              : null}
          </tbody>
        </table>
      )}
      <div>{table?.notes}</div>
      {addWord !== null ? (
        <FormTableWordAdd table={table} index={addWord} setAdd={setAddWord} />
      ) : null}
      {editWord !== null ? (
        <FormTableWordEdit
          table={table}
          word={editWord}
          setEdit={setEditWord}
        />
      ) : null}
    </div>
  );
}
