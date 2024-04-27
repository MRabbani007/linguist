import React, { useState } from "react";
import SectionIntro from "./SectionIntro";
import SectionEditTitle from "./SectionEditTitle";
import SectionTitle from "./SectionTitle";
import CardWordList from "../words/CardWordList";

export default function Section({ section, words, sectionsList }) {
  const [editHeader, setEditHeader] = useState(false);

  let content = words.map((word, index) => (
    <CardWordList word={word} key={index} sectionsList={sectionsList} />
  ));

  return (
    <div className="flex flex-col gap-3">
      {editHeader ? (
        <SectionEditTitle section={section} setEdit={setEditHeader} />
      ) : (
        <SectionTitle section={section} setEdit={setEditHeader} />
      )}
      <SectionIntro section={section} />
      <div className="flex flex-col gap-3">{content}</div>
    </div>
  );
}
