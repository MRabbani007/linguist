import { useContext, useEffect, useState } from "react";
import { GlobalContext } from "../../context/GlobalState";
import CardTableHeader from "./CardTableHeader";
import CardWord from "./CardWord";
import CardWordEdit from "./CardWordEdit";
import CardWordTable from "./CardWordTable";
import CardWordAdd from "./CardWordAdd";

const BlockContent = ({ colSpan, setColSpan }) => {
  const { words, displayBlock, editMode } = useContext(GlobalContext);

  const [editWord, setEditWord] = useState({});

  const [blockWords, setBlockWords] = useState([]);

  useEffect(() => {
    let temp = words.filter((item) => item.blockID === displayBlock.id);
    setBlockWords(temp);
  }, [displayBlock, words]);

  return (
    <div className="flex flex-col gap-2 w-full p-2">
      <h2 className="font-bold text-xl text-center my-2 p-3 bg-slate-200 rounded-lg shadow-md shadow-slate-400">
        {displayBlock?.title +
          (!!displayBlock?.subtitle ? ", " + displayBlock?.subtitle : "") +
          (!!displayBlock?.detail ? ", " + displayBlock?.detail : "")}
      </h2>
      {displayBlock?.introduction ? (
        <div className="">Introduction:</div>
      ) : null}
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
      {!!editWord?.first && (
        <CardWordEdit
          word={editWord}
          colSpan={colSpan}
          setColSpan={setColSpan}
          setEditWord={setEditWord}
        />
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
