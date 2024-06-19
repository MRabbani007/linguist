import { useGetAllBlocksQuery } from "../blocks/blockSlice";
import EditorBlockTitle from "./EditorBlockTitle";
import EditorBlocksHeader from "./EditorBlocksHeader";

const EditorBlocks = () => {
  const {
    data: blocks,
    isLoading,
    isSuccess,
    isError,
    error,
  } = useGetAllBlocksQuery();

  let content;
  if (isLoading) {
    content = <p>"Loading..."</p>;
  } else if (isSuccess) {
    // destructure blocks from normalized object
    const { ids, entities } = blocks;
    content = (
      <tbody>
        {ids.map((id, index) => (
          <EditorBlockTitle key={id} block={entities[id]} index={index} />
        ))}
      </tbody>
    );
  } else if (isError) {
    content = <p>{error}</p>;
  }

  return (
    <div>
      <h2>Blocks</h2>
      <table>
        <thead>
          <EditorBlocksHeader />
        </thead>
        {content}
      </table>
    </div>
  );
};

export default EditorBlocks;
