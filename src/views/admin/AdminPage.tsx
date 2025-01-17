import { Link } from "react-router-dom";
import { useGetAllCountQuery } from "../../features/admin/adminApiSlice";
import { PiNotebook } from "react-icons/pi";
import { CgTranscript } from "react-icons/cg";
import { GrNotes } from "react-icons/gr";
import { VscSymbolParameter, VscWholeWord } from "react-icons/vsc";

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
        <p className="flex flex-col items-center justify-center bg-zinc-200 rounded-md overflow-hidden font-medium">
          <Link
            to={"/admin/chapters"}
            className="flex items-center gap-1 bg-sky-600 text-white p-4"
          >
            <PiNotebook size={25} />
            chapters
          </Link>
          <span className="p-2">{data?.chaptersCount}</span>
        </p>
        <p className="flex flex-col items-center justify-center bg-zinc-200 rounded-md overflow-hidden font-medium">
          <Link
            to={"/admin/lessons"}
            className="flex items-center gap-1 bg-sky-600 text-white p-4"
          >
            <GrNotes size={25} />
            lessons
          </Link>
          <span className="p-2">{data?.lessonsCount}</span>
        </p>
        <p className="flex flex-col items-center justify-center bg-zinc-200 rounded-md overflow-hidden font-medium">
          <Link
            to={"/admin/sections"}
            className="flex items-center gap-1 bg-sky-600 text-white p-4"
          >
            <CgTranscript size={25} />
            sections
          </Link>
          <span className="p-2">{data?.sectionsCount}</span>
        </p>
        <p className="flex flex-col items-center justify-center bg-zinc-200 rounded-md overflow-hidden font-medium">
          <Link
            to={"/admin/words"}
            className="flex items-center gap-1 bg-sky-600 text-white p-4"
          >
            <VscWholeWord size={25} />
            words
          </Link>
          <span className="p-2">{data?.wordsCount}</span>
        </p>
        <p className="flex flex-col items-center justify-center bg-zinc-200 rounded-md overflow-hidden font-medium">
          <Link
            to={"/admin/sentences"}
            className="flex items-center gap-1 bg-sky-600 text-white p-4"
          >
            <VscSymbolParameter size={25} />
            sentences
          </Link>
          <span className="p-2">{data?.sentenceCount}</span>
        </p>
      </div>
    );
  }
  return <div>{content}</div>;
}
