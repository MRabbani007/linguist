import React, { useEffect, useState } from "react";
import {
  useLazyGetSentencesAllQuery,
  useLazyGetSentencesQuery,
} from "../../features/sentences/sentencesSlice";
import Sentence from "../../features/sentences/Sentence";
import {
  Link,
  createSearchParams,
  useLocation,
  useNavigate,
  useParams,
  useSearchParams,
} from "react-router-dom";
import { useSelector } from "react-redux";
import {
  selectDisplayBlock,
  selectEditMode,
  selectSentenceCount,
} from "../../features/globals/globalsSlice";
import { CiSearch } from "react-icons/ci";
import { useDebounce } from "use-debounce";
import { FaPlus } from "react-icons/fa6";
import FormSentenceAdd from "../../features/sentences/FormSentenceAdd";
import { MdOutlinePlayLesson } from "react-icons/md";
import { IoSearchOutline } from "react-icons/io5";
import { GoPlus } from "react-icons/go";
import Pagination from "../../features/components/Pagination";
import ReactLoading from "react-loading";
import FilterSentences from "../../features/sentences/FilterSentences";
import SortSentences from "../../features/sentences/SortSentences";
import { toast } from "react-toastify";

const SENTENCE_SORT = [
  "createDate",
  "translation",
  "level",
  "baseWordTranslation",
  "lessonID",
];

const sortFunction = (type, payload) => {
  switch (type) {
    case "createDate": {
    }
    case "translation": {
    }
    case "level": {
    }
    case "difficulty": {
    }
    case "baseWordT": {
    }
    default: {
      return payload;
    }
  }
};

const filterFunction = (filters, payload) => {
  let result = payload;
  if (filters.includes("lesson")) {
  }
  return result;
};

export default function SentencesPage() {
  const displayBlock = useSelector(selectDisplayBlock);
  const editMode = useSelector(selectEditMode);
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const search = searchParams.get("search") ?? null;
  const page = searchParams.get("page") ?? 1;

  const { lessonID } = useParams();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";

  const [add, setAdd] = useState(false);

  const [searchTerm, setSearchTerm] = useState("");
  const [value] = useDebounce(search, 1000);
  const [sort, setSort] = useState("");

  const count = useSelector(selectSentenceCount);
  const [sentences, setSentences] = useState([]);

  const [getSentencesAll, { data, isLoading, isSuccess, isError, error }] =
    useLazyGetSentencesAllQuery();

  const handleSubmit = (e) => {
    e.preventDefault();

    if (searchTerm.trim()) {
      navigate({
        pathname: "/sentences",
        search: `${createSearchParams({ search: searchTerm })}`,
      });
    }
  };

  useEffect(() => {
    getSentencesAll({ searchTerm: search, lessonID, page });
  }, [search, lessonID, page]);

  // useEffect(() => {
  //   setPage(1);
  //   getSentencesAll({ searchTerm: value, lessonID, page: 1, ...sort });
  // }, [value, sort]);

  // useEffect(() => {
  //   getSentencesAll({ searchTerm: value, lessonID, page, ...sort });
  // }, [page]);

  useEffect(() => {
    if (Array.isArray(data?.ids)) {
      setSentences(data.ids.map((id) => data.entities[id]));
    }
  }, [data, isSuccess]);

  let content = "";
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
    const { ids, entities } = data;
    content = ids.map((id) => {
      return <Sentence sentence={entities[id]} key={id} />;
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
      {editMode ? (
        <button title="Add sentence" onClick={() => setAdd(true)}>
          <GoPlus size={28} />
        </button>
      ) : null}
      {add ? <FormSentenceAdd setAdd={setAdd} /> : null}
    </>
  );
}
