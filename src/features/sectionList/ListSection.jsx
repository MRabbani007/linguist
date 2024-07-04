import React, { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { selectEditMode } from "../globals/globalsSlice";
import ListEdit from "./ListEdit";
import ListDropDown from "../dropDowns/ListDropDown";
import ListEditLessonID from "./ListEditLessonID";
import ListItemAdd from "./ListItemAdd";
import ListItemEdit from "./ListItemEdit";
import { BsThreeDots } from "react-icons/bs";
import { CiEdit } from "react-icons/ci";

export default function ListSection({ list }) {
  const editMode = useSelector(selectEditMode);
  const [editContent, setEditContent] = useState(false);
  const [editLessonID, setEditLessonID] = useState(false);

  const [addItem, setAddItem] = useState(false);
  const [editItem, setEditItem] = useState(null);

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

  let content;
  if (list?.type === "OL") {
    content = list.items.map((item, index) => {
      return (
        <li
          key={index}
          className="py-2 px-4 bg-zinc-200 border-b-[1px] border-zinc-400"
        >
          <span>{item}</span>
          {editMode && (
            <button onClick={() => setEditItem(index)}>
              <CiEdit size={28} className="inline" />
            </button>
          )}
        </li>
      );
    });
  } else {
    content = list.items.map((item, index) => {
      return (
        <li
          key={index}
          className="py-2 px-4 bg-zinc-200 border-b-[1px] border-zinc-400"
        >
          <span>{item}</span>
          {editMode && (
            <button onClick={() => setEditItem(index)}>
              <CiEdit size={28} />
            </button>
          )}
        </li>
      );
    });
  }

  return (
    <>
      <div className="">
        <div className="relative bg-zinc-500 text-white w-full py-2 px-4">
          {list?.title ? (
            <strong className="text-xl font-light">{list?.title}</strong>
          ) : editMode ? (
            <strong>Title</strong>
          ) : null}
          {editMode && (
            <button
              ref={dropDownButtonRef}
              title="Edit List"
              onClick={() => setShowDropDown(true)}
            >
              <BsThreeDots size={28} />
            </button>
          )}
          {showDropDown && (
            <ListDropDown
              ref={dropDownRef}
              list={list}
              showDropDown={showDropDown}
              setEditContent={setEditContent}
              setEditLessonID={setEditLessonID}
              setAddItem={setAddItem}
            />
          )}
          <p>{list?.text}</p>
        </div>
        <div className="">
          {list?.type === "OL" ? (
            <ol className="list-decimal list-inside">{content}</ol>
          ) : (
            <ul className="">{content}</ul>
          )}
          {list?.notes ? (
            <p className="bg-zinc-300 py-2 px-4">{list.notes}</p>
          ) : null}
        </div>
      </div>
      {editContent && <ListEdit list={list} setEdit={setEditContent} />}
      {editLessonID && (
        <ListEditLessonID list={list} setEdit={setEditLessonID} />
      )}
      {addItem ? <ListItemAdd list={list} setAdd={setAddItem} /> : null}
      {editItem !== null ? (
        <ListItemEdit list={list} editItem={editItem} setEdit={setEditItem} />
      ) : null}
    </>
  );
}
