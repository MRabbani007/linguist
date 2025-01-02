import { ReactNode, useState } from "react";
import AdminDropDown from "./AdminDropDown";
import FormLessonEdit from "../lessons/FormLessonEdit";
import FormSectionAdd from "../sections/FormSectionAdd";

export default function AdminLessonContainer({
  children,
  lesson,
}: {
  children: ReactNode;
  lesson: Lesson;
}) {
  const [addSection, setAddSection] = useState(false);
  const [editHeaders, setEditHeaders] = useState(false);
  const [editImage, setEditImage] = useState(false);
  const [addText, setAddText] = useState(false);

  const items = [
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
        <AdminDropDown items={items} />
        {children}
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
    </>
  );
}
