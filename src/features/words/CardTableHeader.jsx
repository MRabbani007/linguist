import { useState } from "react";
import { CiCircleRemove, CiEdit } from "react-icons/ci";
import { IoAdd } from "react-icons/io5";
import { useSelector } from "react-redux";
import {
  selectDisplayBlock,
  selectEditMode,
  selectLanguagesCount,
} from "../globals/globalsSlice";

const CardTableHeader = ({ toggleEdit }) => {
  const displayBlock = useSelector(selectDisplayBlock);
  const languagesCount = useSelector(selectLanguagesCount);
  const editMode = useSelector(selectEditMode);

  // TODO: implement add language
  const handleAddLanguage = () => {};

  // TODO: implement delete language
  const handleDeleteLanguage = (colIndex) => {};

  return (
    <thead>
      <tr>
        <th colSpan={languagesCount + 2} className="group">
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
        {languagesCount > 2 ? (
          <th>
            <span>{displayBlock?.thirdLang}</span>
          </th>
        ) : null}
        {languagesCount > 3 ? (
          <th>
            <span>{displayBlock?.fourthLang}</span>
          </th>
        ) : null}
        {languagesCount > 3 && editMode ? (
          <th>
            <span>Edit</span>
          </th>
        ) : (
          editMode && (
            <th>
              <IoAdd className="icon" onClick={handleAddLanguage} />
            </th>
          )
        )}
      </tr>
    </thead>
  );
};

export default CardTableHeader;
