import { useSelector } from "react-redux";
import { selectDisplayChapter } from "../../features/globals/globalsSlice";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useEffect } from "react";
import { useGetBlocksQuery } from "../../features/blocks/blockSlice";
import CardLesson from "../../features/blocks/CardLesson";
import ChapterHeader from "../../features/chapters/ChapterHeader";
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
        <ChapterHeader chapter={displayChapter} />
        <ChapterNavigator />
      </div>
      {/* <p className="w-full">{displayChapter?.detail}</p> */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 flex-1">
        {content}
      </div>
      <ChapterNavigator />
    </main>
  );
}
