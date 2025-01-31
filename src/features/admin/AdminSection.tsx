import { useEffect, useState } from "react";
import CardWord from "../words/CardWord";
import Definition from "../definitions/Definition";
import ListSection from "../sectionList/ListSection";
import CardConjTable from "../tables/CardConjTable";
import Sentence from "../sentences/Sentence";
import { Link } from "react-router-dom";
import AdminContainerWord from "./AdminContainerWord";
import FormWordEdit from "../words/FormWordEdit";
import { useFetchAttributes } from "@/hooks/useFetchAttributes";
import FormWordMove from "../words/FormWordMove";
import CardTextBlock from "../textBlock/CardTextBlock";
import SectionIntroItem from "../sections/SectionIntroItem";
import AdminSentenceContainer from "./AdminSentenceContainer";
import FormSentenceEdit from "../sentences/FormSentenceEdit";
import FormSentenceMove from "../sentences/FormSentenceMove";
import { useSortSentencesMutation } from "../sentences/sentencesSlice";
import FormBulkMove from "../sentences/FormBulkMove";
import { BiSort, BiX } from "react-icons/bi";
import { toast } from "react-toastify";
import { AnimatePresence } from "framer-motion";

export default function AdminSection({
  section = null,
  sectionIntroduction,
  sectionWords,
  sentences: sectionSentences,
}: {
  section: ContentSection | null;
  sectionIntroduction: TextBlock[];
  sectionWords: Word[];
  sentences: Sentence[];
}) {
  const [sortSentences] = useSortSentencesMutation();
  const [attributes] = useFetchAttributes();

  const [expandSentences, setExpandSentences] = useState(true);

  const [showEditWord, setShowEditWord] = useState(false);
  const [showMoveWord, setShowMoveWord] = useState(false);
  const [editWord, setEditWord] = useState<Word | null>(null);

  const [showEditSentence, setShowEditSentence] = useState(false);
  const [showMoveSentence, setShowMoveSentence] = useState(false);
  const [editItem, setEditItem] = useState<Sentence | null>(null);

  const [bulkMove, setBulkMove] = useState(false);
  const [selectedSentences, setSelectedSentences] = useState<string[]>([]);

  const [showSortSentences, setShowSortSentences] = useState(false);
  const [sortedSentences, setSortedSentences] = useState(sectionSentences);

  const [dragItem, setDragItem] = useState<Sentence | null>(null);
  const [dragOverItem, setDragOverItem] = useState<Sentence | null>(null);

  const dragStart = (sentence: Sentence) => {
    setDragItem(sentence);
  };
  const dragEnter = (sentence: Sentence) => {
    setDragOverItem(sentence);
  };
  const dragEnd = () => {
    // Reset
    if (!dragItem || !dragOverItem) {
      setDragItem(null);
      setDragOverItem(null);
      return null;
    }

    const dragItemIndex = sortedSentences.findIndex(
      (item) => item.id === dragItem.id
    );
    const dragOverItemIndex = sortedSentences.findIndex(
      (item) => item.id === dragOverItem.id
    );

    if (dragItemIndex < 0 || dragOverItemIndex < 0) {
      return null;
    }

    const sortedItems = [...sortedSentences];
    sortedItems.splice(dragItemIndex, 1);
    sortedItems.splice(dragOverItemIndex, 0, dragItem);

    setSortedSentences(sortedItems);

    setDragItem(null);
    setDragOverItem(null);
  };

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

  const handleSort = async () => {
    const sentenceData = sortedSentences.map((item, sortIndex) => ({
      id: item.id,
      sortIndex,
    }));

    const response = await sortSentences({ sentences: sentenceData }).unwrap();

    if (response) {
      toast.success("Sentences updated");
      setShowSortSentences(false);
    } else {
      toast.error("Error saving sort");
    }
  };

  useEffect(() => {
    if (showSortSentences === false) {
      setSortedSentences(sectionSentences);
    }
  }, [showSortSentences]);

  let content = sectionWords // [...words]
    .sort((a, b) => (a.sortIndex > b.sortIndex ? 1 : -1))
    .map((word) => (
      <AdminContainerWord
        word={word}
        key={word.id}
        setMove={setShowMoveWord}
        setEdit={setShowEditWord}
        setEditItem={setEditWord}
      >
        <CardWord word={word} />
      </AdminContainerWord>
    ));

  const temp2 = showSortSentences ? sortedSentences : sectionSentences;
  const temp = expandSentences ? temp2 : temp2.slice(0, 2);

  if (!section) return null;

  return (
    <div key={section.id}>
      <section>
        {/* Section Title */}
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
        {/* Control buttons */}
        <div className="flex items-center gap-4">
          {showSortSentences ? (
            <div className="ml-auto rounded-md p-1 flex items-center gap-2 bg-zinc-50">
              <BiSort size={20} />
              <button
                onClick={handleSort}
                className="bg-green-100 py-1 px-2 flex items-center text-sm"
              >
                Save
              </button>
              <button
                onClick={() => setShowSortSentences(false)}
                title={"Sort Sentences"}
                className=" bg-zinc-100 rounded-md p-1"
              >
                <BiX size={20} />
              </button>
            </div>
          ) : (
            <button
              onClick={() => setShowSortSentences(true)}
              title={"Sort Sentences"}
              className=" ml-auto bg-zinc-100 rounded-md p-2"
            >
              <BiSort size={20} />
            </button>
          )}
          <div className="flex items-center bg-zinc-100 rounded-md p-2">
            <button onClick={() => setBulkMove(true)}>
              {selectedSentences?.length === 1
                ? `1 Sentence`
                : `${selectedSentences?.length} Sentences`}
            </button>
            {selectedSentences.length > 0 && (
              <button onClick={handleClear}>
                <BiX size={20} />
              </button>
            )}
          </div>
        </div>
        <div className={" flex flex-col gap-4 duration-200"}>
          {Array.isArray(section?.introduction) &&
          sectionIntroduction &&
          sectionIntroduction.length !== 0 ? (
            <article className="flex flex-col gap-0 text-zinc-800">
              {sectionIntroduction.map((item) => {
                return <CardTextBlock key={item.id} textBlock={item} />;
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

          {Array.isArray(section?.definitions) &&
          section?.definitions.length !== 0 ? (
            <div className="flex flex-col gap-4">
              {section?.definitions.map((definition) => {
                return (
                  <Definition definition={definition} key={definition?.id} />
                );
              })}
            </div>
          ) : null}

          {Array.isArray(section?.sectionLists) &&
          section?.sectionLists.length !== 0 ? (
            <div className="flex flex-col gap-4">
              {section?.sectionLists.map((list) => {
                return <ListSection list={list} key={list?.id} />;
              })}
            </div>
          ) : null}

          {Array.isArray(section?.tables) && section?.tables.length !== 0 && (
            <div className="flex flex-col gap-4">
              {section?.tables.map((table) => {
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
            <div
              className={(showSortSentences ? "" : "") + " flex flex-col gap-4"}
            >
              <AnimatePresence>
                {temp.map((sentence) => {
                  return (
                    <AdminSentenceContainer
                      key={sentence.id}
                      sentence={sentence}
                      sortIndex={sentence.sortIndex}
                      setEdit={setShowEditSentence}
                      setMove={setShowMoveSentence}
                      setEditItem={setEditItem}
                      section={section}
                      handleSelectSentence={handleSelectSentence}
                      selected={
                        selectedSentences.findIndex(
                          (id) => id === sentence.id
                        ) >= 0
                          ? true
                          : false
                      }
                      isDraggable={showSortSentences}
                      onDragStart={dragStart}
                      onDragEnter={dragEnter}
                      onDragEnd={dragEnd}
                    >
                      <Sentence sentence={sentence} key={sentence?.id} />
                    </AdminSentenceContainer>
                  );
                })}
              </AnimatePresence>
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
          sections={[]} // TODO: provide lesson sections
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
