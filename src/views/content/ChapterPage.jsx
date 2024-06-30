import ChapterTitleBlock from "../../features/chapters/ChapterTitleBlock";
import { useSelector } from "react-redux";
import { useGetChaptersQuery } from "../../features/chapters/chapterSlice";
import {
  selectEditMode,
  selectLanguage,
} from "../../features/globals/globalsSlice";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import FormChapterAdd from "../../features/chapters/FormChapterAdd";
import Loading from "../../features/components/Loading";
import { useGetChapterSummaryQuery } from "../../features/globals/globalsApiSlice";
import CardChapter from "../../features/chapters/CardChapter";
// Imported components

const ChapterPage = () => {
  const editMode = useSelector(selectEditMode);
  const language = useSelector(selectLanguage);
  const navigate = useNavigate();

  const [viewAddChapter, setViewAddChapter] = useState(false);

  useEffect(() => {
    if (!language?.id) {
      navigate("/language");
    }
  }, [language]);

  const {
    data: chapters,
    isLoading,
    isSuccess,
    isError,
    error,
  } = useGetChaptersQuery(language?.id || "language");

  const { data: chapterSummary, isSuccess: isSuccessSummary } =
    useGetChapterSummaryQuery(language?.id || "language");

  let content;
  if (isLoading) {
    content = <Loading />;
  } else if (isSuccess) {
    const { ids, entities } = chapters;
    content = ids.map((id) => {
      const foundItem = isSuccessSummary
        ? chapterSummary.entities[entities[id].id]
        : {};
      const lessonCount = foundItem?.total ?? 0;
      return (
        <>
          <CardChapter
            key={id}
            chapter={entities[id]}
            lessonCount={lessonCount}
          />
        </>
      );
    });
  } else if (isError) {
    content = <p>{JSON.stringify(error)}</p>;
  }

  return (
    <>
      <main>
        <header className="p-6 bg-zinc-500 text-white">
          <h1 className="mx-auto font-bold text-2xl">{language?.title}</h1>
        </header>
        <div>
          <div className="flex flex-wrap gap-4">{content}</div>
        </div>
        {/* {editMode ? (
          <button
            onClick={() => setViewAddChapter(!viewAddChapter)}
            className="btn btn-red"
          >
            Add Chapter
          </button>
        ) : null}
        {viewAddChapter ? <FormChapterAdd setAdd={setViewAddChapter} /> : null} */}
      </main>
    </>
  );
};

export default ChapterPage;
