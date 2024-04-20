import { useContext } from "react";
import { GlobalContext } from "../../context/GlobalState";
import CardChapterTitle from "./CardChapterTitle";
import CardChapterAdd from "./CardChapterAdd";
import { useSelector } from "react-redux";
import { selectAllChapters, useGetChaptersQuery } from "./chapterSlice";
import { selectEditMode } from "../globals/globalsSlice";

const SectionChapterList = () => {
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
      <CardChapterTitle key={id} chapter={entities[id]} />
    ));
  } else if (isError) {
    content = <p>{JSON.stringify(error)}</p>;
  }

  return (
    <div className="flex flex-col gap-3">
      <h2 className="font-bold text-xl text-center my-2 p-3 bg-slate-200 rounded-lg shadow-md shadow-slate-400">
        Learn Russian Language
      </h2>
      <div className="flex flex-wrap flex-row items-stretch justify-center gap-3">
        {content}
      </div>
      {editMode && <CardChapterAdd />}
    </div>
  );
};

export default SectionChapterList;
