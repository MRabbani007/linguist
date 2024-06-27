import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import {
  selectDisplayChapter,
  selectEditMode,
} from "../../features/globals/globalsSlice";
import { useGetBlocksQuery } from "../../features/blocks/blockSlice";
import CardLesson from "../../features/blocks/CardLesson";
import ChapterNavigator from "../../features/navigation/ChapterNavigator";
import ChapterHeaderEdit from "../../features/chapters/ChapterHeaderEdit";
import ChapterHeader from "../../features/chapters/ChapterHeader";
import ContentNavigator from "../../features/navigation/ContentNavigator";
import FormLessonAdd from "../../features/blocks/FormLessonAdd";
import ReactLoading from "react-loading";

export default function SectionsPage() {
  const displayChapter = useSelector(selectDisplayChapter);
  const editMode = useSelector(selectEditMode);
  const navigate = useNavigate();

  const [editChapter, setEditChapter] = useState(false);
  const [addLesson, setAddLesson] = useState(false);

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

  // const [getBlocks, { data: blocks, isLoading, isSuccess, isError, error }] =
  //   useLazyGetBlocksQuery(displayChapter?.id);

  // useEffect(() => {
  //   getBlocks(displayChapter.id);
  // }, [displayChapter]);

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
    <>
      <main>
        <ChapterNavigator />
        <ChapterHeader
          chapter={displayChapter}
          setEditChapter={setEditChapter}
        />
        <div>
          <p className="w-full">{displayChapter?.detail}</p>
          <div className="grid lg:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-4 w-full h-full">
            {content}
          </div>
          {editMode && (
            <button
              className="btn btn-yellow mx-auto"
              onClick={() => setAddLesson(true)}
            >
              Add Lesson
            </button>
          )}
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
      {addLesson ? <FormLessonAdd setAdd={setAddLesson} /> : null}
    </>
  );
}
