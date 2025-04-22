import { FormEvent, useEffect, useState } from "react";
import {
  Link,
  createSearchParams,
  useNavigate,
  useSearchParams,
} from "react-router-dom";
import { axiosPrivate } from "../../api/axios";
import CardWord from "../../features/words/CardWord";
import Pagination from "../../components/Pagination";
import { useFetchAttributes } from "../../hooks/useFetchAttributes";

export default function WordsPage() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const [loading, setLoading] = useState(false);

  const [searchTerm, setSearchTerm] = useState("");

  const search = searchParams.get("search") ?? null;
  const page = searchParams.get("page") ?? 1;

  const subject = searchParams.get("subject") ?? null;
  const level = searchParams.get("level") ?? null;
  const type = searchParams.get("type") ?? null;
  const gender = searchParams.get("gender") ?? null;

  const [words, setWords] = useState([]);
  const [count, setCount] = useState(0);

  const [data] = useFetchAttributes();

  // const { isLoading, isSuccess, isError } = state as {
  //   isLoading: boolean;
  //   isSuccess: boolean;
  //   isError: boolean;
  // };

  // TODO: Remove
  // const fetchFilters = async () => {
  //   try {
  //     const response = await axiosPrivate.get("/review/filters");

  //     if (response?.status === 200) {
  //       setSubjects(response.data.subjects.filter((item) => item !== ""));
  //       setLevels(response.data.levels.filter((item) => item !== ""));
  //       setTypes(response.data.types.filter((item) => item !== ""));
  //     }
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

  const fetchWords = async () => {
    try {
      setLoading(true);

      const response = await axiosPrivate.get("/review/words", {
        params: { subject, level, type, gender, page, search },
      });

      if (response?.status === 200 && Array.isArray(response.data.data)) {
        setWords(response.data.data);
        setCount(response.data.count);
      }

      setLoading(false);
    } catch (error) {
      setLoading(false);
    }
  };

  const onSubmit = (event: FormEvent) => {
    event.preventDefault();

    if (searchTerm.trim()) {
      navigate({
        pathname: "/review/words",
        search: `${createSearchParams({ search: searchTerm })}`,
      });
    }
  };

  useEffect(() => {
    fetchWords();
  }, [subject, level, type, search, page]);

  return (
    <main className="">
      <form
        onSubmit={onSubmit}
        className="flex items-center justify-center gap-2 bg-zinc-400/10 py-2 px-4 rounded-md"
      >
        <input
          type="text"
          className="bg-transparent flex-1"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <button type="submit" className="font-bold">
          Search
        </button>
      </form>
      <div className="flex items-center gap-4">
        {[
          { label: "Search", value: search },
          { label: "Subject", value: subject },
          { label: "Level", value: level },
          { label: "Type", value: type },
          { label: "Gender", value: gender },
        ].map((item) =>
          item?.value ? (
            <p
              className="p-2 bg-zinc-100 rounded-md space-x-2"
              key={item.label}
            >
              <span>{item.label}:</span>
              <span>{item.value}</span>
            </p>
          ) : null
        )}
        {count}
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {loading ? (
          <p>Loading...</p>
        ) : words.length === 0 ? (
          <p>No data matched your search</p>
        ) : (
          words.map((word, index) => <CardWord word={word} key={index} />)
        )}
      </div>
      <Pagination
        count={count}
        currentPage={+page}
        className="mx-auto"
        itemsPerPage={30}
      />
      <div className="flex flex-wrap items-stretch gap-8">
        {Array.isArray(data) &&
          data.map((item, index) => (
            <div key={index} className="w-full sm:flex-1">
              <p className="font-bold text-xl py-2 px-4 bg-zinc-200 text-center">
                {item.label}
              </p>
              <div className="flex-1">
                {item?.values.map((attrVal, idx) => (
                  <div
                    key={idx}
                    className="py-2 px-4 bg-zinc-100 hover:bg-zinc-200 duration-200"
                  >
                    <Link
                      to={{
                        pathname: "/review/words",
                        search: `?${item.slug}=${encodeURIComponent(
                          attrVal.label
                        )}`,
                      }}
                    >
                      {attrVal.label}
                    </Link>
                  </div>
                ))}
              </div>
            </div>
          ))}
      </div>
    </main>
  );
}
