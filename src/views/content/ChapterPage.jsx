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
        <ChapterTitleBlock
          key={id}
          chapter={entities[id]}
          lessonCount={lessonCount}
        />
      );
    });
  } else if (isError) {
    content = <p>{JSON.stringify(error)}</p>;
  }

  return (
    <>
      <main>
        <header className="from-zinc-200 to-white text-zinc-600 border-2 border-zinc-400">
          <h1 className="mx-auto font-bold text-2xl">{language?.title}</h1>
        </header>
        <div>
          <div className="grid lg:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-4">
            {content}
          </div>
        </div>
        {editMode ? (
          <button
            onClick={() => setViewAddChapter(!viewAddChapter)}
            className="btn btn-red"
          >
            Add Chapter
          </button>
        ) : null}
        {viewAddChapter ? <FormChapterAdd setAdd={setViewAddChapter} /> : null}
      </main>
    </>
  );
};

export default ChapterPage;
