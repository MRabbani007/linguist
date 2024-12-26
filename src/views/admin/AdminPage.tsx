import { useGetAllCountQuery } from "../../features/admin/adminApiSlice";

export default function AdminPage() {
  const { data, isLoading, isSuccess } = useGetAllCountQuery("a");

  let content;
  if (isLoading) {
    content = (
      <div className="flex items-center gap-2">
        <p className="min-w-20 min-h-20 bg-zinc-200 rounded-md animate-pulse"></p>
        <p className="min-w-20 min-h-20 bg-zinc-200 rounded-md animate-pulse"></p>
        <p className="min-w-20 min-h-20 bg-zinc-200 rounded-md animate-pulse"></p>
        <p className="min-w-20 min-h-20 bg-zinc-200 rounded-md animate-pulse"></p>
        <p className="min-w-20 min-h-20 bg-zinc-200 rounded-md animate-pulse"></p>
      </div>
    );
  } else if (isSuccess) {
    content = (
      <div className="flex flex-wrap items-center gap-2">
        <p className="flex flex-col items-center justify-center gap-2 p-4 bg-zinc-200 rounded-md font-medium">
          <span>chapters</span>
          <span>{data?.chaptersCount}</span>
        </p>
        <p className="flex flex-col items-center justify-center gap-2 p-4 bg-zinc-200 rounded-md font-medium">
          <span>lessons</span>
          <span>{data?.lessonsCount}</span>
        </p>
        <p className="flex flex-col items-center justify-center gap-2 p-4 bg-zinc-200 rounded-md font-medium">
          <span>sections</span>
          <span>{data?.sectionsCount}</span>
        </p>
        <p className="flex flex-col items-center justify-center gap-2 p-4 bg-zinc-200 rounded-md font-medium">
          <span>words</span>
          <span>{data?.wordsCount}</span>
        </p>
        <p className="flex flex-col items-center justify-center gap-2 p-4 bg-zinc-200 rounded-md font-medium">
          <span>sentences</span>
          <span>{data?.sentenceCount}</span>
        </p>
      </div>
    );
  }
  return (
    <main>
      <div>{content}</div>
    </main>
  );
}
