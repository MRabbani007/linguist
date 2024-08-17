import LessonIntroItem from "./LessonIntroItem";
import LessonIntroAdd from "./LessonIntroAdd";

export default function LessonIntro({
  lesson,
  addLessonIntro,
  setAddLessonIntro,
}) {
  return (
    <>
      {lesson?.lessonImage ? (
        <div className="mx-auto max-h-[300px] max-w-[50vw] overflow-hidden">
          <img
            src={lesson?.lessonImage}
            alt=""
            className="max-h-[300px] h-full"
          />
        </div>
      ) : null}
      {Array.isArray(lesson?.introduction) &&
      lesson?.introduction?.length !== 0 ? (
        <div className="flex flex-col gap-4 p-4">
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
