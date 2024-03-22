import { useContext, useState } from "react";
import { CiEdit, CiSquareCheck, CiTrash } from "react-icons/ci";
import { GlobalContext } from "../../context/GlobalState";
import { FaEye, FaEyeSlash } from "react-icons/fa6";

const CardWordTable = ({ word, index, colSpan, setColSpans, setEditWord }) => {
  const { words, handleWordDelete, displayBlock } = useContext(GlobalContext);

  const deleteWord = () => {
    handleWordDelete(word.id);
  };

  const [show, setShow] = useState(false);

  const handleShowWord = () => {
    setShow(!show);
  };

  return (
    <tr className="group">
      <td>{index + 1}</td>
      <td>{word?.first}</td>
      <td>{word?.second}</td>
      {colSpan > 4 ? <td>{word?.third}</td> : null}
      {colSpan > 5 ? <td>{word?.fourth}</td> : null}
      {/* <td>
        {show ? (
          <FaEyeSlash onClick={handleShowWord} />
        ) : (
          <FaEye onClick={handleShowWord} />
        )}
      </td> */}
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
    </tr>
  );
};

export default CardWordTable;
