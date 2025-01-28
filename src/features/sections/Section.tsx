import { useState } from "react";
import Definition from "../definitions/Definition";
import ListSection from "../sectionList/ListSection";
import Sentence from "../sentences/Sentence";
import { Link } from "react-router-dom";
import CardWord from "../words/CardWord";
import CardConjTable from "../tables/CardConjTable";
import WordContainer from "../words/WordContainer";
import CardTextBlock from "../textBlock/CardTextBlock";

export default function Section({
  section = null,
  words = [],
  definitions = [],
  sectionLists = [],
  tables = [],
  sentences = [],
}: {
  section: ContentSection | null;
  words: Word[];
  definitions: Definition[];
  sectionLists: SectionList[];
  sentences: Sentence[];
  tables: (ConjTable & { tableWords: TableWord[] })[];
}) {
  const [expandSentences, setExpandSentences] = useState(true);

  let content = [...words]
    .sort((a, b) => (a?.sortIndex > b?.sortIndex ? 1 : -1))
    .map((word, index) => (
      <WordContainer word={word} key={index}>
        <CardWord word={word} />
      </WordContainer>
    ));

  const temp = expandSentences ? sentences : sentences.slice(0, 2);

  if (!section) return null;

  return (
    <section>
      <div className="flex items-stretch group relative">
        <p className="text-accent_foreground bg-accent shrink-0 flex items-center justify-center font-medium px-4 text-lg rounded-md">
          {(section?.sortIndex ? section?.sortIndex : 0).toLocaleString(
            "en-US",
            {
              minimumIntegerDigits: 2,
              useGrouping: false,
            }
          )}
        </p>
        <div className="flex flex-col flex-1 text-destructive_foreground">
          <div className="border-b-[1px] border-accent flex items-center gap-4">
            <h3 className="font-semibold text-xl md:text-2xl px-4 py-2 flex-1">
              {section?.title}
            </h3>
          </div>
          {section?.subtitle && (
            <p className=" px-4 py-1">
              <i className="">{section?.subtitle}</i>
            </p>
          )}
        </div>
      </div>

      <div className={" flex flex-col gap-4 duration-200"}>
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

        {Array.isArray(section?.textBlocks) &&
        section?.textBlocks.length !== 0 ? (
          <article className="flex flex-col gap-0 text-zinc-800">
            {section?.textBlocks.map((item, index) => {
              return <CardTextBlock key={index} textBlock={item} />;
            })}
          </article>
        ) : null}

        {section?.image && (
          <div className="mx-auto mb-4 lg:max-w-[50vw] p-4 bg-white rounded-lg shadow-md shadow-zinc-400 overflow-hidden">
            <img
              src={section.image}
              alt="section image"
              className="max-h-[300px]"
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
              return (
                <CardConjTable
                  key={table?.id}
                  table={table}
                  tableWords={table?.tableWords}
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
          <div className="flex flex-col gap-2">
            {/* <p className="py-2 px-4 text-xl bg-sky-600 text-white">Examples</p> */}
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
