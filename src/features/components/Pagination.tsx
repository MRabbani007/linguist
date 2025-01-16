import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import { useSearchParams } from "react-router-dom";

const ITEMS_PER_PAGE = 15;
const PAG_LEN = 5;

type Props = {
  count: number;
  currentPage: number;
  className?: string;
  itemsPerPage?: number;
};

export default function Pagination({
  count,
  currentPage,
  className,
  itemsPerPage = ITEMS_PER_PAGE,
}: Props) {
  const [searchParams, setSearchParams] = useSearchParams();

  const handlePage = (page: number) => {
    searchParams.set("page", page.toString());
    setSearchParams(searchParams);
  };

  // const handlePrev = () => {
  //   if (currentPage > 1) {
  //     setPage(currentPage - 1);
  //   }
  // };

  // const handleNext = () => {
  //   if (currentPage < Math.ceil(count / ITEMS_PER_PAGE)) {
  //     setPage(currentPage + 1);
  //   }
  // };

  const pages = Array.from(
    { length: Math.ceil(count / itemsPerPage) },
    (_, i) => i + 1
  );

  const isManyPages = pages.length > PAG_LEN;

  const sliceStart = currentPage > 2 ? currentPage - 2 : 1;
  const sliceEnd =
    currentPage < pages.length - 2 ? currentPage + 3 : pages.length + 1;

  const pagesToRender = isManyPages
    ? pages.slice(sliceStart - 1, sliceEnd - 1)
    : pages;

  const isFirst = currentPage === 1;
  const isLast = currentPage === Math.ceil(count / itemsPerPage);

  if (count < itemsPerPage) return null;

  return (
    <div
      className={
        "flex items-stretch text-center gap-1 font-medium " + className
      }
    >
      <button
        onClick={() => handlePage(currentPage - 1)}
        disabled={isFirst}
        className={
          " border-[2px] border-zinc-100 bg-zinc-50 hover:bg-zinc-100 disabled:bg-zinc-200 duration-100 py-1 px-2 rounded-md min-w-8 hidden sm:block"
        }
      >
        <IoIosArrowBack size={20} />
      </button>
      {isManyPages && currentPage > 2 ? (
        <button
          onClick={() => handlePage(1)}
          className={
            (isFirst ? " bg-zinc-200" : "bg-zinc-50 ") +
            " border-[2px] border-zinc-100 py-1 px-2 rounded-md min-w-8 hover:bg-zinc-100 duration-100"
          }
        >
          First
        </button>
      ) : null}
      {pagesToRender.map((item) => {
        return (
          <button
            key={item}
            onClick={() => handlePage(item)}
            className={
              (item === currentPage ? "border-yellow-300" : "border-zinc-100") +
              " border-[2px] py-1 px-2 rounded-md min-w-10 bg-zinc-50 hover:bg-zinc-100 duration-100"
            }
          >
            {item}
          </button>
        );
      })}
      {isManyPages && currentPage < pages.length - 2 ? (
        <button
          onClick={() => handlePage(pages.length)}
          className={
            (isLast ? "bg-zinc-200" : " bg-zinc-50") +
            " border-[2px] border-zinc-100 py-1 px-2 rounded-md min-w-8 hover:bg-zinc-100 duration-100"
          }
        >
          Last
        </button>
      ) : null}
      <button
        onClick={() => handlePage(currentPage + 1)}
        disabled={isLast}
        className={
          (isLast ? "bg-zinc-50" : " bg-zinc-200") +
          " border-[2px] border-zinc-100 bg-zinc-50 hover:bg-zinc-100 disabled:bg-zinc-200 duration-100 py-1 px-2 min-w-8 hidden sm:block rounded-md"
        }
      >
        <IoIosArrowForward size={20} />
      </button>
    </div>
  );
}
