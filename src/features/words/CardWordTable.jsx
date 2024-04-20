import { useState } from "react";
import { CiEdit, CiTrash } from "react-icons/ci";
import { useDispatch, useSelector } from "react-redux";
import { selectEditMode, selectLanguagesCount } from "../globals/globalsSlice";
import { useRemoveWordMutation } from "./wordsSlice";

const CardWordTable = ({ word, index, setEditWord }) => {
  const languagesCount = useSelector(selectLanguagesCount);
  const editMode = useSelector(selectEditMode);
  const [removeWord, { isLoading }] = useRemoveWordMutation();
  const dispatch = useDispatch();

  const canSave = !isLoading;

  const deleteWord = () => {
    confirm("Delete this word?");
    if (canSave) {
      dispatch(removeWord(word?.id));
    }
  };

  return (
    <tr className="group">
      <td>{index + 1}</td>
      <td>{word?.first}</td>
      <td>{word?.second}</td>
      {languagesCount > 2 ? <td>{word?.third}</td> : null}
      {languagesCount > 3 ? <td>{word?.fourth}</td> : null}
      {editMode && (
        <td>
          <span className="invisible group-hover:visible">
            <CiEdit
              className="icon mr-1 cursor-pointer"
              onClick={() => {
                setEditWord(word);
              }}
            />
            <CiTrash className="icon" onClick={deleteWord} />
          </span>
        </td>
      )}
    </tr>
  );
};

export default CardWordTable;
