import { useState } from "react";
import { BsChatLeftText, BsTextParagraph } from "react-icons/bs";
import FormSectionEdit from "../sections/FormSectionEdit";
import { RxTextAlignLeft } from "react-icons/rx";
import { CiEdit, CiImageOn, CiViewTable } from "react-icons/ci";
import { PiListBullets } from "react-icons/pi";
import { VscWholeWord } from "react-icons/vsc";
import { IoCopyOutline } from "react-icons/io5";
import FormWordAdd from "../words/FormWordAdd";
import copy from "copy-to-clipboard";
import { toast } from "react-toastify";
import AdminDropDown from "./AdminDropDown";
import AdminSection from "./AdminSection";
import { MdArrowOutward } from "react-icons/md";
import FormSectionMove from "../sections/FormSectionMove";

export default function AdminSectionContainer({
  section: item,
}: {
  section: any;
}) {
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
    const isCopy = copy(item?.id);
    if (isCopy) {
      toast.success("Section ID Copied");
    }
  };

  const items = [
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
    <div className="relative">
      <AdminDropDown items={items} />
      <AdminSection
        key={item.id}
        definitions={item.definitions}
        words={item.words}
        section={item}
        sectionLists={item.sectionLists}
        sentences={item.sentences}
        tables={item.tables}
        tableWords={item?.tableWords}
      />
      {editHeader && <FormSectionEdit section={item} setEdit={setEditHeader} />}
      {addWord && (
        <FormWordAdd
          setAdd={setAddWord}
          sectionID={item.id}
          lessonID={item.lessonID}
        />
      )}
      {moveSection && (
        <FormSectionMove setEdit={setMoveSection} section={item} />
      )}
    </div>
  );
}
