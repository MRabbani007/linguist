import CardBlockTitle from "./CardBlockTitle";
import CardBlockAdd from "./CardBlockAdd";
import {
  selectAllBlocks,
  useGetBlocksQuery,
  useLazyGetBlocksQuery,
} from "./blockSlice";
import { useSelector } from "react-redux";
import { selectDisplayChapter, selectEditMode } from "../globals/globalsSlice";
import { useEffect } from "react";

const BlockList = () => {
  const displayChapter = useSelector(selectDisplayChapter);
  const editMode = useSelector(selectEditMode);

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
    <div className="flex flex-col w-full max-w-[1000px]">
      <h2 className="text-xl text-center my-2 p-3 bg-slate-200 rounded-lg shadow-md shadow-slate-400">
        <p className="font-bold">{displayChapter?.title}</p>
        <p>{displayChapter?.subtitle}</p>
      </h2>
      <p>{displayChapter?.detail}</p>
      <div className="flex flex-wrap justify-center gap-3 py-2 px-4">
        {content}
        {/* {!!blocks &&
          blocks.map((item, index) => {
            return <CardBlockTitle block={item} key={index} />;
          })} */}
      </div>
      {editMode && (
        <div>
          <CardBlockAdd />
        </div>
      )}
    </div>
  );
};

export default BlockList;
