import { useEffect } from "react";
import { useSelector } from "react-redux";
import { selectDisplayLesson } from "../../features/globals/globalsSlice";
// Imported Components
import LessonNavigator from "../../features/navigation/LessonNavigator";
// Imported Icons
import LessonHeader from "../../features/lessons/LessonHeader";
import ContentNavigator from "../../features/navigation/ContentNavigator";
import { useNavigate } from "react-router-dom";
import { useLazyGetLessonByIDQuery } from "@/features/globals/globalsApiSlice";
import Section from "@/features/sections/Section";
import LessonCompleted from "@/features/lessons/LessonCompleted";

export default function LessonPage() {
  const displayLesson = useSelector(selectDisplayLesson);

  const [getLesson, { data, isLoading, isSuccess, isError }] =
    useLazyGetLessonByIDQuery();

  const navigate = useNavigate();

  useEffect(() => {
    if (!displayLesson) {
      navigate("/learn");
    } else {
      getLesson(displayLesson.id);
    }
  }, [displayLesson]);

  if (!displayLesson) return null;

  let content;
  if (isLoading) {
    content = <p>Loading...</p>;
  } else if (isError) {
    content = <p>Error</p>;
  } else if (isSuccess) {
    content = data.map((item: any) => (
      <Section
        key={item.id}
        definitions={item.definitions}
        words={item.words}
        section={item}
        sectionLists={item.sectionLists}
        sentences={item.sentences}
        tables={item.tables}
        tableWords={[]}
      />
    ));
  }

  return (
    <main>
      <div>
        <LessonHeader lesson={displayLesson} />
        <LessonNavigator />
      </div>
      {displayLesson?.lessonImage && (
        <div className="mx-auto max-h-[300px] lg:max-w-[50vw] overflow-hidden">
          <img
            src={displayLesson?.lessonImage}
            alt=""
            className="max-h-[300px] h-full"
          />
        </div>
      )}
      {Array.isArray(displayLesson?.introduction) &&
      displayLesson?.introduction?.length !== 0 ? (
        <div className="flex flex-col gap-4">
          {displayLesson.introduction.map((intro, index) => {
            return (
              <div key={index} className="group relative text-pretty flex-1">
                <span className="text-wrap">{intro}</span>
              </div>
            );
          })}
        </div>
      ) : null}
      {content}
      <LessonNavigator />
      <ContentNavigator />
      {isSuccess && <LessonCompleted lessonID={displayLesson.id} />}
    </main>
  );
}
