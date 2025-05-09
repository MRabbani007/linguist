import { FormEvent, useEffect, useState } from "react";
import Sentence from "../../features/sentences/Sentence";
import {
  Link,
  createSearchParams,
  useNavigate,
  useSearchParams,
} from "react-router-dom";
import { useSelector } from "react-redux";
import {
  selectDisplayLesson,
  selectLessons,
} from "../../features/globals/globalsSlice";
import { MdOutlinePlayLesson } from "react-icons/md";
import { IoSearchOutline } from "react-icons/io5";
import Pagination from "../../components/Pagination";
import ReactLoading from "react-loading";
import { useLazySearchSentencesQuery } from "@/features/globals/globalsApiSlice";
import { BiCollapse, BiExpand, BiFilter, BiX } from "react-icons/bi";
import FormSentenceFilter from "@/features/sentences/FormSentenceFilter";
import { ITEMS_PER_PAGE } from "@/lib/constants";
import FormDisplaySentence from "@/features/sentences/FormDisplaySentence";

export default function SentencesPage() {
  const displayBlock = useSelector(selectDisplayLesson);
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const search = searchParams.get("search") ?? "";
  const page = searchParams.get("page") ?? 1;
  const level = searchParams.get("level") ?? "";
  const lessonID = searchParams.get("lessonID") ?? "";
  let count = 0;

  const lessons = useSelector(selectLessons);
  const lesson = lessons?.find((item) => item.id === lessonID);

  const [searchTerm, setSearchTerm] = useState("");
  const [showFilter, setShowFilter] = useState(false);
  const [showSentences, setShowSentences] = useState(false);
  const [dispalayIndex, setDisplayIndex] = useState(-1);

  useEffect(() => {
    setSearchTerm(search ?? "");
  }, [search]);

  const [display, setDisplay] = useState("condensed");

  const [searchSentences, { data, isLoading, isSuccess, isError }] =
    useLazySearchSentencesQuery();

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();

    navigate({
      pathname: "/sentences",
      search: `${createSearchParams({ search: searchTerm })}`,
    });
  };

  const handleClear = (clearItem: string) => {
    let params: {
      search?: string;
      lessonID?: string;
      level?: string;
      page?: string;
    } = {};
    if (clearItem !== "search" && search) {
      params.search = search;
    }
    if (clearItem !== "lessonID" && lessonID !== "") {
      params.lessonID = lessonID;
    }
    if (clearItem !== "level" && level !== "") {
      params.level = level;
    }
    if (page && page !== 1) {
      params.page = page;
    }
    navigate({
      pathname: "/sentences",
      search: `${createSearchParams(params)}`,
    });
  };

  useEffect(() => {
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
    content = data.data.map((item: Sentence, idx) => {
      return (
        <div
          onClick={() => {
            setShowSentences(true);
            setDisplayIndex(idx);
          }}
          className="cursor-pointer"
        >
          <Sentence sentence={item} key={item.id} display={display} />
        </div>
      );
    });
  } else if (isError) {
    content = <p>Error Loading Sentences</p>;
  }

  const fromNo = isSuccess ? (+page - 1) * ITEMS_PER_PAGE + 1 : 0;

  const toNo =
    isSuccess && +page * ITEMS_PER_PAGE < count
      ? +page * ITEMS_PER_PAGE
      : count;

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
        <div className="flex items-center gap-2">
          {search && (
            <p className="py-1 px-4 bg-zinc-100 rounded-md relative group">
              {search}
              <button
                onClick={() => handleClear("search")}
                className="absolute hidden group-hover:inline-block top-0 right-0"
              >
                <BiX size={20} />
              </button>
            </p>
          )}
          {level && (
            <p className="py-1 px-4 bg-zinc-100 rounded-md relative group">
              {level}
              <button
                onClick={() => handleClear("level")}
                className="absolute hidden group-hover:inline-block top-0 right-0"
              >
                <BiX size={20} />
              </button>
            </p>
          )}
          {lessonID && lesson && (
            <p className="py-1 px-4 bg-zinc-100 rounded-md relative group">
              {lesson?.title}
              <button
                onClick={() => handleClear("lessonID")}
                className="absolute hidden group-hover:inline-block top-0 right-0"
              >
                <BiX size={20} />
              </button>
            </p>
          )}
          <p>
            {isSuccess
              ? count === 0
                ? `0 results`
                : count === 1
                ? "1 result"
                : count < ITEMS_PER_PAGE
                ? `${count} results`
                : `${fromNo} to ${toNo} of ${count}` + " results"
              : null}
          </p>
        </div>
        <div className="flex items-center gap-4">
          <button
            onClick={() => setShowFilter(true)}
            className="p-1 bg-zinc-100 hover:bg-zinc-200 duration-200 rounded-md"
          >
            <BiFilter size={25} />
          </button>
          <button
            className="p-1 bg-zinc-100 hover:bg-zinc-200 duration-200 rounded-md"
            onClick={() =>
              setDisplay((curr) => (curr === "condensed" ? "" : "condensed"))
            }
          >
            {display === "condensed" ? (
              <BiExpand size={20} />
            ) : (
              <BiCollapse size={20} />
            )}
          </button>
          <button
            onClick={() => setShowSentences((curr) => !curr)}
            className="py-1 px-3 font-medium rounded-md shadow-sm shadow-zinc-400 hover:shadow-md hover:shadow-zinc-400 duration-200 bg-red-100"
          >
            S
          </button>
          <Pagination currentPage={+page} count={count} className="ml-auto" />
        </div>
        <div className="w-full flex flex-col gap-2">{content}</div>
        <div className="flex items-center gap-4 my-4">
          {lessonID?.trim() ? (
            <Link
              to={`/learn/lesson?id=${displayBlock?.id}`}
              className="flex items-center gap-2 mr-auto"
            >
              <span>Back to Lesson</span>
              <MdOutlinePlayLesson size={32} />
            </Link>
          ) : (
            <Link to={"/learn"} className="flex items-center gap-2 mr-auto">
              <span>Go to lessons</span>
              <MdOutlinePlayLesson size={32} />
            </Link>
          )}
          <Pagination currentPage={+page} count={count} />
        </div>
        {showFilter && (
          <FormSentenceFilter
            setShowForm={setShowFilter}
            levelInit={level ?? ""}
            lessonIDInit={lessonID ?? ""}
          />
        )}
        <FormDisplaySentence
          sentences={Array.isArray(data?.data) ? data.data : []}
          title={lesson?.title ?? "Sentences"}
          showForm={showSentences}
          setShowForm={setShowSentences}
          initialIndex={dispalayIndex}
        />
      </main>
    </>
  );
}
