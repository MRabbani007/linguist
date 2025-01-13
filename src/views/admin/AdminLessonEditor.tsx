import AdminLessonContainer from "@/features/admin/AdminLessonContainer";
import AdminSectionContainer from "@/features/admin/AdminSectionContainer";
import { useLazyGetLessonByIDQuery } from "@/features/globals/globalsApiSlice";
import { selectLessons } from "@/features/globals/globalsSlice";
import LessonHeader from "@/features/lessons/LessonHeader";
import { useLazyGetLessonTextBlocksQuery } from "@/features/textBlock/textBlockSlice";
import { useLazyGetLessonWordsQuery } from "@/features/words/wordsSlice";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useSearchParams } from "react-router-dom";

export default function AdminLessonEditor() {
  const [searchParams] = useSearchParams();

  const id = searchParams.get("id");

  const [getLesson, { data, isLoading, isSuccess, isError }] =
    useLazyGetLessonByIDQuery();

  const [getLessonTextBlocks] = useLazyGetLessonTextBlocksQuery();

  const [getLessonWords] = useLazyGetLessonWordsQuery();

  useEffect(() => {
    if (id) {
      getLessonWords(id);
      getLessonTextBlocks(id);
      getLesson(id);
    }
  }, [id]);

  const lessons = useSelector(selectLessons);

  const [lesson, setLesson] = useState<Lesson | null>(null);

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
      <AdminSectionContainer section={item} key={item.id} />
    ));
  }

  return (
    <>
      {lesson && (
        <AdminLessonContainer lesson={lesson}>
          <LessonHeader lesson={lesson} />
        </AdminLessonContainer>
      )}

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

      <div className="flex-1 flex flex-col gap-4">{content}</div>
    </>
  );
}
