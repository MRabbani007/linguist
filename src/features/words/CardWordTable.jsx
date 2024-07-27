import React from "react";

export default function CardWordTable({ word, index }) {
  return (
    <div
      className={
        (index % 2 === 0 ? "bg-zinc-100" : "") +
        " text-gray-950 flex items-center gap-4"
      }
    >
      <p className="font-semibold text-lg flex-1 p-4" title={word?.third}>
        {word?.first}
      </p>
      <p className="text-md flex-1 p-4">{word?.second}</p>
    </div>
  );
}
