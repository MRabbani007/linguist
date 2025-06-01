import { Link } from "react-router-dom";
import { useGetAllCountQuery } from "../../features/admin/adminApiSlice";
import { PiNotebook } from "react-icons/pi";
import { CgTranscript } from "react-icons/cg";
import { GrNotes } from "react-icons/gr";
import { VscSymbolParameter, VscWholeWord } from "react-icons/vsc";
import { RiSpeakLine } from "react-icons/ri";

export default function AdminPage() {
  const { data, isLoading, isSuccess } = useGetAllCountQuery("a");

  const learningContentLinks = [
    {
      icon: <PiNotebook size={30} />,
      label: "Chapters",
      url: "/admin/chapters",
      count: data?.chaptersCount,
    },
    {
      icon: <GrNotes size={25} />,
      label: "Lessons",
      url: "/admin/lessons",
      count: data?.lessonsCount,
    },
    {
      icon: <CgTranscript size={25} />,
      label: "Sections",
      url: "/admin/sections",
      count: data?.sectionsCount,
    },
  ];

  const reviewLinks = [
    {
      icon: <VscWholeWord size={25} />,
      label: "Words",
      url: "/admin/words",
      count: data?.wordsCount,
    },
    {
      icon: <VscWholeWord size={25} />,
      label: "Word Attributes",
      url: "/admin/attributes",
      count: 0,
    },
    {
      icon: <VscWholeWord size={25} />,
      label: "Word Lists",
      url: "/admin/words",
      count: 0,
    },
    {
      icon: <VscSymbolParameter size={25} />,
      label: "Sentences",
      url: "/admin/sentences",
      count: data?.sentenceCount,
    },
  ];

  const textsDialoguesLinks = [
    {
      label: "Dialogues",
      url: "/admin/dialogues",
      icon: <RiSpeakLine size={25} />,
      count: 0,
    },
    {
      label: "Texts",
      url: "/admin/dialogues",
      icon: <RiSpeakLine size={25} />,
      count: 0,
    },
  ];

  return (
    <div>
      <h2 className="text-lg font-medium">Learning Content</h2>
      {isLoading ? (
        <div className="flex items-center gap-2">
          <p className="min-w-20 min-h-20 bg-zinc-200 rounded-md animate-pulse"></p>
          <p className="min-w-20 min-h-20 bg-zinc-200 rounded-md animate-pulse"></p>
          <p className="min-w-20 min-h-20 bg-zinc-200 rounded-md animate-pulse"></p>
        </div>
      ) : isSuccess ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 text-center">
          {learningContentLinks.map((item) => (
            <p
              key={item.label}
              className="flex flex-col bg-zinc-200 rounded-md overflow-hidden font-medium"
            >
              <Link
                to={item.url}
                className="flex items-center justify-center gap-1 bg-sky-600 text-white p-4"
              >
                {item.icon}
                {item.label}
              </Link>
              <span className="p-2">{item.count}</span>
            </p>
          ))}
        </div>
      ) : (
        <p>Something went wrong!</p>
      )}
      <h2 className="text-lg font-medium">Review</h2>
      {isLoading ? (
        <div className="flex items-center gap-2">
          <p className="min-w-20 min-h-20 bg-zinc-200 rounded-md animate-pulse"></p>
          <p className="min-w-20 min-h-20 bg-zinc-200 rounded-md animate-pulse"></p>
          <p className="min-w-20 min-h-20 bg-zinc-200 rounded-md animate-pulse"></p>
        </div>
      ) : isSuccess ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 text-center">
          {reviewLinks.map((item) => (
            <p
              key={item.label}
              className="flex flex-col bg-zinc-200 rounded-md overflow-hidden font-medium"
            >
              <Link
                to={item.url}
                className="flex items-center justify-center gap-1 bg-sky-600 text-white p-4"
              >
                {item.icon}
                {item.label}
              </Link>
              <span className="p-2">{item.count}</span>
            </p>
          ))}
        </div>
      ) : (
        <p>Something went wrong!</p>
      )}
      <h2 className="text-lg font-medium">Texts & Dialogues</h2>
      {isLoading ? (
        <div className="flex items-center gap-2">
          <p className="min-w-20 min-h-20 bg-zinc-200 rounded-md animate-pulse"></p>
          <p className="min-w-20 min-h-20 bg-zinc-200 rounded-md animate-pulse"></p>
          <p className="min-w-20 min-h-20 bg-zinc-200 rounded-md animate-pulse"></p>
        </div>
      ) : isSuccess ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 text-center">
          {textsDialoguesLinks.map((item) => (
            <p
              key={item.label}
              className="flex flex-col bg-zinc-200 rounded-md overflow-hidden font-medium"
            >
              <Link
                to={item.url}
                className="flex items-center justify-center gap-1 bg-sky-600 text-white p-4"
              >
                {item.icon}
                {item.label}
              </Link>
              <span className="p-2">{item.count}</span>
            </p>
          ))}
        </div>
      ) : (
        <p>Something went wrong!</p>
      )}
    </div>
  );
}
