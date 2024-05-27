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
        <article className="rounded-md p-2 sm:px-[5%] bg-orange-400/10 text-zinc-800">
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
