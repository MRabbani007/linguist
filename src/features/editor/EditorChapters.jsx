import React from "react";
import { useGetAllChaptersQuery } from "../chapters/chapterSlice";
import EditorChapterCard from "./EditorChapterCard";
import EditorChaptersHeader from "./EditorChaptersHeader";

const EditorChapters = () => {
  const {
    data: blocks,
    isLoading,
    isSuccess,
    isError,
    error,
  } = useGetAllChaptersQuery();

  let content;
  if (isLoading) {
    content = <p>"Loading..."</p>;
  } else if (isSuccess) {
    // destructure blocks from normalized object
    const { ids, entities } = blocks;
    content = ids.map((id, index) => (
      <EditorChapterCard key={id} chapter={entities[id]} index={index} />
    ));
  } else if (isError) {
    content = <p>{error}</p>;
  }

  return (
    <div>
      <h2>Chapters</h2>
      <table>
        <thead>
          <EditorChaptersHeader />
        </thead>
        <tbody>{content}</tbody>
      </table>
    </div>
  );
};

export default EditorChapters;
