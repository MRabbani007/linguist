import { useEffect, useState } from "react";
import Definition from "../definitions/Definition";
import ListSection from "../sectionList/ListSection";
import CardConjTable from "../tables/CardConjTable";
import Sentence from "../sentences/Sentence";
import { Link } from "react-router-dom";
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
import AdminWordGrid from "../words/AdminWordGrid";
import AdminWordRow from "../words/AdminWordRow";
import { useSortWordsMutation } from "../words/wordsSlice";
import { MdArrowOutward } from "react-icons/md";
import FormSectionMove from "../sections/FormSectionMove";
import FormAddTextBlock from "../textBlock/FormAddTextBlock";
import FormDefinitionAdd from "../definitions/FormDefinitionAdd";
import FormSentenceAdd from "../sentences/FormSentenceAdd";
import { BsChatLeftText, BsTextParagraph } from "react-icons/bs";
import FormSectionEdit from "../sections/FormSectionEdit";
import { RxTextAlignLeft } from "react-icons/rx";
import { CiEdit, CiImageOn, CiViewTable } from "react-icons/ci";
import { PiListBullets } from "react-icons/pi";
import { VscWholeWord } from "react-icons/vsc";
import { IoAddOutline, IoCopyOutline } from "react-icons/io5";
import FormWordAdd from "../words/FormWordAdd";
import copy from "copy-to-clipboard";
import AdminDropDown from "./AdminDropDown";
import { selectSectionSentences } from "../sentences/sentencesSlice";
import { selectSectionText } from "../textBlock/textBlockSlice";
import { selectSectionWords } from "../words/wordsSlice";
import { useSelector } from "react-redux";

