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

  return (
    <main>
      {chapters.map((chapter, index) => {
        return (
          <div className="flex flex-col gap-4 w-full">
            <CardChapter chapter={chapter} key={index} />
            <div className="flex flex-col gap-4 w-full px-4">
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
