import { useState } from "react";
import CardTableHeader from "../words/CardTableHeader";
import CardWord from "../words/CardWord";
import CardWordEdit from "../words/CardWordEdit";
import CardWordTable from "../words/CardWordTable";
import CardWordAdd from "../words/CardWordAdd";
import CardWordEditDetails from "../words/CardWordEditDetails";
import CardBlockEditDetails from "./CardBlockEditDetails";
import CardBlockEditContent from "./CardBlockEditContent";
import { CiEdit } from "react-icons/ci";
import { useGetWordsQuery } from "../words/wordsSlice";
import { useSelector } from "react-redux";
import {
  selectDisplayBlock,
  selectDisplayMode,
  selectEditMode,
} from "../globals/globalsSlice";
import CardBlockEditHeader from "./CardBlockEditHeader";

const BlockContent = ({ colSpan, setColSpan }) => {
  const displayBlock = useSelector(selectDisplayBlock);
  const displayMode = useSelector(selectDisplayMode);
  const editMode = useSelector(selectEditMode);

  const [editWord, setEditWord] = useState({});
  const [editBlockTab, setEditBlockTab] = useState("");

  const {
    data: words,
    isLoading,
    isSuccess,
    isError,
    error,
  } = useGetWordsQuery(displayBlock?.id);

  let content;
  if (isLoading) {
    content = <p>"Loading..."</p>;
  } else if (isSuccess) {
    // destructure words from normalized object
    const { ids, entities } = words;
    if (displayMode === "block") {
      content = ids.map((id, index) => (
        <CardWord
          word={entities[id]}
          key={id}
          index={index}
          colSpan={colSpan}
          setColSpan={setColSpan}
          setEditWord={setEditWord}
        />
      ));
    } else if (displayMode === "list") {
      content = ids.map((id, index) => (
        <CardWordTable
          word={entities[id]}
          key={id}
          index={index}
          colSpan={colSpan}
          setColSpan={setColSpan}
          setEditWord={setEditWord}
        />
      ));
    }
  } else if (isError) {
    content = <p>{error}</p>;
  }

  const toggleEdit = (tab = "") => {
    setEditBlockTab(tab);
  };

  const toggleEditWord = () => {
    setEditWord(!editWord);
  };

  return (
    <div className="flex flex-col gap-2 w-full p-2">
      <h2 className="font-bold text-xl text-center my-2 p-3 bg-slate-200 rounded-lg shadow-md shadow-slate-400 group">
        <span>{displayBlock?.title}</span>
        <span>
          {!!displayBlock?.subtitle ? ", " + displayBlock?.subtitle : ""}
        </span>
        <span>{!!displayBlock?.detail ? ", " + displayBlock?.detail : ""}</span>
        <span>
          {editMode && (
            <CiEdit
              className="icon invisible group-hover:visible"
              onClick={() => toggleEdit()}
            />
          )}
        </span>
      </h2>
      <div
        className={
          editMode
            ? "flex items-center justify-center gap-3 duration-200 translate-y-0"
            : "invisible translate-y-2 h-0"
        }
      >
        <button className="btn btn-red" onClick={() => toggleEdit("header")}>
          Header
        </button>
        <button className="btn btn-red" onClick={() => toggleEdit("details")}>
          Details
        </button>
        <button className="btn btn-red" onClick={() => toggleEdit("content")}>
          Content
        </button>
      </div>
      <CardBlockEditHeader
        editBlockTab={editBlockTab}
        toggleEdit={toggleEdit}
      />
      <CardBlockEditDetails
        editBlockTab={editBlockTab}
        toggleEdit={toggleEdit}
      />
      <CardBlockEditContent
        editBlockTab={editBlockTab}
        toggleEdit={toggleEdit}
      />
      {displayBlock?.introduction ? (
        <div className="">{displayBlock.introduction}</div>
      ) : null}
      {displayMode === "list" ? (
        <table>
          <CardTableHeader
            colSpan={colSpan}
            setColSpan={setColSpan}
            toggleEdit={toggleEdit}
          />
          <tbody className="">{content}</tbody>
        </table>
      ) : (
        <div className="flex flex-row flex-wrap gap-3 items-center justify-center">
          {content}
        </div>
      )}
      {!!editWord?.first && (
        <>
          <CardWordEdit
            word={editWord}
            colSpan={colSpan}
            setEditWord={setEditWord}
          />
          <CardWordEditDetails
            word={editWord}
            editWord={editWord}
            setEditWord={setEditWord}
          />
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
