import { useContext, useState } from "react";
import { CiEdit, CiSquareCheck, CiTrash } from "react-icons/ci";
import { GlobalContext } from "../../context/GlobalState";
import { FaEye, FaEyeSlash } from "react-icons/fa6";

const CardWord = ({ word, index, colSpan, setColSpans, setEditWord }) => {
  const { words, handleWordDelete, displayBlock, editMode } =
    useContext(GlobalContext);

  const deleteWord = () => {
    handleWordDelete(word.id);
  };

  const [show, setShow] = useState(false);

  const handleShowWord = () => {
    setShow(!show);
  };

  return (
    <div className="flex flex-col justify-center min-w-[200px] shrink-0 group">
      <div className="flex justify-between items-center bg-red-500 rounded-t-lg py-2 px-4">
        <span>{index + 1 + " / " + words?.length}</span>
        <span className="invisible group-hover:visible">
          {editMode && (
            <>
              <CiEdit
                className="icon mr-1 cursor-pointer"
                onClick={() => {
                  setEditWord(word);
                }}
              />
              <CiTrash className="icon" onClick={deleteWord} />
            </>
          )}
        </span>
      </div>
      <div className="flex flex-col py-2 px-4 gap-3 bg-slate-200">
        <div>
          <span className="font-semibold">{displayBlock?.firstLang}:</span>
          <span className="ml-2">{word?.first}</span>
        </div>
        <div>
          <span className="font-semibold">{displayBlock?.secondLang}:</span>
          <span className="ml-2">{word?.second}</span>
        </div>
        {colSpan > 4 ? (
          <div>
            <span className="font-semibold">{displayBlock?.thirdLang}:</span>
            <span className="ml-2">{word?.third}</span>
          </div>
        ) : null}
        {colSpan > 5 ? (
          <div>
            <span className="font-semibold">{displayBlock?.fourthLang}:</span>
            <span className="ml-2">{word?.fourth}</span>
          </div>
        ) : null}
      </div>
      <div className="flex items-center justify-between px-4 py-2 bg-red-500 rounded-b-lg">
        <span></span>
        <span className="cursor-pointer">
          {show ? (
            <FaEyeSlash onClick={handleShowWord} />
          ) : (
            <FaEye onClick={handleShowWord} />
          )}
        </span>
      </div>
    </div>
  );
};

export default CardWord;
