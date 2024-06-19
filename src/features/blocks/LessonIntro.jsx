import LessonIntroItem from "./LessonIntroItem";
import LessonIntroAdd from "./LessonIntroAdd";

export default function LessonIntro({
  lesson,
  addLessonIntro,
  setAddLessonIntro,
}) {
  return (
    <>
      {Array.isArray(lesson?.introduction) &&
      lesson?.introduction?.length !== 0 ? (
        <article className="py-2 px-4 bg-orange-200 text-zinc-800 w-full font-medium">
          {lesson.introduction.map((intro, index) => {
            return (
              <LessonIntroItem
                lesson={lesson}
                intro={intro}
                index={index}
                key={index}
              />
            );
          })}
        </article>
      ) : null}
      {addLessonIntro ? (
        <LessonIntroAdd lesson={lesson} setAdd={setAddLessonIntro} />
      ) : null}
    </>
  );
}
