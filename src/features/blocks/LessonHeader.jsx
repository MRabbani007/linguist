import { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { selectEditMode } from "../globals/globalsSlice";
import { BsThreeDots } from "react-icons/bs";
import LessonDropDown from "../dropDowns/LessonDropDown";

const LessonHeader = ({
  lesson,
  setAddLessonIntro,
  setAddSection,
  setEditLessonTitle,
  setEditLessonDetails,
}) => {
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
    <header className="gap-4 group bg-gradient-to-r from-red-500 to-red-600 text-white min-h-[80px]">
      {/* <p
        title={"Lesson " + lesson?.lessonNo}
        className="py-2 w-12 text-center border-2 border-white text-xl"
      >
        {lesson?.lessonNo}
      </p> */}
      <span className=" text-2xl font-bold">
        {"Lesson " + lesson?.lessonNo + ": "}
      </span>
      <h1 className=" text-2xl font-bold text-wrap inline">{lesson?.title}</h1>
      {/* {lesson?.subtitle ? (
          <p className="font-light text-wrap">{lesson?.subtitle}</p>
        ) : null} */}
      {editMode && (
        <button
          className="absolute top-1/2 -translate-y-1/2 right-4 invisible group-hover:visible"
          title="Edit Lesson"
          onClick={() => setShowDropDown(true)}
        >
          <BsThreeDots size={28} />
        </button>
      )}
      <LessonDropDown
        lesson={lesson}
        showDropDown={showDropDown}
        setAddLessonIntro={setAddLessonIntro}
        setAddSection={setAddSection}
        setEditLessonTitle={setEditLessonTitle}
        setEditLessonDetails={setEditLessonDetails}
      />
    </header>
  );
};

export default LessonHeader;
