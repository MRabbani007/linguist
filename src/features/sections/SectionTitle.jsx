import { useEffect, useRef, useState } from "react";
import { selectEditMode } from "../globals/globalsSlice";
import { useSelector } from "react-redux";
import { BsThreeDots } from "react-icons/bs";
import SectionDropDown from "./SectionDropDown";
import { TbPoint } from "react-icons/tb";
import { IoIosArrowForward } from "react-icons/io";
import { FaRegSquareMinus, FaRegSquarePlus } from "react-icons/fa6";

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
    <div className="flex items-stretch gap-4 group relative bg-gradient-to-r from-zinc-700 to-zinc-600 px-6">
      <p className="py-4">
        {expand ? (
          <FaRegSquareMinus size={26} className="text-white" />
        ) : (
          <FaRegSquarePlus size={26} className="text-white" />
        )}
      </p>
      <h3
        onClick={() => setExpand(!expand)}
        className=" flex flex-col text-white py-4 cursor-pointer"
      >
        <p className="font-semibold text-xl">{section?.title}</p>
        {section?.subtitle && <i className="">{section?.subtitle}</i>}
      </h3>
      {editMode && (
        <button
          ref={dropDownButtonRef}
          title="Edit Section"
          onClick={() => setShowDropDown(true)}
          className="ml-auto px-2"
        >
          <BsThreeDots size={28} className="text-white" />
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
