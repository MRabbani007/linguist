import React from "react";

const ITEMS_PER_PAGE = 15;

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

  const isFirst = currentPage === 0;
  const isLast = currentPage === Math.ceil(count / ITEMS_PER_PAGE);

  return (
    <ul className="flex items-center text-center">
      <li
        onClick={handlePrev}
        className={
          (isFirst ? "bg-zinc-400" : "cursor-pointer") +
          " py-1 px-2 border-[1px] min-w-8"
        }
      >
        Prev
      </li>
      {new Array(Math.ceil(count / ITEMS_PER_PAGE))
        .fill("")
        .map((item, index) => {
          return (
            <li
              key={index}
              onClick={() => setPage(index + 1)}
              className={
                (index === currentPage - 1 ? "bg-yellow-300" : "") +
                " py-1 px-2 border-[1px] cursor-pointer min-w-8"
              }
            >
              {index + 1}
            </li>
          );
        })}
      <li
        onClick={handleNext}
        className={
          (isLast ? "bg-zinc-400" : "cursor-pointer") +
          " py-1 px-2 border-[1px] min-w-8"
        }
      >
        Next
      </li>
    </ul>
  );
}
