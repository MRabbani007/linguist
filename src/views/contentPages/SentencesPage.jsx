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
    <main>
      <header className="bg-gradient-to-r from-zinc-600 to-zinc-400 text-white">
        <h1>Sentences</h1>
      </header>
      <div>
        {/* <div>Filter Section</div> */}
        <p className="text-lg italic">{displayBlock?.title}</p>
        <div className="w-full flex flex-col gap-4">{content}</div>
        <div>
          <Link to={`/lesson/${displayBlock.id}`}>Back to Lesson</Link>
        </div>
      </div>
    </main>
  );
}
