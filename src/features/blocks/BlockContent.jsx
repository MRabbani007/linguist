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
import BlockNavigator from "./BlockNavigator";
import CardWordList from "../words/CardWordList";

const BlockContent = () => {
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
          setEditWord={setEditWord}
        />
      ));
    } else if (displayMode === "table") {
      content = ids.map((id, index) => (
        <CardWordTable
          word={entities[id]}
          key={id}
          index={index}
          setEditWord={setEditWord}
        />
      ));
    } else if (displayMode === "list") {
      content = ids.map((id, index) => (
        <CardWordList
          word={entities[id]}
          key={id}
          index={index}
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

  return (
    <div className="flex flex-col gap-2 w-full p-2">
      <h2 className=" text-center my-2 p-3 bg-slate-200 rounded-lg shadow-md shadow-slate-400 group relative">
        <p className="font-bold text-xl">{displayBlock?.title}</p>
        <p>{!!displayBlock?.subtitle ? displayBlock?.subtitle : ""}</p>
        <span>
          {editMode && (
            <CiEdit
              className="icon invisible group-hover:visible absolute top-2 right-2"
              onClick={() => toggleEdit()}
            />
          )}
        </span>
      </h2>
      <div
        className={
          editMode
            ? "duration-200 translate-y-0"
            : "invisible translate-y-2 h-0"
        }
      >
        <div className="flex items-center justify-center gap-3 ">
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
        <div>
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
        </div>
      </div>
      <p>{displayBlock?.detail ? displayBlock?.detail : ""}</p>
      {displayBlock?.introduction ? (
        <div className="">{displayBlock.introduction}</div>
      ) : null}
      {displayMode === "table" ? (
        <table>
          <CardTableHeader toggleEdit={toggleEdit} />
          <tbody className="">{content}</tbody>
        </table>
      ) : displayMode === "block" ? (
        <div className="flex flex-row flex-wrap gap-3 items-center justify-center">
          {content}
        </div>
      ) : (
        <div className="flex flex-col gap-2">{content}</div>
      )}
      {!!editWord?.first && (
        <>
          <CardWordEdit word={editWord} setEditWord={setEditWord} />
          <CardWordEditDetails word={editWord} setEditWord={setEditWord} />
        </>
      )}
      {editMode && (
        <div className="w-fit mx-auto">
          <CardWordAdd />
        </div>
      )}
      {displayBlock?.caption ? <div className="">Caption:</div> : null}
      {displayBlock?.text ? <div className="">Text:</div> : null}
      {displayBlock?.notes ? <div className="">Notes:</div> : null}
      {/* footer */}
      <BlockNavigator />
    </div>
  );
};

export default BlockContent;
