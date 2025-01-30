import { useState } from "react";
import CardWord from "../words/CardWord";
import Definition from "../definitions/Definition";
import ListSection from "../sectionList/ListSection";
import CardConjTable from "../tables/CardConjTable";
import Sentence from "../sentences/Sentence";
import { Link } from "react-router-dom";
import AdminContainerWord from "./AdminContainerWord";
import FormWordEdit from "../words/FormWordEdit";
import { useFetchAttributes } from "@/hooks/useFetchAttributes";
import { useSelector } from "react-redux";
import { selectLessonSections } from "../globals/globalsApiSlice";
import { selectSectionWords } from "../words/wordsSlice";
import FormWordMove from "../words/FormWordMove";
import { selectSectionText } from "../textBlock/textBlockSlice";
import CardTextBlock from "../textBlock/CardTextBlock";
import SectionIntroItem from "../sections/SectionIntroItem";
import AdminSentenceContainer from "./AdminSentenceContainer";
import FormSentenceEdit from "../sentences/FormSentenceEdit";
import FormSentenceMove from "../sentences/FormSentenceMove";
import { selectSectionSentences } from "../sentences/sentencesSlice";
import FormBulkMove from "../sentences/FormBulkMove";
import { BiX } from "react-icons/bi";

export default function AdminSection({
  section = null,
  definitions = [],
  sectionLists = [],
  tables = [],
}: {
  section: Section | null;
  definitions: Definition[];
  sectionLists: SectionList[];
  tables: (ConjTable & { tableWords: TableWord[] })[];
}) {
  const sections = useSelector(selectLessonSections(section?.lessonID ?? ""));
  const [attributes] = useFetchAttributes();

  const sectionWords =
    useSelector(
      selectSectionWords(section?.lessonID ?? "", section?.id ?? "")
    ) ?? [];

  const sectionSentences = useSelector(
    selectSectionSentences(section?.lessonID ?? "", 300, section?.id ?? "")
  );

  const sectionIntroduction = useSelector(
    selectSectionText(section?.id ?? "", section?.lessonID ?? "")
  );

  const [expandSentences, setExpandSentences] = useState(true);

  const [showEditWord, setShowEditWord] = useState(false);
  const [showMoveWord, setShowMoveWord] = useState(false);
  const [editWord, setEditWord] = useState<Word | null>(null);

  const [showEditSentence, setShowEditSentence] = useState(false);
  const [showMoveSentence, setShowMoveSentence] = useState(false);
  const [editItem, setEditItem] = useState<Sentence | null>(null);

  const [bulkMove, setBulkMove] = useState(false);
  const [selectedSentences, setSelectedSentences] = useState<string[]>([]);

  const handleSelectSentence = (id: string) => {
    const index = selectedSentences.findIndex((item) => item === id);
    if (index >= 0) {
      const temp = [...selectedSentences];
      temp.splice(index, 1);
      setSelectedSentences(temp);
    } else {
      setSelectedSentences((curr) => [...curr, id]);
    }
  };

  const handleClear = () => {
    if (confirm("Clear selected sentences?")) {
      setSelectedSentences([]);
    }
  };

  let content = sectionWords // [...words]
    .sort((a, b) => (a.sortIndex > b.sortIndex ? 1 : -1))
    .map((word, index) => (
      <AdminContainerWord
        word={word}
        key={index}
        setMove={setShowMoveWord}
        setEdit={setShowEditWord}
        setEditItem={setEditWord}
      >
        <CardWord word={word} />
      </AdminContainerWord>
    ));

  const temp = expandSentences
    ? sectionSentences
    : sectionSentences.slice(0, 2);

  if (!section) return null;

  return (
    <div key={section.id}>
      <section>
        <div className="flex items-stretch group relative">
          <p className="text-accent_foreground bg-accent shrink-0 flex items-center justify-center font-medium px-4 text-lg">
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
        <div className="flex items-center justify-end bg-zinc-100 rounded-md p-2 ml-auto">
          <button onClick={() => setBulkMove(true)}>
            {selectedSentences?.length === 1
              ? `1 Sentence`
              : `${selectedSentences?.length} Sentences`}
          </button>
          <button onClick={handleClear}>
            <BiX size={20} />
          </button>
        </div>
        <div className={" flex flex-col gap-4 duration-200"}>
          {Array.isArray(section?.introduction) &&
          sectionIntroduction &&
          sectionIntroduction.length !== 0 ? (
            <article className="flex flex-col gap-0 text-zinc-800">
              {sectionIntroduction.map((item, index) => {
                return <CardTextBlock key={index} textBlock={item} />;
              })}
            </article>
          ) : null}

          {Array.isArray(section?.introduction) &&
          section.introduction.length !== 0 ? (
            <article className="flex flex-col gap-4">
              {section.introduction.map((intro, index) => {
                return (
                  <SectionIntroItem
                    sectionID={section.id}
                    introItem={intro}
                    index={index}
                    key={index}
                  />
                );
              })}
            </article>
          ) : null}

          {section?.image && (
            <div className="mx-auto lg:max-w-[50vw] overflow-hidden">
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

          {Array.isArray(sectionSentences) && sectionSentences.length !== 0 ? (
            <div className="flex flex-col gap-4">
              {/* <p className="py-2 px-4 text-xl bg-sky-600 text-white">
                Examples
              </p> */}
              {temp.map((sentence) => {
                return (
                  <AdminSentenceContainer
                    sentence={sentence}
                    setEdit={setShowEditSentence}
                    setMove={setShowMoveSentence}
                    setEditItem={setEditItem}
                    section={section}
                    handleSelectSentence={handleSelectSentence}
                    selected={
                      selectedSentences.findIndex((id) => id === sentence.id) >=
                      0
                        ? true
                        : false
                    }
                  >
                    <Sentence sentence={sentence} key={sentence?.id} />
                  </AdminSentenceContainer>
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
            </div>
          ) : null}
        </div>
      </section>
      {showEditWord && editWord && (
        <FormWordEdit
          setViewEdit={setShowEditWord}
          word={editWord}
          sections={sections ?? []}
          attributes={attributes as WordAttribute[]}
        />
      )}

      {showMoveWord && editWord && (
        <FormWordMove word={editWord} setEdit={setShowMoveWord} />
      )}

      {showEditSentence && editItem && (
        <FormSentenceEdit
          sentence={editItem}
          setEdit={setShowEditSentence}
          words={sectionWords}
        />
      )}
      {showMoveSentence && editItem && (
        <FormSentenceMove sentence={editItem} setEdit={setShowMoveSentence} />
      )}
      {bulkMove && (
        <FormBulkMove
          sentences={selectedSentences}
          setEdit={setBulkMove}
          setSelected={setSelectedSentences}
        />
      )}
    </div>
  );
}
