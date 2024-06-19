import React from "react";
import Skeleton from "./Skeleton";

export default function SkeletonChapterPage() {
  return (
    <div className="">
      <Skeleton classes="chapterCard" />
      <Skeleton classes="chapterCard" />
      <Skeleton classes="chapterCard" />
      <Skeleton classes="chapterCard" />
      <Skeleton classes="chapterCard" />
      <Skeleton classes="chapterCard" />
    </div>
  );
}
