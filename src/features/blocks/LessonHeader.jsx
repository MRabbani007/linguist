import { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { selectEditMode } from "../globals/globalsSlice";
import { BsThreeDots } from "react-icons/bs";
import LessonDropDown from "../dropDowns/LessonDropDown";
import FormLessonImage from "./FormLessonImage";

const LessonHeader = ({ lesson, setAddLessonIntro, setAddSection }) => {
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
    <header className="group relative min-h-[80px] w-full flex flex-wrap items-center justify-start gap-4">
      <div className="flex items-center justify-start gap-2 md:gap-6 md:w-full">
        {/* Lesson No */}
        <p
          title={`Lesson ${lesson?.sortIndex ? lesson?.sortIndex : 0}`}
          className="w-16 h-16 md:w-24 md:h-24 text-white bg-red-600 rounded-full shrink-0 flex items-center justify-center text-2xl md:text-4xl font-bold"
        >
          {(lesson?.sortIndex ? lesson?.sortIndex : 0).toLocaleString("en-US", {
            minimumIntegerDigits: 2,
            useGrouping: false,
          })}
        </p>
        <div className="flex flex-col gap-1">
          <h1 className="text-4xl md:text-7xl font-semibold text-wrap inline text-zinc-900 border-red-600 border-b-4">
            {lesson?.title}
          </h1>
          <p className="text-zinc-800">{lesson?.subtitle}</p>
        </div>
      </div>
      {lesson?.lessonImage ? (
        <div className="overflow-hidden w-fit mx-auto">
          <img
            src={lesson?.lessonImage}
            alt="alphabet"
            className="max-w-md max-h-52"
          />
        </div>
      ) : null}
      {/* <p>{lesson?.details}</p> */}
      {/* {lesson?.subtitle ? (
          <p className="font-light text-wrap">{lesson?.subtitle}</p>
        ) : null} */}
      {editMode && (
        <div className="absolute top-1/2 -translate-y-1/2 right-4 invisible group-hover:visible flex items-center gap-4">
          <FormLessonImage lesson={lesson} />
          <button title="Edit Lesson" onClick={() => setShowDropDown(true)}>
            <BsThreeDots size={28} />
          </button>
        </div>
      )}
      <LessonDropDown
        lesson={lesson}
        showDropDown={showDropDown}
        setAddLessonIntro={setAddLessonIntro}
        setAddSection={setAddSection}
      />
    </header>
  );
};

export default LessonHeader;
