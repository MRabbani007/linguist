import { useState } from "react";
import Definition from "../definitions/Definition";
import ListSection from "../sectionList/ListSection";
import Sentence from "../sentences/Sentence";
import { Link } from "react-router-dom";
import CardWord from "../words/CardWord";
import CardConjTable from "../tables/CardConjTable";
import WordContainer from "../words/WordContainer";
import CardTextBlock from "../textBlock/CardTextBlock";
import { motion } from "framer-motion";
import FormDisplaySentence from "../sentences/FormDisplaySentence";
import FormDisplayWord from "../sentences/FormDisplayWord";

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
  const [showWords, setShowWords] = useState(false);
  const [showSentences, setShowSentences] = useState(false);

  const [dispalayIndex, setDisplayIndex] = useState(-1);

  if (!section) return null;

  let content = [...words]
    // .sort((a, b) => (a?.sortIndex > b?.sortIndex ? 1 : -1))
    .map((word, index) => (
      <WordContainer word={word} key={index}>
        <div
          onClick={() => {
            setShowWords(true);
            setDisplayIndex(index);
          }}
          className="cursor-pointer bg-red-600/20 flex items-stretch h-full"
        >
          <CardWord word={word} />
        </div>
      </WordContainer>
    ));

  const temp = expandSentences ? sentences : sentences.slice(0, 2);

  // const hasWords = Array.isArray(words) && words.length !== 0;
  // const hasSentences = Array.isArray(sentences) && sentences.length !== 0;

  return (
    <motion.section
      variants={{
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0 },
      }}
      transition={{ type: "spring", stiffness: 100, damping: 12 }}
      className="bg-white rounded-lg p-4 "
    >
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
        <div className="flex flex-col flex-1 text-destructive_foreground p-2">
          <h3 className="font-semibold text-xl md:text-2xl flex-1">
            {section?.title}
          </h3>
          {section?.subtitle && <i className="">{section?.subtitle}</i>}
        </div>
        {/* <div className="flex items-center gap-2">
          {hasWords && (
            <button
              onClick={() => setShowWords((curr) => !curr)}
              className="py-1 px-3 font-medium rounded-md shadow-sm shadow-zinc-400 hover:shadow-md hover:shadow-zinc-400 duration-200 bg-red-100"
            >
              W
            </button>
          )}
          {hasSentences && (
            <button
              onClick={() => setShowSentences((curr) => !curr)}
              className="py-1 px-3 font-medium rounded-md shadow-sm shadow-zinc-400 hover:shadow-md hover:shadow-zinc-400 duration-200 bg-red-100"
            >
              S
            </button>
          )}
        </div> */}
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
        <motion.div
          initial="hidden"
          whileInView="visible"
          transition={{ staggerChildren: 0.1, delay: 0.1 }}
          viewport={{ once: true, amount: 0.1 }} // Triggers when 20% is in view
          className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4"
        >
          {content}
        </motion.div>

        {Array.isArray(sentences) && sentences.length !== 0 && (
          <motion.div
            initial="hidden"
            whileInView="visible"
            transition={{ staggerChildren: 0.1, delay: 0.1 }}
            viewport={{ once: true, amount: 0.01 }}
            className="flex flex-col gap-2"
          >
            {/* <p className="py-2 px-4 text-xl bg-sky-600 text-white">Examples</p> */}
            {temp.map((sentence, idx) => {
              return (
                <div
                  onClick={() => {
                    setShowSentences(true);
                    setDisplayIndex(idx);
                  }}
                  className="cursor-pointer"
                >
                  <Sentence sentence={sentence} key={sentence?.id} />
                </div>
              );
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
          </motion.div>
        )}
        <FormDisplaySentence
          sentences={sentences}
          title={section?.title}
          showForm={showSentences}
          setShowForm={setShowSentences}
          initialIndex={dispalayIndex}
        />
        <FormDisplayWord
          words={words}
          title={section?.title}
          showForm={showWords}
          setShowForm={setShowWords}
          initialIndex={dispalayIndex}
        />
      </div>
    </motion.section>
  );
}
