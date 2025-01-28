import { useDispatch } from "react-redux";
import { setDisplayChapter } from "../globals/globalsSlice";
import { Link } from "react-router-dom";

export default function CardChapter({ chapter }: { chapter: Chapter }) {
  const dispatch = useDispatch();

  const handleOpen = async () => {
    dispatch(setDisplayChapter(chapter));
    // navigate(`/title=${}&id=${}`,{});
    // navigate({
    //   pathname: "/content/chapter",
    //   search: `?${createSearchParams({
    //     title: chapter?.title,
    //     id: chapter?.id,
    //   })}`,
    // });
  };

  const level =
    chapter?.level === "beginner"
      ? { short: "A1", title: "A1 - Beginner" }
      : null;

  return (
    <div className="flex items-stretch duration-200 group relative group">
      {/* Chapter Number */}
      <p className="bg-red-600 w-10 text-lg flex items-center justify-center text-white rounded-lg">
        {chapter?.chapterNo}
      </p>
      <div className="px-4 py-2 my-2 flex-1 flex flex-col bg-zinc-100 group-hover:bg-white rounded-r-lg duration-200 shadow-md shadow-zinc-300">
        <Link
          onClick={handleOpen}
          to={`/learn/chapter?id=${chapter.id}&title=${chapter.title}`}
          className="text-xl md:text-2xl font-semibold"
        >
          {chapter?.title || ""}
        </Link>
        <p className="font-normal text-sm md:text-base">
          {chapter?.subtitle || ""}
        </p>
        {/* <p className="font-normal text-xs md:text-sm">
          {chapter?.detail || ""}
        </p> */}
      </div>
      <p
        className="absolute top-1/2 -translate-y-1/2 right-6 border-2 border-green-600 rounded-full w-8 h-8 flex items-center justify-center text-sm text-green-600"
        title={level?.title}
      >
        {level?.short}
      </p>
    </div>
  );
}
