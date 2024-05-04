import LessonIntroItem from "./LessonIntroItem";
import LessonIntroAdd from "./LessonIntroAdd";

export default function LessonIntro({
  lesson,
  addLessonIntro,
  setAddLessonIntro,
}) {
  return (
    <article>
      {Array.isArray(lesson?.introduction)
        ? lesson.introduction.map((intro, index) => {
            return (
              <LessonIntroItem
                lesson={lesson}
                intro={intro}
                index={index}
                key={index}
              />
            );
          })
        : lesson?.introduction}
      {addLessonIntro ? (
        <LessonIntroAdd lesson={lesson} setAdd={setAddLessonIntro} />
      ) : null}
    </article>
  );
}
