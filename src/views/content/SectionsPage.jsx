import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectDisplayChapter } from "../../features/globals/globalsSlice";
import { useGetBlocksQuery } from "../../features/blocks/blockSlice";
import CardLesson from "../../features/blocks/CardLesson";
import ChapterNavigator from "../../features/navigation/ChapterNavigator";
import ChapterHeader from "../../features/chapters/ChapterHeader";
import ReactLoading from "react-loading";

export default function SectionsPage() {
  const displayChapter = useSelector(selectDisplayChapter);
  const navigate = useNavigate();

  const isMounted = useRef(null);

  useEffect(() => {
    if (isMounted.current) {
      if (!displayChapter) {
        navigate("/content/chapters");
      }
    }
  }, []);

  isMounted.current = true;

  const {
    data: blocks,
    isLoading,
    isSuccess,
    isError,
    error,
  } = useGetBlocksQuery(displayChapter?.id);

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
      <div className="w-full">
        <ChapterHeader chapter={displayChapter} />
        <ChapterNavigator />
      </div>
      {/* <p className="w-full">{displayChapter?.detail}</p> */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 p-4">{content}</div>
      <ChapterNavigator />
    </main>
  );
}
