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
import { BiFilter } from "react-icons/bi";
import FormSentenceFilter from "@/features/sentences/FormSentenceFilter";

export default function SentencesPage() {
  const displayBlock = useSelector(selectDisplayLesson);
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const search = searchParams.get("search") ?? null;
  const page = searchParams.get("page") ?? 1;
  const level = searchParams.get("level") ?? "";
  const lessonID = searchParams.get("lessonID") ?? "";
  let count = 0;

  // const location = useLocation();
  // const from = location.state?.from?.pathname || "/";

  const [searchTerm, setSearchTerm] = useState("");
  const [showFilter, setShowFilter] = useState(false);
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
    searchSentences({ searchTerm: search, lessonID, page, level });
  }, [search, lessonID, page, level]);

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
        {/* <p>{lessonID}</p> */}
        {/* <SortSentences sort={sort} setSort={setSort} /> */}
        <div className="flex items-center gap-4 justify-between">
          <Pagination currentPage={+page} count={count} />
          {/* <button onClick={() => setShowFilter(true)}>
            <BiFilter size={25} />
          </button> */}
        </div>
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
        {/* {showFilter && <FormSentenceFilter setShowForm={setShowFilter} />} */}
      </main>
    </>
  );
}
