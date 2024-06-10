import ChapterTitleBlock from "../../features/chapters/ChapterTitleBlock";
import CardChapterAdd from "../../features/chapters/CardChapterAdd";
import { useSelector } from "react-redux";
import { useGetChaptersQuery } from "../../features/chapters/chapterSlice";
import {
  selectEditMode,
  selectLanguage,
} from "../../features/globals/globalsSlice";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
// Imported components

const ChapterPage = () => {
  const editMode = useSelector(selectEditMode);
  const language = useSelector(selectLanguage);
  const navigate = useNavigate();

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
    <>
      <main>
        <header className=" from-zinc-200 to-white text-zinc-600 border-2 border-zinc-400">
          <h1 className="mx-auto font-bold text-2xl">{language?.title}</h1>
        </header>
        <div>
          <div className="flex flex-wrap flex-row items-stretch justify-center gap-3">
            {content}
          </div>
        </div>
        {editMode && <CardChapterAdd />}
      </main>
    </>
  );
};

export default ChapterPage;
