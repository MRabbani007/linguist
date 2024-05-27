import { useEffect, useRef, useState } from "react";
import { selectEditMode } from "../globals/globalsSlice";
import { useSelector } from "react-redux";
import { BsThreeDots } from "react-icons/bs";
import SectionDropDown from "./SectionDropDown";
import { TbPoint } from "react-icons/tb";
import { IoIosArrowForward } from "react-icons/io";

export default function SectionTitle({
  section,
  expand,
  setExpand,
  setEditTitle,
  setEditLessonID,
  setAddIntro,
  setAddDef,
  setAddList,
  setAddTable,
  setAddWord,
  setAddSentence,
}) {
  const editMode = useSelector(selectEditMode);

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

  return (
    <div className="flex items-center gap-2 group relative bg-gradient-to-r from-zinc-300 to-zinc-100 rounded-md py-2 px-4 justify-between">
      <div>
        <h3 className="text-red-600 ">
          <p className="font-semibold text-xl flex items-center gap-3 ">
            <TbPoint className="inline" size={26} />
            {section?.title}
            <button onClick={() => setExpand(!expand)}>
              <IoIosArrowForward
                size={24}
                className={(expand ? "rotate-90" : "") + " duration-200"}
              />
            </button>
          </p>
          {section?.subtitle && (
            <i className="text-zinc-900 pl-10">{section?.subtitle}</i>
          )}
        </h3>
      </div>
      {editMode && (
        <button
          ref={dropDownButtonRef}
          title="Edit Section"
          onClick={() => setShowDropDown(true)}
        >
          <BsThreeDots size={28} />
        </button>
      )}
      <SectionDropDown
        section={section}
        showDropDown={showDropDown}
        ref={dropDownRef}
        setEditTitle={setEditTitle}
        setEditLessonID={setEditLessonID}
        setAddIntro={setAddIntro}
        setAddDef={setAddDef}
        setAddTable={setAddTable}
        setAddList={setAddList}
        setAddWord={setAddWord}
        setAddSentence={setAddSentence}
      />
    </div>
  );
}
