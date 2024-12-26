import { FormEvent, useEffect, useState } from "react";
import Sentence from "../../features/sentences/Sentence";
import {
  Link,
  createSearchParams,
  useNavigate,
  useParams,
  useSearchParams,
} from "react-router-dom";
import { useSelector } from "react-redux";
import { selectDisplayLesson } from "../../features/globals/globalsSlice";
// import { useDebounce } from "use-debounce";
import { MdOutlinePlayLesson } from "react-icons/md";
import { IoSearchOutline } from "react-icons/io5";
import Pagination from "../../features/components/Pagination";
import ReactLoading from "react-loading";
import { useLazySearchSentencesQuery } from "@/features/globals/globalsApiSlice";

// const SENTENCE_SORT = [
//   "createDate",
//   "translation",
//   "level",
//   "baseWordTranslation",
//   "lessonID",
// ];

// const sortFunction = (type, payload) => {
//   switch (type) {
//     case "createDate": {
//     }
//     case "translation": {
//     }
//     case "level": {
//     }
//     case "difficulty": {
//     }
//     case "baseWordT": {
//     }
//     default: {
//       return payload;
//     }
//   }
// };

// const filterFunction = (filters, payload) => {
//   let result = payload;
//   if (filters.includes("lesson")) {
//   }
//   return result;
// };

export default function SentencesPage() {
  const displayBlock = useSelector(selectDisplayLesson);
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const search = searchParams.get("search") ?? null;
  const page = searchParams.get("page") ?? 1;
  let count = 0;

  const { lessonID } = useParams();
  // const location = useLocation();
  // const from = location.state?.from?.pathname || "/";

  const [searchTerm, setSearchTerm] = useState("");
  // const [value] = useDebounce(search, 1000);
  // const [sort, setSort] = useState("");

  const [searchSentences, { data, isLoading, isSuccess, isError }] =
    useLazySearchSentencesQuery();

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();

    if (searchTerm.trim()) {
      navigate({
        pathname: "/sentences",
        search: `${createSearchParams({ search: searchTerm })}`,
      });
    }
  };

  useEffect(() => {
    // if (searchTerm !== "" || (lessonID && lessonID !== "")) {
    searchSentences({ searchTerm: search, lessonID, page });
  }, [search, lessonID, page]);

  let content;
  if (isLoading) {
    content = (
      <ReactLoading
        type={"bubbles"}
        color={"#000"}
        height={"10%"}
        width={"10%"}
        className="mx-auto"
      />
    );
  } else if (isSuccess) {
    count = data.count;
    content = data.data.map((item: Sentence) => {
      return <Sentence sentence={item} key={item.id} />;
    });
  } else if (isError) {
    content = <p>Error Loading Sentences</p>;
  }

  return (
    <>
      <main>
        <div className="flex flex-col gap-4">
          <form
            onSubmit={handleSubmit}
            className="flex items-center justify-center gap-2 bg-zinc-400/10 py-2 px-4 rounded-md"
          >
            <input
              type="text"
              title="Search sentences"
              placeholder="Search..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="bg-transparent flex-1"
            />
            <button type="submit">
              <IoSearchOutline size={32} />
            </button>
          </form>
          <p>{isSuccess ? count + " results" : null}</p>
          {/* <SortSentences sort={sort} setSort={setSort} /> */}
          <Pagination currentPage={+page} count={count} />
          <div className="w-full flex flex-col gap-4">{content}</div>
          <Pagination currentPage={+page} count={count} />
          <div className="my-2">
            {displayBlock?.id ? (
              <Link
                to={`/learn/lesson?id=${displayBlock?.id}`}
                className="flex items-center gap-2"
              >
                <span>Back to Lesson</span>
                <MdOutlinePlayLesson size={32} />
              </Link>
            ) : (
              <Link to={"/learn/chapters"} className="flex items-center gap-2">
                <span>Go to lessons</span>
                <MdOutlinePlayLesson size={32} />
              </Link>
            )}
          </div>
        </div>
      </main>
    </>
  );
}
