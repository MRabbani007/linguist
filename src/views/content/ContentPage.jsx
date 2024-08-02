import React from "react";
import { useSelector } from "react-redux";
import {
  selectChapters,
  selectLessons,
} from "../../features/globals/globalsSlice";
import CardChapter from "../../features/chapters/CardChapter";
import CardLesson from "../../features/blocks/CardLesson";

export default function ContentPage() {
  const chapters = useSelector(selectChapters);
  const lessons = useSelector(selectLessons);

  // const { data: chapterSummary, isSuccess: isSuccessSummary } =
  //   useGetChapterSummaryQuery(language?.id || "language");

  return (
    <main>
      <header className="p-8 bg-destructive text-destructive_foreground">
        <h1 className="text-4xl font-semibold">Content Overview</h1>
      </header>
      {chapters.map((chapter, index) => {
        return (
          <div className="flex flex-col gap-4 w-full" key={index}>
            <CardChapter chapter={chapter} />
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 w-full ">
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
