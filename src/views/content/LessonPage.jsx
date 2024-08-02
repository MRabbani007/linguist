import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import {
  selectDisplayChapter,
  selectDisplayBlock,
  selectEditMode,
} from "../../features/globals/globalsSlice";
// Imported Components
import BlockNavigator from "../../features/navigation/BlockNavigator";
// Imported Icons
import LessonIntro from "../../features/blocks/LessonIntro";
import LessonSections from "../../features/sections/LessonSections";
import LessonHeader from "../../features/blocks/LessonHeader";
import LessonCompleted from "../../features/blocks/LessonCompleted";
import ContentNavigator from "../../features/navigation/ContentNavigator";
import { selectCurrentUser } from "../../features/auth/authSlice";
import FormWordAdd from "../../features/words/FormWordAdd";

export default function LessonPage() {
  const displayChapter = useSelector(selectDisplayChapter);
  const displayBlock = useSelector(selectDisplayBlock);
  const editMode = useSelector(selectEditMode);

  const user = useSelector(selectCurrentUser);

  const [addLessonIntro, setAddLessonIntro] = useState(false);
  const [addSection, setAddSection] = useState(false);

  const navigate = useNavigate();

  const isMounted = useRef(null);

  useEffect(() => {
    if (isMounted.current) {
      if (!displayChapter) {
        navigate("/content/chapters");
      }
      if (!displayBlock) {
        navigate("/content/sections");
      }
    }
  }, []);

  isMounted.current = true;

  return (
    <main>
      <div className="w-full">
        <LessonHeader
          lesson={displayBlock}
          setAddLessonIntro={setAddLessonIntro}
          setAddSection={setAddSection}
        />
        <BlockNavigator />
      </div>
      <LessonIntro
        lesson={displayBlock}
        addLessonIntro={addLessonIntro}
        setAddLessonIntro={setAddLessonIntro}
      />
      <LessonSections
        lesson={displayBlock}
        addSection={addSection}
        setAddSection={setAddSection}
      />
      <div className="w-full">
        <BlockNavigator />
        <ContentNavigator />
      </div>

      {!!user ? <LessonCompleted /> : null}
    </main>
  );
}
