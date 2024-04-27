import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import {
  selectDisplayChapter,
  selectEditMode,
} from "../features/globals/globalsSlice";
import { useGetBlocksQuery } from "../features/blocks/blockSlice";
import CardBlockTitle from "../features/blocks/CardBlockTitle";
import CardBlockAdd from "../features/blocks/CardBlockAdd";
import ChapterNavigator from "../features/navigation/ChapterNavigator";
import ChapterHeaderEdit from "../features/chapters/ChapterHeaderEdit";
import ChapterHeader from "../features/chapters/ChapterHeader";

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
    <div className="flex flex-col gap-3 flex-1">
      <ChapterNavigator>
        {editChapter ? (
          <ChapterHeaderEdit
            chapter={displayChapter}
            setEditChapter={setEditChapter}
          />
        ) : (
          <ChapterHeader
            chapter={displayChapter}
            setEditChapter={setEditChapter}
          />
        )}
      </ChapterNavigator>
      <p>{displayChapter?.detail}</p>
      <div className="flex flex-wrap justify-center gap-3 py-2 px-4">
        {content}
      </div>
      <ChapterNavigator />
      {editMode && <CardBlockAdd />}
    </div>
  );
}
