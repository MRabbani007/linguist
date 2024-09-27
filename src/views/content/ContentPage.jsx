import React from "react";
import { useSelector } from "react-redux";
import {
  selectChapters,
  selectLessons,
} from "../../features/globals/globalsSlice";
import CardChapter from "../../features/chapters/CardChapter";
import CardLesson from "../../features/blocks/CardLesson";
import { TfiLayoutListThumb } from "react-icons/tfi";

export default function ContentPage() {
  const chapters = useSelector(selectChapters);
  const lessons = useSelector(selectLessons);

  // const { data: chapterSummary, isSuccess: isSuccessSummary } =
  //   useGetChapterSummaryQuery(language?.id || "language");

  return (
    <main>
      <header className="flex items-center gap-4 border-b-2 border-red-700 pb-2 mb-4">
        <TfiLayoutListThumb size={40} className="text-red-700" />
        <h1 className="text-2xl md:text-4xl font-semibold">Content Overview</h1>
      </header>
      {chapters.map((chapter, index) => {
        return (
          <div className="flex flex-col items-stretch" key={index}>
            <CardChapter chapter={chapter} />
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 my-6">
              {lessons
                .filter((item) => item.chapterID === chapter.id)
                .map((lesson, idx) => {
                  return <CardLesson lesson={lesson} key={idx} />;
                })}
            </div>
          </div>
        );
      })}
    </main>
  );
}
