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
        <div className="w-full flex flex-wrap gap-4">
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
        </div>
      ) : null}
      {addLessonIntro ? (
        <LessonIntroAdd lesson={lesson} setAdd={setAddLessonIntro} />
      ) : null}
    </>
  );
}
