import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import {
  selectDisplayChapter,
  selectEditMode,
} from "../features/globals/globalsSlice";
import { useGetBlocksQuery } from "../features/blocks/blockSlice";
import CardBlockTitle from "../features/blocks/CardBlockTitle";
import ChapterNavigator from "../features/navigation/ChapterNavigator";
import ChapterHeaderEdit from "../features/chapters/ChapterHeaderEdit";
import ChapterHeader from "../features/chapters/ChapterHeader";
import LessonAdd from "../features/blocks/LessonAdd";
import ContentNavigator from "../features/navigation/ContentNavigator";

export default function SectionsPage() {
  const displayChapter = useSelector(selectDisplayChapter);
  const editMode = useSelector(selectEditMode);
  const navigate = useNavigate();

  const [editChapter, setEditChapter] = useState(false);

  const isMounted = useRef(null);

  useEffect(() => {
    if (isMounted.current) {
      if (!displayChapter) {
        navigate("/chapters");
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

  // const [getBlocks, { data: blocks, isLoading, isSuccess, isError, error }] =
  //   useLazyGetBlocksQuery(displayChapter?.id);

  // useEffect(() => {
  //   getBlocks(displayChapter.id);
  // }, [displayChapter]);

  let content;
  if (isLoading) {
    content = <p>"Loading..."</p>;
  } else if (isSuccess) {
    // destructure blocks from normalized object
    const { ids, entities } = blocks;
    content = ids.map((id) => <CardBlockTitle key={id} block={entities[id]} />);
  } else if (isError) {
    content = <p>{error}</p>;
  }

  return (
    <>
      <main>
        <ChapterNavigator>
          <ChapterHeader
            chapter={displayChapter}
            setEditChapter={setEditChapter}
          />
        </ChapterNavigator>
        <div>
          <p>{displayChapter?.detail}</p>
          <div className="flex flex-wrap justify-center gap-3">{content}</div>
          {editMode && <LessonAdd />}
          <ChapterNavigator />
          <ContentNavigator />
        </div>
      </main>
      {editChapter ? (
        <ChapterHeaderEdit
          chapter={displayChapter}
          setEditChapter={setEditChapter}
        />
      ) : null}
    </>
  );
}
