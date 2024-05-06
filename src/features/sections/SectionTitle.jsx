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
  setAddIntro,
  setAddDef,
  setAddTable,
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
    <div className="flex items-center gap-2 group relative w-fit">
      <div>
        <h3 className="font-bold text-xl text-red-600 flex items-center gap-3">
          <TbPoint className="inline" size={26} />
          <span>{section?.title}</span>
          <button onClick={() => setExpand(!expand)}>
            <IoIosArrowForward
              size={24}
              className={(expand ? "rotate-90" : "") + " duration-200"}
            />
          </button>
        </h3>
        {section?.subtitle && (
          <p>
            <i>{section?.subtitle}</i>
          </p>
        )}
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
        setAddIntro={setAddIntro}
        setAddDef={setAddDef}
        setAddTable={setAddTable}
      />
    </div>
  );
}
