import AdminLessonContainer from "@/features/admin/AdminLessonContainer";
import AdminSectionContainer from "@/features/admin/AdminSectionContainer";
import { useLazyGetLessonByIDQuery } from "@/features/globals/globalsApiSlice";
import { selectLessons } from "@/features/globals/globalsSlice";
import FormLessonEdit from "@/features/lessons/FormLessonEdit";
import LessonHeader from "@/features/lessons/LessonHeader";
import FormSectionAdd from "@/features/sections/FormSectionAdd";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useSearchParams } from "react-router-dom";

export default function AdminLessonEditor() {
  const [searchParams] = useSearchParams();

  const id = searchParams.get("id");

  const [getLesson, { data, isLoading, isSuccess, isError }] =
    useLazyGetLessonByIDQuery();

  useEffect(() => {
    if (id) {
      getLesson(id);
    }
  }, [id]);

  const lessons = useSelector(selectLessons);

  const [lesson, setLesson] = useState<Lesson | null>(null);

  const [addSection, setAddSection] = useState(false);
  const [editHeaders, setEditHeaders] = useState(false);
  const [editImage, setEditImage] = useState(false);
  const [addText, setAddText] = useState(false);

  useEffect(() => {
    setLesson(() => lessons.find((item) => item.id === id) ?? null);
  }, [lessons, id]);

  let content;
  if (isLoading) {
    content = <p>Loading...</p>;
  } else if (isError) {
    content = <p>Error</p>;
  } else if (isSuccess) {
    content = data.map((item: any) => (
      //   <Section
      //     key={item.id}
      //     definitions={item.definitions}
      //     words={item.words}
      //     section={item}
      //     sectionLists={item.sectionLists}
      //     sentences={item.sentences}
      //     tables={item.tables}
      //     tableWords={[]}
      //   />
      <AdminSectionContainer section={item} />
    ));
  }

  return (
    <main>
      <div className="flex items-center justify-center gap-4">
        <button
          className="btn-r btn-yellow"
          onClick={() => setEditHeaders(true)}
        >
          Lesson
        </button>
        <button className="btn-r btn-yellow">Image</button>
        <button className="btn-r btn-blue" onClick={() => setAddSection(true)}>
          Section
        </button>
        <button className="btn-r btn-blue" onClick={() => setAddText(true)}>
          Text
        </button>
      </div>

      <AdminLessonContainer>
        {lesson && <LessonHeader lesson={lesson} />}
      </AdminLessonContainer>

      {lesson?.lessonImage && (
        <div className="mx-auto lg:max-w-[50vw] overflow-hidden ">
          <img src={lesson?.lessonImage} alt="" className="max-h-[300px]" />
        </div>
      )}

      {Array.isArray(lesson?.introduction) &&
      lesson?.introduction?.length !== 0 ? (
        <div className="flex flex-col gap-4">
          {lesson.introduction.map((intro, index) => {
            return (
              <div key={index} className="group relative text-pretty flex-1">
                <span className="text-wrap">{intro}</span>
              </div>
            );
          })}
        </div>
      ) : null}

      {content}

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
    </main>
  );
}