export default function AdminSection({
  section = null,
}: // sectionIntroduction,
// sectionWords,
// sentences: sectionSentences,
{
  section: ContentSection | null;
  // sectionIntroduction: TextBlock[];
  // sectionWords: Word[];
  // sentences: Sentence[];
}) {
  if (!section) return null;

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

  const [sortSentences] = useSortSentencesMutation();
  const [sortWords] = useSortWordsMutation();
  const [attributes] = useFetchAttributes();

  const [expandSentences, setExpandSentences] = useState(true);

  const [editHeader, setEditHeader] = useState(false);
  const [editImage, setEditImage] = useState(false);
  const [addIntro, setAddIntro] = useState(false);
  const [addDef, setAddDef] = useState(false);
  const [addTable, setAddTable] = useState(false);
  const [addList, setAddList] = useState(false);
  const [addWord, setAddWord] = useState(false);
  const [addSentence, setAddSentence] = useState(false);
  const [moveSection, setMoveSection] = useState(false);

  const copyIDtoClipboard = () => {
    const isCopy = copy(section?.id);
    if (isCopy) {
      toast.success("Section ID Copied");
    }
  };

  const [showEditWord, setShowEditWord] = useState(false);
  const [showMoveWord, setShowMoveWord] = useState(false);
  const [editWord, setEditWord] = useState<Word | null>(null);

  const [showEditSentence, setShowEditSentence] = useState(false);
  const [showMoveSentence, setShowMoveSentence] = useState(false);
  const [editItem, setEditItem] = useState<Sentence | null>(null);

  const [bulkMove, setBulkMove] = useState(false);
  const [selectedSentences, setSelectedSentences] = useState<string[]>([]);

  const [showSortWords, setShowSortWords] = useState(false);
  const [sortedWords, setSortedWords] = useState(() =>
    [...sectionWords].sort((a, b) => (a.sortIndex > b.sortIndex ? 1 : -1))
  );

  const [showSortSentences, setShowSortSentences] = useState(false);
  const [sortedSentences, setSortedSentences] = useState(sectionSentences);

  const [dragItem, setDragItem] = useState<Sentence | null>(null);
  const [dragOverItem, setDragOverItem] = useState<Sentence | null>(null);

  const [dragItemWord, setDragItemWord] = useState<Word | null>(null);
  const [dragOverItemWord, setDragOverItemWord] = useState<Word | null>(null);

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

  const handleDrag = (stage: "start" | "enter" | "end", item: Word | null) => {
    if (stage === "start" && item) {
      setDragItemWord(item);
      return null;
    }

    if (stage === "enter" && item) {
      setDragOverItemWord(item);
      return null;
    }

    if (stage === "end") {
      // Reset
      if (!dragItemWord || !dragOverItemWord) {
        setDragItemWord(null);
        setDragOverItemWord(null);
        return null;
      }

      const dragItemIndex = sortedWords.findIndex(
        (item) => item.id === dragItemWord?.id
      );
      const dragOverItemIndex = sortedWords.findIndex(
        (item) => item.id === dragOverItemWord?.id
      );

      if (dragItemIndex < 0 || dragOverItemIndex < 0) {
        return null;
      }

      const sortedItems = [...sortedWords];
      sortedItems.splice(dragItemIndex, 1);
      sortedItems.splice(dragOverItemIndex, 0, dragItemWord);

      setSortedWords(sortedItems);

      setDragItemWord(null);
      setDragOverItemWord(null);
    }
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

  async function handleSort() {
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
  }

  async function handleSortWords() {
    const wordsData = sortedWords.map((item, sortIndex) => ({
      id: item.id,
      sortIndex: sortIndex + 1,
    }));

    const response = await sortWords({ words: wordsData }).unwrap();

    if (response) {
      toast.success("Words updated");
      setShowSortWords(false);
    } else {
      toast.error("Error saving sort");
    }
  }

  useEffect(() => {
    if (showSortSentences === false) {
      setSortedSentences(
        [...sectionSentences].sort((a, b) =>
          a.sortIndex > b.sortIndex ? 1 : -1
        )
      );
    }
    if (showSortWords === false) {
      setSortedWords(
        [...sectionWords].sort((a, b) => (a.sortIndex > b.sortIndex ? 1 : -1))
      );
    }
  }, [showSortSentences, showSortWords]);

  const temp2 = showSortSentences ? sortedSentences : sectionSentences;
  const temp = expandSentences ? temp2 : temp2.slice(0, 2);

  const displayWords = showSortWords
    ? sortedWords
    : [...sectionWords].sort((a, b) => (a.sortIndex > b.sortIndex ? 1 : -1));

  const addItems = [
    {
      type: "separator",
      label: "Add...",
      title: "",
      icon: null,
      onClick: () => {},
    },
    {
      type: "button",
      label: "Introduction",
      title: "Add Introduction",
      icon: <RxTextAlignLeft size={20} />,
      onClick: () => setAddIntro(true),
    },
    {
      type: "button",
      label: "Definition",
      title: "Add Definition",
      icon: <BsChatLeftText size={20} />,
      onClick: () => setAddDef(true),
    },
    {
      type: "button",
      label: "Table",
      title: "Add Table",
      icon: <CiViewTable size={20} />,
      onClick: () => setAddTable(true),
    },
    {
      type: "button",
      label: "List",
      title: "Add List",
      icon: <PiListBullets size={20} />,
      onClick: () => setAddList(true),
    },
    {
      type: "button",
      label: "Word",
      title: "Add Word",
      icon: <VscWholeWord size={20} />,
      onClick: () => setAddWord(true),
    },
    {
      type: "button",
      label: "Sentence",
      title: "Add Sentence",
      icon: <BsTextParagraph size={20} />,
      onClick: () => setAddSentence(true),
    },
  ];

  const editItems = [
    {
      type: "separator",
      label: "Edit...",
      title: "",
      icon: null,
      onClick: () => {},
    },
    {
      type: "button",
      label: "Section",
      title: "Edit Section",
      icon: <CiEdit size={20} />,
      onClick: () => setEditHeader(true),
    },
    {
      type: "button",
      label: "Image",
      title: "Edit Image",
      icon: <CiImageOn size={20} />,
      onClick: () => setEditImage(true),
    },
    {
      type: "button",
      label: "Move",
      title: "Move Section",
      icon: <MdArrowOutward size={20} />,
      onClick: () => setMoveSection(true),
    },
    {
      type: "button",
      label: "Copy ID",
      title: "Copy Section ID",
      icon: <IoCopyOutline size={20} />,
      onClick: copyIDtoClipboard,
    },
  ];

  return (
    <div key={section.id}>
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
          <div className="flex flex-col flex-1 text-destructive_foreground p-2">
            <div className="flex items-center gap-2 border-b-[1px] border-accent">
              <h3 className="font-semibold text-xl md:text-2xl flex-1 mr-auto">
                {section?.title}
              </h3>
              <AdminDropDown
                items={addItems}
                icon={<IoAddOutline size={25} />}
              />
              <AdminDropDown items={editItems} icon={<CiEdit size={25} />} />
            </div>
            {section?.subtitle && <p className="italic">{section?.subtitle}</p>}
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

          {/* Words Content */}
          {showSortWords ? (
            <div className="ml-auto rounded-md p-1 flex items-center gap-2 bg-zinc-50">
              <BiSort size={20} />
              <button
                onClick={handleSortWords}
                className="bg-green-100 py-1 px-2 flex items-center text-sm"
              >
                Save
              </button>
              <button
                onClick={() => setShowSortWords(false)}
                title={"Cancel Sort Words"}
                className=" bg-zinc-100 rounded-md p-1"
              >
                <BiX size={20} />
              </button>
            </div>
          ) : (
            sectionWords.length !== 0 && (
              <button
                onClick={() => setShowSortWords(true)}
                title={"Sort Words"}
                className=" ml-auto bg-zinc-100 rounded-md p-2"
              >
                <BiSort size={20} />
              </button>
            )
          )}

          <div
            className={
              (showSortWords || section?.display === "table"
                ? "grid-cols-1 "
                : " grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4  ") +
              " grid"
            }
          >
            {displayWords.map((word) =>
              showSortWords || section?.display === "table" ? (
                <AdminWordRow
                  word={word}
                  key={word.id}
                  index={word.sortIndex}
                  setMove={setShowMoveWord}
                  setEdit={setShowEditWord}
                  setEditItem={setEditWord}
                  isDraggable={showSortWords}
                  handleDrag={handleDrag}
                />
              ) : (
                <AdminWordGrid
                  word={word}
                  key={word.id}
                  setMove={setShowMoveWord}
                  setEdit={setShowEditWord}
                  setEditItem={setEditWord}
                />
              )
            )}
          </div>

          {Array.isArray(sectionSentences) && sectionSentences.length !== 0 ? (
            <div
              className={(showSortSentences ? "" : "") + " flex flex-col gap-4"}
            >
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
                {selectedSentences.length > 0 && (
                  <div className="flex items-center bg-zinc-100 rounded-md p-2">
                    <button onClick={() => setBulkMove(true)}>
                      {selectedSentences?.length === 1
                        ? `1 Sentence`
                        : `${selectedSentences?.length} Sentences`}
                    </button>

                    <button onClick={handleClear}>
                      <BiX size={20} />
                    </button>
                  </div>
                )}
              </div>
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

      {editHeader && (
        <FormSectionEdit section={section} setEdit={setEditHeader} />
      )}
      {addWord && (
        <FormWordAdd
          setAdd={setAddWord}
          sectionID={section.id}
          lessonID={section.lessonID}
        />
      )}
      {moveSection && (
        <FormSectionMove setEdit={setMoveSection} section={section} />
      )}
      {addIntro && (
        <FormAddTextBlock
          setAdd={setAddIntro}
          lessonID={section.lessonID}
          sectionID={section.id}
          scope="introduction"
        />
      )}
      {addDef && (
        <FormDefinitionAdd
          setAdd={setAddDef}
          lessonID={section.lessonID}
          sectionID={section.id}
        />
      )}
      {addSentence && (
        <FormSentenceAdd
          section={section}
          setAdd={setAddSentence}
          words={section.words}
        />
      )}
      {editImage && null}
      {addTable && null}
      {addList && null}
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
