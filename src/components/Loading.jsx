import React from "react";
import ReactLoading from "react-loading";

export default function Loading() {
  return (
    <div className="flex items-center gap-2 w-full">
      <span className="font-medium text-zinc-800">
        <i>Loading</i>
      </span>
      <ReactLoading
        type={"bubbles"}
        color={"#000"}
        height={"50px"}
        width={"50px"}
        className="mx-auto"
      />
    </div>
  );
}
