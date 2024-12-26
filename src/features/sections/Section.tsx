import { useState } from "react";
import SectionTitle from "./SectionTitle";
import Definition from "../definitions/Definition";
import ListSection from "../sectionList/ListSection";
import Sentence from "../sentences/Sentence";
import { Link } from "react-router-dom";
import CardWord from "../words/CardWord";
import CardConjTable from "../tables/CardConjTable";

export default function Section({
  section = null,
  words = [],
  definitions = [],
  sectionLists = [],
  tables = [],
  tableWords = [],
  sentences = [],
}: {
  section: Section | null;
  words: Word[];
  definitions: Definition[];
  sectionLists: SectionList[];
  sentences: Sentence[];
  tables: ConjTable[];
  tableWords?: TableWord[];
}) {
  const [expandSentences, setExpandSentences] = useState(false);

  let content = words.map((word, index) => (
    <CardWord word={word} key={index} />
  ));

  const temp = expandSentences ? sentences : sentences.slice(0, 2);

  if (!section) return null;

  return (
    <section>
      <SectionTitle section={section} />
      <div
        className={
          // (expand ? "visible" : "translate-y-4 opacity-0 invisible h-0") +
          " flex flex-col gap-4 duration-200"
        }
      >
        {Array.isArray(section?.introduction) &&
        section.introduction.length !== 0 ? (
          <article className="flex flex-col gap-4">
            {section.introduction.map((intro, index) => {
              return (
                <p key={index} className="text-balance group relative">
                  {intro}
                </p>
              );
            })}
          </article>
        ) : null}

        {section?.image && (
          <div className="h-[70vh]">
            <img
              src={section.image}
              alt="section image"
              className="mx-auto w-full h-full object-contain"
            />
          </div>
        )}

        {Array.isArray(definitions) && definitions.length !== 0 ? (
          <div className="flex flex-col gap-4">
            {definitions.map((definition) => {
              return (
                <Definition definition={definition} key={definition?.id} />
              );
            })}
          </div>
        ) : null}

        {Array.isArray(sectionLists) && sectionLists.length !== 0 ? (
          <div className="flex flex-col gap-4">
            {sectionLists.map((list) => {
              return <ListSection list={list} key={list?.id} />;
            })}
          </div>
        ) : null}

        {Array.isArray(tables) && tables.length !== 0 && (
          <div className="flex flex-col gap-4">
            {tables.map((table) => {
              // const words = tableWords.filter(
              //   (word) => word.tableID === table.id
              // );
              return (
                <CardConjTable
                  key={table?.id}
                  table={table}
                  tableWords={table.tableWords}
                />
              );
            })}
          </div>
        )}

        {/* Words */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {content}
        </div>

        {Array.isArray(sentences) && sentences.length !== 0 ? (
          <div className="flex flex-col gap-4">
            <p className="py-2 px-4 text-xl bg-sky-600 text-white">Examples</p>
            {temp.map((sentence) => {
              return <Sentence sentence={sentence} key={sentence?.id} />;
            })}
            <div className="flex flex-wrap items-center justify-center gap-4">
              <button onClick={() => setExpandSentences((curr) => !curr)}>
                {expandSentences ? "Show Less" : "Show more"}
              </button>
              <Link
                to={`/sentences/${section?.lessonID}`}
                className="text-blue-500 font-medium"
              >
                Go to Sentences
              </Link>
            </div>
          </div>
        ) : null}
      </div>
    </section>
  );
}
