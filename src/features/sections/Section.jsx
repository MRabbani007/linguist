import React, { useState } from "react";
import SectionIntro from "./SectionIntro";
import SectionEditTitle from "./SectionEditTitle";
import SectionTitle from "./SectionTitle";
import CardWordList from "../words/CardWordList";
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

export default function Section({
  section = {},
  words = [],
  sectionsList = [],
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

  const [addIntro, setAddIntro] = useState(false);
  const [addDef, setAddDef] = useState(false);
  const [addList, setAddList] = useState(false);
  const [addTable, setAddTable] = useState(false);
  const [addWord, setAddWord] = useState(false);
  const [addSentence, setAddSentence] = useState(false);

  let content = words.map((word, index) => (
    <CardWord key={index} word={word} />
    // <CardWordList word={word} key={index} sectionsList={sectionsList} />
  ));

  const temp = expandSentences ? sentences : sentences.slice(0, 2);

  return (
    <div className="flex flex-col gap-3">
      <SectionTitle
        section={section}
        expand={expand}
        setExpand={setExpand}
        setEditTitle={setEditTitle}
        setEditLessonID={setEditLessonID}
        setAddIntro={setAddIntro}
        setAddDef={setAddDef}
        setAddTable={setAddTable}
        setAddList={setAddList}
        setAddWord={setAddWord}
        setAddSentence={setAddSentence}
      />

      <div
        className={
          (expand ? "visible" : "translate-y-4 opacity-0 invisible h-0") +
          " flex flex-col gap-3 duration-200"
        }
      >
        <SectionIntro section={section} add={addIntro} setAdd={setAddIntro} />

        {Array.isArray(definitions) && definitions.length !== 0 ? (
          <div className="flex flex-col gap-3">
            {definitions.map((definition) => {
              return (
                <Definition definition={definition} key={definition?.id} />
              );
            })}
          </div>
        ) : null}

        {Array.isArray(sectionLists) && sectionLists.length !== 0 ? (
          <div className="flex flex-col gap-3">
            {sectionLists.map((list) => {
              return <ListSection list={list} key={list?.id} />;
            })}
          </div>
        ) : null}

        {Array.isArray(tables) && tables.length !== 0 ? (
          <div className="flex flex-col gap-3">
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
        <div className="flex flex-row flex-wrap items-stretch gap-2">
          {content}
        </div>

        {Array.isArray(sentences) && sentences.length !== 0 ? (
          <div className="flex flex-col gap-3 p-2">
            <p className="underline italic bold text-xl">Examples: </p>
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
        <SectionEditTitle section={section} setEdit={setEditTitle} />
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
    </div>
  );
}
