import React, { useState } from "react";
import { useSelector } from "react-redux";
import { selectEditMode } from "../globals/globalsSlice";
import { CiEdit } from "react-icons/ci";
import FormSentenceEditContent from "./FormSentenceEditContent";
import { IoInformationCircleOutline } from "react-icons/io5";

const types = {
  Nouns: "n",
  Verbs: "v",
  Adjectives: "adj",
  Adverbs: "adv",
  Dialogues: "dialogue",
  Phrases: "phrase",
};

export default function Sentence({ sentence }) {
  const editMode = useSelector(selectEditMode);
  const [editContent, setEditContent] = useState(false);
  const [editDetails, setEditDetails] = useState(false);
  const [editLessonID, setEditLessonID] = useState(false);

  const color = !!sentence?.level
    ? sentence.level < 2
      ? "bg-sky-500"
      : sentence.level < 4
      ? "bg-green-500"
      : sentence.level < 7
      ? "bg-yellow-400"
      : sentence.level < 9
      ? "bg-orange-400"
      : "bg-red-500"
    : "bg-zinc-300";

  const type = types[sentence?.type] ?? "";

  return (
    <>
      <div className="w-full relative group flex items-stretch bg-zinc-100">
        <div className={"min-w-4 min-h-full shrink-0 " + color}></div>
        <div className="flex-1 p-4">
          <p>
            <span>{sentence?.group}</span>
          </p>
          {sentence?.baseWord || sentence?.baseWordTranslation ? (
            <p>
              {type !== "" ? (
                <span>
                  <i>{`(${type})`}</i>
                </span>
              ) : null}
              <span className="font-semibold">{sentence?.baseWord}</span>
              {sentence?.baseWordTranslation ? (
                <span>
                  <i>{"- " + sentence?.baseWordTranslation}</i>
                </span>
              ) : null}
            </p>
          ) : null}
          <p className="w-fit font-medium" title={sentence?.pronunce}>
            <span className="font-semibold text-zinc-800">
              {sentence?.text}
            </span>
            <span>{sentence?.caption}</span>
          </p>
          {sentence?.translation ? (
            <p>
              <span>
                <i>{sentence?.translation}</i>
              </span>
              <span>
                <i>{sentence?.tCaption}</i>
              </span>
            </p>
          ) : null}
          {editMode ? (
            <div className="absolute top-2 right-2 invisible group-hover:visible">
              <button onClick={() => setEditContent(true)} title="Edit">
                <CiEdit size={28} />
              </button>
              <button onClick={() => console.log(sentence)} title="Info">
                <IoInformationCircleOutline size={28} />
              </button>
            </div>
          ) : null}
        </div>
      </div>
      {editContent && (
        <FormSentenceEditContent sentence={sentence} setEdit={setEditContent} />
      )}
    </>
  );
}
