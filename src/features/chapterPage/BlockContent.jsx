import { useContext, useEffect, useState } from "react";
import { GlobalContext } from "../../context/GlobalState";
import CardTableHeader from "./CardTableHeader";
import CardWord from "./CardWord";
import CardWordEdit from "./CardWordEdit";
import CardWordTable from "./CardWordTable";
import CardWordAdd from "./CardWordAdd";
import CardWordEditDetails from "./CardWordEditDetails";
import CardBlockEditDetails from "./CardBlockEditDetails";
import { CiEdit } from "react-icons/ci";
import CardBlockEditContent from "./CardBlockEditContent";

const BlockContent = ({ colSpan, setColSpan }) => {
  const { words, displayBlock, editMode, displayMode } =
    useContext(GlobalContext);

  const [editWord, setEditWord] = useState({});
  const [editBlockDetails, setEditBlockDetails] = useState(false);

  const [blockWords, setBlockWords] = useState([]);

  const toggleEdit = () => {
    setEditBlockDetails(!editBlockDetails);
  };

  useEffect(() => {
    let temp = words.filter((item) => item.blockID === displayBlock.id);
    setBlockWords(temp);
  }, [displayBlock, words]);

  return (
    <div className="flex flex-col gap-2 w-full p-2">
      <h2 className="font-bold text-xl text-center my-2 p-3 bg-slate-200 rounded-lg shadow-md shadow-slate-400 group">
        <span>{displayBlock?.title}</span>
        <span>
          {!!displayBlock?.subtitle ? ", " + displayBlock?.subtitle : ""}
        </span>
        <span>{!!displayBlock?.detail ? ", " + displayBlock?.detail : ""}</span>
        <span>
          <CiEdit
            className="icon invisible group-hover:visible"
            onClick={toggleEdit}
          />
        </span>
      </h2>
      {editBlockDetails && (
        <>
          <CardBlockEditDetails
            editBlockDetails={editBlockDetails}
            toggleEdit={toggleEdit}
          />
          <CardBlockEditContent
            editBlockDetails={editBlockDetails}
            toggleEdit={toggleEdit}
          />
        </>
      )}
      {displayBlock?.introduction ? (
        <div className="">{displayBlock.introduction}</div>
      ) : null}
      {displayMode === "list" ? (
        <table>
          <CardTableHeader
            colSpan={colSpan}
            setColSpan={setColSpan}
            displayBlock={displayBlock}
          />
          <tbody className="">
            {Array.isArray(blockWords) &&
              blockWords.map((item, index) => {
                return (
                  <CardWordTable
                    word={item}
                    key={index}
                    index={index}
                    colSpan={colSpan}
                    setColSpan={setColSpan}
                    setEditWord={setEditWord}
                  />
                );
              })}
          </tbody>
        </table>
      ) : (
        <div className="flex flex-row flex-wrap gap-3 items-center justify-center">
          {Array.isArray(blockWords) &&
            blockWords.map((item, index) => {
              return (
                <CardWord
                  word={item}
                  key={index}
                  index={index}
                  colSpan={colSpan}
                  setColSpan={setColSpan}
                  setEditWord={setEditWord}
                />
              );
            })}
        </div>
      )}
      {!!editWord?.first && (
        <>
          <CardWordEdit
            word={editWord}
            colSpan={colSpan}
            setColSpan={setColSpan}
            setEditWord={setEditWord}
          />
          <CardWordEditDetails word={editWord} setEditWord={setEditWord} />
        </>
      )}
      {editMode && (
        <div className="w-fit mx-auto">
          <CardWordAdd colSpan={colSpan} setColSpan={setColSpan} />
        </div>
      )}
      {displayBlock?.caption ? <div className="">Caption:</div> : null}
      {displayBlock?.text ? <div className="">Text:</div> : null}
      {displayBlock?.notes ? <div className="">Notes:</div> : null}
    </div>
  );
};

export default BlockContent;
