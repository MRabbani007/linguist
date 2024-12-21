import { useSelector } from "react-redux";
import { selectDisplayChapter } from "../../features/globals/globalsSlice";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useEffect } from "react";
import { useGetBlocksQuery } from "../../features/blocks/blockSlice";
import CardLesson from "../../features/blocks/CardLesson";
import ChapterNavigator from "../../features/navigation/ChapterNavigator";
import ReactLoading from "react-loading";

export default function ChapterPage() {
  const [searchParams] = useSearchParams();

  const id = searchParams.get("id");
  // const title = searchParams.get("title");

  const displayChapter = useSelector(selectDisplayChapter);
  const navigate = useNavigate();

  useEffect(() => {
    if (!id) {
      navigate("/learn");
    }
  }, [displayChapter]);

  const {
    data: blocks,
    isLoading,
    isSuccess,
    isError,
    error,
  } = useGetBlocksQuery(id);

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
    const { ids, entities } = blocks;
    content = ids.map((id) => <CardLesson key={id} lesson={entities[id]} />);
  } else if (isError) {
    content = <p>{error}</p>;
  }

  return (
    <main>
      <div className="">
        <header className="group relative">
          <div className="flex items-stretch justify-start">
            <p
              title={`Chapter ${chapter?.chapterNo ? chapter?.chapterNo : 0}`}
              className="min-w-12 text-accent_foreground bg-accent flex items-center justify-center text-base md:text-2xl font-semibold"
            >
              {(chapter?.chapterNo ? chapter?.chapterNo : 0).toLocaleString(
                "en-US",
                {
                  minimumIntegerDigits: 2,
                  useGrouping: false,
                }
              )}
            </p>
            <div className="flex flex-col gap-1 text-destructive_foreground flex-1">
              <h1 className="text-2xl md:text-4xl font-semibold text-wrap inline py-1 px-2 border-accent border-b-4">
                {chapter?.title}
              </h1>
              <p className="py-1 px-2">{chapter?.subtitle}</p>
            </div>
          </div>
        </header>
        <ChapterNavigator />
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 flex-1">
        {content}
      </div>
      <ChapterNavigator />
    </main>
  );
}
