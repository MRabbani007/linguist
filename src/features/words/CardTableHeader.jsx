import { useState } from "react";
import { CiCircleRemove, CiEdit } from "react-icons/ci";
import { IoAdd } from "react-icons/io5";
import { useSelector } from "react-redux";
import { selectDisplayBlock, selectEditMode } from "../globals/globalsSlice";

const CardTableHeader = ({ colSpan, setColSpan, toggleEdit }) => {
  const displayBlock = useSelector(selectDisplayBlock);
  const editMode = useSelector(selectEditMode);

  const addLanguage = () => {
    if (colSpan === 4) {
      setThirdLang("Third Language");
      setColSpan(5);
      handleBlockEditDetail(
        displayBlock.id,
        firstLang,
        secondLang,
        thirdLang,
        fourthLang
      );
    } else if (colSpan === 5) {
      setFourthLang("Fourth Language");
      setColSpan(6);
      handleBlockEditDetail(
        displayBlock.id,
        firstLang,
        secondLang,
        thirdLang,
        fourthLang
      );
    }
  };

  const handleDeleteCol = (colIndex) => {};

  return (
    <thead>
      <>
        <tr>
          <th colSpan={colSpan} className="group">
            <span>{displayBlock?.title}</span>
            {editMode && (
              <span className="invisible group-hover:visible">
                <CiEdit
                  className="icon"
                  onClick={() => {
                    toggleEdit("header");
                  }}
                />
                <CiCircleRemove
                  className="icon"
                  onClick={() => {
                    handleBlockClose(displayBlock?.id);
                  }}
                />
              </span>
            )}
          </th>
        </tr>
        <tr>
          <th>#</th>
          <th>
            <span>{displayBlock?.firstLang}</span>
          </th>
          <th>
            <span>{displayBlock?.secondLang}</span>
          </th>
          {colSpan > 4 ? (
            <th>
              <span>{displayBlock?.thirdLang}</span>
            </th>
          ) : null}
          {colSpan > 5 ? (
            <th>
              <span>{displayBlock?.fourthLang}</span>
            </th>
          ) : null}
          {colSpan > 5 ? (
            <th>
              <span>Edit</span>
            </th>
          ) : (
            <th>
              {editMode && <IoAdd className="icon" onClick={addLanguage} />}
            </th>
          )}
        </tr>
      </>
    </thead>
  );
};

export default CardTableHeader;
