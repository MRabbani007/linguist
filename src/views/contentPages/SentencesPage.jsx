import React, { useEffect, useState } from "react";
import { useGetSentencesQuery } from "../../features/sentences/sentencesSlice";
import Sentence from "../../features/sentences/Sentence";
import { Link, useLocation, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectDisplayBlock } from "../../features/globals/globalsSlice";

export default function SentencesPage() {
  const displayBlock = useSelector(selectDisplayBlock);
  const { lessonID } = useParams();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";

  const { data, isLoading, isSuccess } = useGetSentencesQuery(lessonID || null);

  let content;
  if (isLoading) {
    content = <p>Loading...</p>;
  }
  if (isSuccess) {
    content = data.ids.map((id) => {
      return <Sentence sentence={data.entities[id]} key={id} />;
    });
  }

  return (
    <main className="flex flex-1 flex-col gap-4 max-w-[1000px] mx-auto">
      <header>
        <h1 className="text-2xl">Sentences</h1>
        <p className="text-lg italic">{displayBlock?.title}</p>
      </header>
      {/* <div>Filter Section</div> */}
      <div className="w-full flex flex-col gap-4">{content}</div>
      <div>
        <Link to={`/lesson/${displayBlock.id}`}>Back to Lesson</Link>
      </div>
    </main>
  );
}
