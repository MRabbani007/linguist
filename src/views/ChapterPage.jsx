import ChapterTitleBlock from "../features/chapters/ChapterTitleBlock";
import CardChapterAdd from "../features/chapters/CardChapterAdd";
import { useSelector } from "react-redux";
import { useGetChaptersQuery } from "../features/chapters/chapterSlice";
import { selectEditMode } from "../features/globals/globalsSlice";
// Imported components

const ChapterPage = () => {
  const editMode = useSelector(selectEditMode);

  const {
    data: chapters,
    isLoading,
    isSuccess,
    isError,
    error,
  } = useGetChaptersQuery();

  let content;
  if (isLoading) {
    content = <p>"Loading..."</p>;
  } else if (isSuccess) {
    const { ids, entities } = chapters;
    content = ids.map((id) => (
      <ChapterTitleBlock key={id} chapter={entities[id]} />
    ));
  } else if (isError) {
    content = <p>{JSON.stringify(error)}</p>;
  }

  return (
    <div className="flex flex-col gap-3">
      <h2 className="font-bold text-xl text-center p-3 bg-slate-200 rounded-md shadow-md shadow-slate-400">
        Learn Russian Language
      </h2>
      <div className="flex flex-wrap flex-row items-stretch justify-center gap-3">
        {content}
      </div>
      {editMode && <CardChapterAdd />}
    </div>
  );
};

export default ChapterPage;
