import { ReactNode, useState } from "react";
import AdminSection from "./AdminSection";
import { useSelector } from "react-redux";
import { selectSectionSentences } from "../sentences/sentencesSlice";
import { selectSectionText } from "../textBlock/textBlockSlice";
import { selectSectionWords } from "../words/wordsSlice";

export default function AdminSectionContainer({
  section,
  children,
}: {
  section: ContentSection;
  children?: ReactNode;
}) {
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

  return (
    <div className="relative">
      <AdminSection
        section={section}
        sectionIntroduction={sectionIntroduction ?? []}
        sectionWords={sectionWords}
        sentences={sectionSentences}
      />
      {children}
    </div>
  );
}
