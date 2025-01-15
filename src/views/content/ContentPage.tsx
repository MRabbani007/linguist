import { useSelector } from "react-redux";
import {
  selectChapters,
  selectLessons,
} from "../../features/globals/globalsSlice";
import CardChapter from "../../features/chapters/CardChapter";
import CardLesson from "../../features/lessons/CardLesson";
import { TfiLayoutListThumb } from "react-icons/tfi";

export default function ContentPage() {
  const chapters = useSelector(selectChapters);
  const lessons = useSelector(selectLessons);

  return (
    <main>
      <header className="flex items-center gap-4 border-b-2 border-red-700 pb-2 mb-4">
        <TfiLayoutListThumb className="text-red-700 size-6 md:size-10" />
        <h1 className="text-2xl md:text-4xl font-semibold">Content Overview</h1>
      </header>
      {chapters.map((chapter, index) => {
        return (
          <div className="flex flex-col items-stretch" key={index}>
            <CardChapter chapter={chapter} />
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2 my-6">
              {lessons
                .filter((item) => item.chapterID === chapter.id)
                .sort((a, b) => (a.sortIndex > b.sortIndex ? 1 : -1))
                .map((lesson, idx) => {
                  return (
                    <CardLesson lesson={lesson} chapter={chapter} key={idx} />
                  );
                })}
            </div>
          </div>
        );
      })}
    </main>
  );
}
