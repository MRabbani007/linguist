import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import {
  selectDisplayChapter,
  selectDisplayBlock,
  selectDisplayMode,
  selectEditMode,
} from "../features/globals/globalsSlice";
import { useGetWordsQuery } from "../features/words/wordsSlice";
// Imported Components
import CardTableHeader from "../features/words/CardTableHeader";
import CardWord from "../features/words/CardWord";
import CardWordEdit from "../features/words/CardWordEdit";
import CardWordTable from "../features/words/CardWordTable";
import CardWordAdd from "../features/words/CardWordAdd";
import CardWordEditDetails from "../features/words/CardWordEditDetails";
import CardBlockEditDetails from "../features/blocks/CardBlockEditDetails";
import CardBlockEditContent from "../features/blocks/CardBlockEditContent";
import CardBlockEditHeader from "../features/blocks/CardBlockEditHeader";
import BlockNavigator from "../features/blocks/BlockNavigator";
import CardWordList from "../features/words/CardWordList";
// Imported Icons
import { CiEdit } from "react-icons/ci";
import SectionHeader from "../features/blocks/SectionHeader";
import SectionHeaderEdit from "../features/blocks/SectionHeaderEdit";
import SectionDetails from "../features/blocks/SectionDetails";
import { useGetAllBlocksQuery } from "../features/blocks/blockSlice";
import LessonIntro from "../features/blocks/LessonIntro";
import LessonSections from "../features/sections/LessonSections";

export default function LessonPage() {
  const displayChapter = useSelector(selectDisplayChapter);
  const displayBlock = useSelector(selectDisplayBlock);
  const editMode = useSelector(selectEditMode);

  const [editSectionHeader, setEditSectionHeader] = useState(false);
  const [editBlockTab, setEditBlockTab] = useState("");

  const navigate = useNavigate();

  const isMounted = useRef(null);

  useEffect(() => {
    if (isMounted.current) {
      if (!displayChapter) {
        navigate("/chapters");
      }
      if (!displayBlock) {
        navigate("/sections");
      }
    }
  }, []);

  isMounted.current = true;

  const toggleEdit = (tab = "") => {
    setEditBlockTab(tab);
  };

  return (
    <div className="flex flex-col gap-2 w-full">
      <BlockNavigator>
        {editSectionHeader ? (
          <SectionHeaderEdit
            section={displayBlock}
            setEditSectionHeader={setEditSectionHeader}
          />
        ) : (
          <SectionHeader
            section={displayBlock}
            setEditSectionHeader={setEditSectionHeader}
          />
        )}
      </BlockNavigator>

      <div
        className={
          editMode
            ? "duration-200 translate-y-0"
            : "invisible translate-y-2 h-0"
        }
      >
        <div className="flex items-center justify-center gap-3 my-3">
          <button className="btn btn-red" onClick={() => toggleEdit("details")}>
            Details
          </button>
          <button className="btn btn-red" onClick={() => toggleEdit("content")}>
            Content
          </button>
        </div>
        <div>
          <SectionDetails
            block={displayBlock}
            editBlockTab={editBlockTab}
            toggleEdit={toggleEdit}
          />
          <CardBlockEditContent
            block={displayBlock}
            editBlockTab={editBlockTab}
            toggleEdit={toggleEdit}
          />
        </div>
      </div>

      <LessonIntro lesson={displayBlock} />

      <article>
        {displayBlock?.detail ? <p>{displayBlock?.detail}</p> : null}
        {displayBlock?.text ? <p>{displayBlock?.text}</p> : null}
        {displayBlock?.notes ? <p>{displayBlock?.notes}</p> : null}
      </article>

      <LessonSections />

      {editMode && (
        <div className="w-fit mx-auto">
          <CardWordAdd />
        </div>
      )}

      {displayBlock?.caption ? (
        <div className="">{displayBlock?.caption}</div>
      ) : null}
      {/* footer */}

      <BlockNavigator />
    </div>
  );
}
