import React, { useState } from "react";
import SectionIntro from "./SectionIntro";
import SectionEdit from "./SectionEdit";
import SectionTitle from "./SectionTitle";
import DefinitionAdd from "../definitions/DefinitionAdd";
import Definition from "../definitions/Definition";
import { useSelector } from "react-redux";
import { selectEditMode } from "../globals/globalsSlice";
import TableAdd from "../tables/TableAdd";
import TableCard from "../tables/TableCard";
import ListSection from "../sectionList/ListSection";
import ListAdd from "../sectionList/ListAdd";
import SectionMoveToLesson from "./SectionMoveToLesson";
import Sentence from "../sentences/Sentence";
import FormSentenceAdd from "../sentences/FormSentenceAdd";
import { Link } from "react-router-dom";
import FormWordAdd from "../words/FormWordAdd";
import CardWord from "../words/CardWord";
import FormSectionImage from "./FormSectionImage";

export default function Section({
  section = {},
  words = [],
  definitions = [],
  sectionLists = [],
  tables = [],
  tableWords = [],
  sentences = [],
}) {
  const editMode = useSelector(selectEditMode);

  const [expand, setExpand] = useState(true);

  const [editTitle, setEditTitle] = useState(false);
  const [editLessonID, setEditLessonID] = useState(false);
  const [expandSentences, setExpandSentences] = useState(false);
  const [editImage, setEditImage] = useState(false);

  const [addIntro, setAddIntro] = useState(false);
  const [addDef, setAddDef] = useState(false);
  const [addList, setAddList] = useState(false);
  const [addTable, setAddTable] = useState(false);
  const [addWord, setAddWord] = useState(false);
  const [addSentence, setAddSentence] = useState(false);

  const stateObj = {
    setExpand,
    setEditTitle,
    setEditLessonID,
    setExpandSentences,
    setEditImage,
    setAddIntro,
    setAddDef,
    setAddList,
    setAddTable,
    setAddWord,
    setAddSentence,
  };

  let content = words.map((word, index) => (
    <CardWord word={word} key={index} index={index} />
    // <CardWord key={index} word={word} />
    // <CardWordList word={word} key={index} sectionsList={sectionsList} />
  ));

  const temp = expandSentences ? sentences : sentences.slice(0, 2);

  return (
    <section>
      <SectionTitle section={section} expand={expand} {...stateObj} />
      <div
        className={
          (expand ? "visible" : "translate-y-4 opacity-0 invisible h-0") +
          " flex flex-col gap-3 duration-200"
        }
      >
        <SectionIntro section={section} add={addIntro} setAdd={setAddIntro} />

        {section?.image && (
          <div className="max-w-full h-[100vh] overflow-hidden">
            <img
              src={section.image}
              alt="section image"
              className="mx-auto h-full object-fill"
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

        {Array.isArray(tables) && tables.length !== 0 ? (
          <div className="flex flex-col gap-4">
            {/* Tables */}
            {tables.map((table) => {
              const words = tableWords.filter(
                (word) => word.tableID === table.id
              );
              return (
                <TableCard table={table} key={table?.id} tableWords={words} />
              );
            })}
          </div>
        ) : null}

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

      {editTitle ? (
        <SectionEdit section={section} setEdit={setEditTitle} />
      ) : null}

      {editLessonID ? (
        <SectionMoveToLesson
          section={section}
          setViewMoveLesson={setEditLessonID}
        />
      ) : null}

      {editMode && addDef ? (
        <DefinitionAdd
          lessonID={section?.lessonID}
          sectionID={section?.id}
          setAdd={setAddDef}
        />
      ) : null}

      {editMode && addTable ? (
        <TableAdd
          lessonID={section?.lessonID}
          sectionID={section?.id}
          setAdd={setAddTable}
        />
      ) : null}

      {editMode && addList ? (
        <ListAdd
          lessonID={section?.lessonID}
          sectionID={section?.id}
          setAdd={setAddList}
        />
      ) : null}

      {editMode && addWord ? (
        <FormWordAdd sectionID={section?.id} setAdd={setAddWord} />
      ) : null}

      {editMode && addSentence ? (
        <FormSentenceAdd section={section} setAdd={setAddSentence} />
      ) : null}

      {editMode && editImage ? (
        <FormSectionImage
          section={section}
          type={"edit"}
          setShowForm={setEditImage}
        />
      ) : null}
    </section>
  );
}
