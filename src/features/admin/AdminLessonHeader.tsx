import { useState } from "react";
import AdminDropDown from "./AdminDropDown";
import FormLessonEdit from "../lessons/FormLessonEdit";
import FormSectionAdd from "../sections/FormSectionAdd";
import FormLessonImage from "../lessons/FormLessonImage";
import { IoAddOutline } from "react-icons/io5";
import { CiEdit } from "react-icons/ci";

export default function AdminLessonHeader({
  lesson,
  chapter,
}: {
  lesson: Lesson;
  chapter?: Chapter | null;
}) {
  const [addSection, setAddSection] = useState(false);
  const [editHeaders, setEditHeaders] = useState(false);
  const [editImage, setEditImage] = useState(false);
  const [addText, setAddText] = useState(false);

  const displayChapter = chapter;

  const addItems = [
    {
      type: "separator",
      label: "Add...",
      title: "",
      icon: null,
      onClick: () => {},
    },
    {
      type: "button",
      label: "Add Section",
      title: "Add Section",
      icon: null,
      onClick: () => setAddSection(true),
    },
    {
      type: "button",
      label: "Add Text",
      title: "Add Text",
      icon: null,
      onClick: () => setAddText(true),
    },
  ];

  const editItems = [
    {
      type: "separator",
      label: "Edit...",
      title: "",
      icon: null,
      onClick: () => {},
    },
    {
      type: "button",
      label: "Edit Lesson",
      title: "Edit Lesson",
      icon: null,
      onClick: () => setEditHeaders(true),
    },
    {
      type: "button",
      label: "Edit Image",
      title: "Edit Image",
      icon: null,
      onClick: () => setEditImage(true),
    },
  ];

  return (
    <>
      <div className="relative">
        <div className="absolute top-2 right-0 flex items-center gap-2 z-30">
          <AdminDropDown items={addItems} icon={<IoAddOutline size={25} />} />
          <AdminDropDown items={editItems} icon={<CiEdit size={25} />} />
        </div>
        <header className="group bg-white rounded-lg m-4 sm:m-0">
          <div className="flex items-stretch relative">
            <p
              title={`Lesson ${lesson?.sortIndex ? lesson?.sortIndex : 0}`}
              className="w-12 bg-accent flex flex-col items-center justify-center text-base md:text-2xl font-semibold border-b-4 border-destructive text-accent_foreground rounded-tl-lg"
            >
              {(lesson?.sortIndex ? lesson?.sortIndex : 0).toLocaleString(
                "en-US",
                {
                  minimumIntegerDigits: 2,
                  useGrouping: false,
                }
              )}
            </p>
            <h1 className="text-2xl md:text-3xl font-semibold text-wrap flex items-center px-4 py-2 border-accent border-b-4 flex-1 text-destructive_foreground">
              {lesson?.title}
            </h1>
          </div>
          <div className="flex items-stretch">
            <p
              title={`Chapter ${
                displayChapter?.chapterNo ? displayChapter?.chapterNo : 0
              }`}
              className="w-12 py-1 text-accent_foreground bg-accent flex flex-col items-center justify-center text-base font-semibold rounded-bl-lg"
            >
              <span>
                {(displayChapter?.chapterNo ?? "").toLocaleString("en-US", {
                  minimumIntegerDigits: 2,
                  useGrouping: false,
                })}
              </span>
            </p>
            <p className="flex items-center px-4">{displayChapter?.title}</p>
          </div>
        </header>
      </div>
      {editHeaders && lesson && (
        <FormLessonEdit lesson={lesson} setEdit={setEditHeaders} />
      )}
      {addSection && lesson && (
        <FormSectionAdd
          lessonID={lesson?.id ?? ""}
          chapterID={lesson?.chapterID ?? ""}
          setAdd={setAddSection}
        />
      )}
      {editImage && <FormLessonImage lesson={lesson} />}
      {addText && null}
    </>
  );
}
