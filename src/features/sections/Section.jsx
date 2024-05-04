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

export default function Section({
  section = {},
  words = [],
  sectionsList = [],
  definitions = [],
  tables = [],
  tableWords = [],
}) {
  const editMode = useSelector(selectEditMode);

  const [editTitle, setEditTitle] = useState(false);

  const [addIntro, setAddIntro] = useState(false);
  const [addDef, setAddDef] = useState(false);
  const [addTable, setAddTable] = useState(false);

  let content = words.map((word, index) => (
    <CardWordList word={word} key={index} sectionsList={sectionsList} />
  ));

  return (
    <div className="flex flex-col gap-3">
      {editTitle ? (
        <SectionEditTitle section={section} setEdit={setEditTitle} />
      ) : (
        <SectionTitle
          section={section}
          setEditTitle={setEditTitle}
          setAddIntro={setAddIntro}
          setAddDef={setAddDef}
          setAddTable={setAddTable}
        />
      )}
      <SectionIntro section={section} add={addIntro} setAdd={setAddIntro} />
      <div className="flex flex-col gap-3">
        {definitions.map((definition) => {
          return <Definition definition={definition} key={definition?.id} />;
        })}
        {editMode && addDef ? (
          <DefinitionAdd
            lessonID={section?.lessonID}
            sectionID={section?.id}
            setAdd={setAddDef}
          />
        ) : null}
      </div>
      <div className="flex flex-col gap-3">
        {tables.map((table) => {
          const words = tableWords.filter((word) => word.tableID === table.id);
          return <TableCard table={table} key={table?.id} tableWords={words} />;
        })}
        {editMode && addTable ? (
          <TableAdd
            lessonID={section?.lessonID}
            sectionID={section?.id}
            setAdd={setAddTable}
          />
        ) : null}
      </div>
      <div className="flex flex-col gap-3">{content}</div>
    </div>
  );
}
