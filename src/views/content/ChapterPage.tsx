import { useSelector } from "react-redux";
import { selectDisplayChapter } from "../../features/globals/globalsSlice";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useEffect } from "react";
import CardLesson from "../../features/lessons/CardLesson";
import ChapterNavigator from "../../features/navigation/ChapterNavigator";
import ReactLoading from "react-loading";
import { useLazyGetLessonsByChapterIDQuery } from "@/features/globals/globalsApiSlice";

export default function ChapterPage() {
  const [searchParams] = useSearchParams();

  const id = searchParams.get("id");

  if (!id) {
    return null;
  }
  // const title = searchParams.get("title");

  const displayChapter = useSelector(selectDisplayChapter);
  const navigate = useNavigate();

  useEffect(() => {
    if (!id) {
      navigate("/learn");
    }
  }, [displayChapter]);

  const [
    getChapterLessons,
    { data: lessons, isLoading, isSuccess, isError, error },
  ] = useLazyGetLessonsByChapterIDQuery();

  useEffect(() => {
    getChapterLessons(id);
  }, [id]);

  let content;
  if (isLoading) {
    content = (
      <ReactLoading
        type={"bubbles"}
        color={"#000"}
        height={"10%"}
        width={"10%"}
        className="mx-auto"
      />
    );
  } else if (isSuccess) {
    // destructure blocks from normalized object
    content = [...lessons]
      .sort((a, b) => (a.sortIndex > b.sortIndex ? 1 : -1))
      .map((lesson) => (
        <CardLesson
          key={lesson.id}
          lesson={lesson}
          chapter={displayChapter as Chapter}
        />
      ));
  } else if (isError) {
    content = <p>{JSON.stringify(error)}</p>;
  }

  return (
    <main>
      <div className="">
        <header className="group relative">
          <div className="flex items-stretch justify-start">
            <p
              title={`Chapter ${
                displayChapter?.chapterNo ? displayChapter?.chapterNo : 0
              }`}
              className="min-w-12 text-accent_foreground bg-accent flex items-center justify-center text-base md:text-2xl font-semibold"
            >
              {(displayChapter?.chapterNo
                ? displayChapter?.chapterNo
                : 0
              ).toLocaleString("en-US", {
                minimumIntegerDigits: 2,
                useGrouping: false,
              })}
            </p>
            <div className="flex flex-col gap-1 text-destructive_foreground flex-1">
              <h1 className="text-2xl md:text-4xl font-semibold text-wrap inline py-1 px-2 border-accent border-b-4">
                {displayChapter?.title}
              </h1>
              <p className="py-1 px-2">{displayChapter?.subtitle}</p>
            </div>
          </div>
        </header>
        <ChapterNavigator />
      </div>
      <div className="flex-1">
        <div className=" grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2">
          {content}
        </div>
      </div>
      <ChapterNavigator />
    </main>
  );
}
