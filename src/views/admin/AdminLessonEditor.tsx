import AdminLessonContainer from "@/features/admin/AdminLessonContainer";
import AdminLessonNav from "@/features/admin/AdminLessonNav";
import AdminSectionContainer from "@/features/admin/AdminSectionContainer";
import { useLazyGetLessonByIDQuery } from "@/features/globals/globalsApiSlice";
import { selectChapters, selectLessons } from "@/features/globals/globalsSlice";
import LessonHeader from "@/features/lessons/LessonHeader";
import LessonIntroEdit from "@/features/lessons/LessonIntroEdit";
import { useLazyGetAdminSentencesQuery } from "@/features/sentences/sentencesSlice";
import { useLazyGetLessonTextBlocksQuery } from "@/features/textBlock/textBlockSlice";
import { useLazyGetLessonWordsQuery } from "@/features/words/wordsSlice";
import { useEffect, useState } from "react";
import { CiEdit } from "react-icons/ci";
import { useSelector } from "react-redux";
import { useSearchParams } from "react-router-dom";

export default function AdminLessonEditor() {
  const [searchParams] = useSearchParams();

  const id = searchParams.get("id") ?? "";

  const [getLesson, { data, isLoading, isSuccess, isError }] =
    useLazyGetLessonByIDQuery();

  const [getSentences] = useLazyGetAdminSentencesQuery();
  const [getLessonTextBlocks] = useLazyGetLessonTextBlocksQuery();
  const [getLessonWords] = useLazyGetLessonWordsQuery();

  useEffect(() => {
    if (id && id !== "") {
      getLessonWords(id);
      getLessonTextBlocks(id);
      getSentences({ lessonID: id, ipp: 300 });
      getLesson(id);
    }
  }, [id]);

  const lessons = useSelector(selectLessons);
  const chapters = useSelector(selectChapters);

  const [lesson, setLesson] = useState<Lesson | null>(null);
  const [chapter, setChapter] = useState<Chapter | null>(null);

  const [editIntro, setEditIntro] = useState(false);
  const [introItem, setIntroItem] = useState("");
  const [introIndex, setIntroIndex] = useState(-1);

  useEffect(() => {
    setLesson(() => lessons.find((item) => item.id === id) ?? null);
  }, [lessons, id]);

  useEffect(() => {
    if (lesson) {
      const temp = chapters.find((item) => item.id === lesson?.chapterID);
      if (temp) {
        setChapter(temp);
      }
    }
  }, [id, lesson?.id, chapters]);

  let content;
  if (isLoading) {
    content = <p>Loading...</p>;
  } else if (isError) {
    content = <p>Error</p>;
  } else if (isSuccess) {
    content = data.map((item: any) => (
      <AdminSectionContainer
        section={item}
        key={item.id}
      ></AdminSectionContainer>
    ));
  }

  return (
    <>
      {lesson && (
        <AdminLessonContainer lesson={lesson}>
          <LessonHeader lesson={lesson} chapter={chapter} />
        </AdminLessonContainer>
      )}
      <AdminLessonNav />

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
                <button
                  onClick={() => {
                    setEditIntro(true);
                    setIntroIndex(index);
                    setIntroItem(intro);
                  }}
                >
                  <CiEdit size={20} />
                </button>
              </div>
            );
          })}
        </div>
      ) : null}

      {/* Sections */}
      <div className="flex-1 flex flex-col gap-4">{content}</div>

      {lesson && editIntro && (
        <LessonIntroEdit
          setEdit={setEditIntro}
          intro={introItem}
          index={introIndex}
          lesson={lesson}
        />
      )}

      <AdminLessonNav />
    </>
  );
}
