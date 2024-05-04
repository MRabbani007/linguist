import { useEffect, useRef, useState } from "react";
import TableEditContent from "./TableEditContent";
import {
  CiCirclePlus,
  CiEdit,
  CiSquareCheck,
  CiSquareRemove,
} from "react-icons/ci";
import TableEditHeaders from "./TableEditHeaders";
import { useSelector } from "react-redux";
import { selectEditMode } from "../globals/globalsSlice";
import {
  useAddTableWordMutation,
  useEditTableWordMutation,
} from "../tableWords/tableWordsSlice";
import TableEditLessonID from "./TableEditLessonID";
import TableTitle from "./TableTitle";
import TableDropDown from "../dropDowns/TableDropDown";
import { BsThreeDots } from "react-icons/bs";

export default function TableCard({ table, tableWords }) {
  const editMode = useSelector(selectEditMode);
  const [addTableWord, { isLoading }] = useAddTableWordMutation();
  const [editTableWord, { isLoading: isLoadingTableWord }] =
    useEditTableWordMutation();

  // Toggle Edit Table Content / headers
  const [viewEditTitle, setViewEditTitle] = useState(false);
  const [editHeaders, setEditHeaders] = useState(false);
  const [editLessonID, setEditLessonID] = useState(false);

  // Toggle Edit/Add
  const [addWord, setAddWord] = useState(false);
  const [editWordIndex, setEditWordIndex] = useState(null);

  // Store edit word
  const [editWord, setEditWord] = useState(null);

  const [newWord, setNewWord] = useState({
    id: crypto.randomUUID(),
    lessonID: table?.lessonID,
    tableID: table?.id,
    baseWord: "",
    cases: new Array(table?.rows.length).fill(""),
    translation: new Array(table?.rows.length).fill(""),
    pronunce: new Array(table?.rows.length).fill(""),
    sortIndex: 0,
  });

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

  const handleSetEditWord = (colIndex) => {
    if (tableWords.length) {
      setEditWordIndex(Math.floor(colIndex / 2));
      setEditWord(tableWords[Math.floor(colIndex / 2)]);
    }
  };

  const handleEditWordCase = (caseIndex, value) => {
    const temp = { ...editWord, cases: [...editWord.cases] };
    temp.cases.splice(caseIndex, 1, value);
    setEditWord(temp);
  };

  const handleEditWordTranslation = (translationIndex, value) => {
    const temp = { ...editWord, translation: [...editWord.translation] };
    temp.translation.splice(translationIndex, 1, value);
    setEditWord(temp);
  };

  const handleSaveEdit = async () => {
    await editTableWord(editWord);
    setEditWordIndex(null);
    setEditWord(null);
    alert("Word Modified");
  };

  const handleResetEdit = () => {
    setEditWordIndex(null);
    setEditWord(null);
  };

  const handleSubmit = async () => {
    await addTableWord(newWord);
    setAddWord(false);
    alert("New Word Added");
  };

  const handleReset = () => {
    setAddWord(false);
  };

  return (
    <div>
      {viewEditTitle ? (
        <TableEditContent table={table} setEdit={setViewEditTitle} />
      ) : editLessonID ? (
        <TableEditLessonID table={table} setEdit={setEditLessonID} />
      ) : (
        <TableTitle table={table} />
      )}
      {editHeaders ? (
        <TableEditHeaders table={table} setEdit={setEditHeaders} />
      ) : (
        <table className="lesson-table">
          <caption className="group relative">
            <span>{table?.caption || "Add Caption"}</span>
            {editMode && (
              <button
                ref={dropDownButtonRef}
                onClick={() => setShowDropDown(true)}
                title="Edit Table"
                className="invisible group-hover:visible"
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
          <thead>
            {table.colsTitles.length !== 0 && (
              <tr>
                <th></th>
                {Array.isArray(table?.colsTitles) &&
                  table.colsTitles.map((colTitle, index) => {
                    return (
                      <th
                        key={index}
                        scope="col"
                        colSpan={table?.colsTitlesColSpan[index] + 2}
                        className=""
                      >
                        {colTitle}
                      </th>
                    );
                  })}
              </tr>
            )}
            {table?.cols.length !== 0 && (
              <tr>
                <th></th>
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
                <th></th>
                <th></th>
              </tr>
            )}
          </thead>
          <tbody>
            {table?.rows.map((row, index) => {
              return (
                <tr key={"row_" + index}>
                  <th scope="row" className="w-fit whitespace-nowrap">
                    {row}
                  </th>
                  {Array.isArray(tableWords) && tableWords.length !== 0
                    ? tableWords.map((word, idx) => {
                        if (idx === editWordIndex) {
                          return (
                            <td key={"col_" + idx} colSpan={2}>
                              <input
                                type="text"
                                title="Word Case"
                                placeholder="Word Case"
                                value={editWord?.cases[index]}
                                onChange={(e) =>
                                  handleEditWordCase(index, e.target.value)
                                }
                              />
                              <input
                                type="text"
                                title="Word Translation"
                                placeholder="Word Translation"
                                value={editWord?.translation[index]}
                                onChange={(e) =>
                                  handleEditWordTranslation(
                                    index,
                                    e.target.value
                                  )
                                }
                              />
                            </td>
                          );
                        } else {
                          return (
                            <>
                              <td key={"col_" + idx}>{word?.cases[index]}</td>
                              <td key={"col_" + idx + "_2"}>
                                {word?.translation[index]}
                              </td>
                            </>
                          );
                        }
                      })
                    : table?.cols.map((col, idx) => {
                        return (
                          <td
                            colSpan={table?.colsColSpan[idx]}
                            key={"col_" + idx}
                          ></td>
                        );
                      })}
                  {addWord ? (
                    <>
                      <td>
                        <input
                          type="text"
                          value={newWord.cases[index]}
                          onChange={(e) =>
                            setNewWord((curr) => {
                              curr.cases[index] = e.target.value;
                              return { ...curr };
                            })
                          }
                        />
                      </td>
                      <td>
                        <input
                          type="text"
                          value={newWord.translation[index]}
                          onChange={(e) =>
                            setNewWord((curr) => {
                              curr.translation[index] = e.target.value;
                              return { ...curr };
                            })
                          }
                        />
                      </td>
                    </>
                  ) : (
                    <>
                      <td></td>
                      <td></td>
                    </>
                  )}
                </tr>
              );
            })}
            {editMode ? (
              <tr>
                <th scope="row"></th>
                {Array.isArray(tableWords) && tableWords.length !== 0
                  ? tableWords.map((word, idx) => {
                      if (idx === editWordIndex) {
                        return (
                          <td key={"edit_col_" + idx} colSpan={2}>
                            <button title="Save Edit" onClick={handleSaveEdit}>
                              <CiSquareCheck size={32} />
                            </button>
                            <button
                              title="Cancel Edit"
                              onClick={handleResetEdit}
                            >
                              <CiSquareRemove size={32} />
                            </button>
                          </td>
                        );
                      } else {
                        return (
                          <td key={"edit_col_" + idx} colSpan={2}>
                            {editMode && (
                              <button onClick={() => handleSetEditWord(idx)}>
                                <CiEdit size={32} />
                              </button>
                            )}
                          </td>
                        );
                      }
                    })
                  : table?.cols.map((col, idx) => {
                      return (
                        <td
                          key={"edit_col_" + idx}
                          colSpan={table?.colsColSpan[idx]}
                        >
                          {idx}
                        </td>
                      );
                    })}
                <td>
                  {addWord ? (
                    <>
                      <button onClick={handleSubmit}>
                        <CiSquareCheck size={32} />
                      </button>
                      <button onClick={handleReset}>
                        <CiSquareRemove size={32} />
                      </button>
                    </>
                  ) : editMode ? (
                    <button onClick={() => setAddWord(true)}>
                      <CiCirclePlus size={32} />
                    </button>
                  ) : null}
                </td>
                <td></td>
              </tr>
            ) : null}
          </tbody>
        </table>
      )}
      <div>{table?.notes}</div>
    </div>
  );
}
