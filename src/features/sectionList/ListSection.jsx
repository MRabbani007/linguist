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

  let content = list.items.map((item, index) => {
    return (
      <li key={index} className="group">
        <span>{item}</span>
        {editMode && (
          <button
            className="invisible group-hover:visible"
            onClick={() => setEditItem(index)}
          >
            <CiEdit size={28} className="inline" />
          </button>
        )}
      </li>
    );
  });

  return (
    <>
      <div className="">
        <div className="relative w-full py-2 px-4 flex items-center">
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
        </div>
        {list?.text ? <p>{list?.text}</p> : null}
        {list?.type === "OL" ? (
          <ol className="px-4">{content}</ol>
        ) : (
          <ul className="px-4 list-disc list-inside">{content}</ul>
        )}
        {list?.notes ? <p className="py-2 px-4">{list.notes}</p> : null}
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
