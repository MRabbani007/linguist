import React from "react";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";

const ITEMS_PER_PAGE = 15;
const PAG_LEN = 5;

export default function Pagination({ count, currentPage, setPage }) {
  const handlePrev = () => {
    if (currentPage > 1) {
      setPage(currentPage - 1);
    }
  };

  const handleNext = () => {
    if (currentPage < Math.ceil(count / ITEMS_PER_PAGE)) {
      setPage(currentPage + 1);
    }
  };

  const pages = Array.from(
    { length: Math.ceil(count / ITEMS_PER_PAGE) },
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
  const isLast = currentPage === Math.ceil(count / ITEMS_PER_PAGE);

  return (
    <div className="flex items-center text-center gap-1 font-medium">
      <button
        onClick={handlePrev}
        className={
          (isFirst ? "bg-zinc-200" : "cursor-pointer bg-zinc-50") +
          " py-1 px-2 rounded-md min-w-8 hidden sm:block"
        }
      >
        <IoIosArrowBack size={24} />
      </button>
      {isManyPages && currentPage > 2 ? (
        <button
          onClick={() => setPage(1)}
          className={
            (isFirst ? "bg-zinc-200" : "cursor-pointer bg-zinc-50") +
            " py-1 px-2 rounded-md min-w-8"
          }
        >
          First
        </button>
      ) : null}
      {pagesToRender.map((item) => {
        return (
          <button
            key={item}
            onClick={() => setPage(item)}
            className={
              (item === currentPage ? "bg-yellow-300" : "bg-zinc-200") +
              " py-1 px-2 cursor-pointer rounded-md min-w-8"
            }
          >
            {item}
          </button>
        );
      })}
      {isManyPages && currentPage < pages.length - 2 ? (
        <button
          onClick={() => setPage(pages.length)}
          className={
            (isLast ? "bg-zinc-200" : "cursor-pointer bg-zinc-50") +
            " py-1 px-2 rounded-md min-w-8"
          }
        >
          Last
        </button>
      ) : null}
      <button
        onClick={handleNext}
        className={
          (isLast ? "bg-zinc-200" : "cursor-pointer bg-zinc-50") +
          " py-1 px-2 min-w-8 hidden sm:block rounded-md"
        }
      >
        <IoIosArrowForward size={24} />
      </button>
    </div>
  );
}
