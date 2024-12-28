import { useEffect, useRef, useState } from "react";
import Section from "../sections/Section";
import { BsChatLeftText, BsTextParagraph, BsThreeDots } from "react-icons/bs";
import FormSectionEdit from "../sections/FormSectionEdit";
import { RxTextAlignLeft } from "react-icons/rx";
import { CiEdit, CiImageOn, CiViewTable } from "react-icons/ci";
import { PiListBullets } from "react-icons/pi";
import { VscWholeWord } from "react-icons/vsc";
import { IoCopyOutline } from "react-icons/io5";
import FormWordAdd from "../words/FormWordAdd";
import copy from "copy-to-clipboard";
import { toast } from "react-toastify";

export default function AdminSectionContainer({
  section: item,
}: {
  section: any;
}) {
  const dropdownRef = useRef<HTMLDivElement>(null);

  const [showDropDown, setShowDropDown] = useState(false);
  const [editHeader, setEditHeader] = useState(false);
  const [editImage, setEditImage] = useState(false);
  const [addIntro, setAddIntro] = useState(false);
  const [addDef, setAddDef] = useState(false);
  const [addTable, setAddTable] = useState(false);
  const [addList, setAddList] = useState(false);
  const [addWord, setAddWord] = useState(false);
  const [addSentence, setAddSentence] = useState(false);

  const copyIDtoClipboard = () => {
    const isCopy = copy(item?.id);
    if (isCopy) {
      toast.success("Section ID Copied");
    }
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setShowDropDown(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="relative">
      <div ref={dropdownRef} className="absolute top-2 right-2 z-50">
        <button onClick={() => setShowDropDown(true)} className="z-10">
          <BsThreeDots size={25} />
        </button>
        <div
          className={
            (showDropDown ? "" : "-translate-y-2 opacity-0 invisible") +
            " absolute top-full right-0 duration-200 bg-zinc-100 z-[100] text-sm flex flex-col items-stretch shadow-sm shadow-zinc-700"
          }
        >
          <div className="py-2 px-4 bg-zinc-200">Add...</div>
          <button
            title="Add Introduction"
            onClick={() => setAddIntro(true)}
            className="py-2 px-4 hover:bg-zinc-50 flex items-center gap-2"
          >
            <RxTextAlignLeft size={20} />{" "}
            <span className="text-nowrap">Introduction</span>
          </button>
          <button
            title="Add Definition"
            onClick={() => setAddDef(true)}
            className="py-2 px-4 hover:bg-zinc-50 flex items-center gap-2"
          >
            <BsChatLeftText size={20} />
            <span className="text-nowrap">Definition</span>
          </button>
          <button
            title="Add Table"
            onClick={() => setAddTable(true)}
            className="py-2 px-4 hover:bg-zinc-50 flex items-center gap-2"
          >
            <CiViewTable size={20} />
            <span className="text-nowrap">Table</span>
          </button>
          <button
            title="Add List"
            onClick={() => setAddList(true)}
            className="py-2 px-4 hover:bg-zinc-50 flex items-center gap-2"
          >
            <PiListBullets size={20} />
            <span className="text-nowrap">List</span>
          </button>
          <button
            title="Add Word"
            onClick={() => setAddWord(true)}
            className="py-2 px-4 hover:bg-zinc-50 flex items-center gap-2"
          >
            <VscWholeWord size={20} />
            <span>Word</span>
          </button>
          <button
            title="Add Sentence"
            onClick={() => setAddSentence(true)}
            className="py-2 px-4 hover:bg-zinc-50 flex items-center gap-2"
          >
            <BsTextParagraph size={20} />
            <span>Sentence</span>
          </button>
          <div className="py-2 px-4 bg-zinc-200">Edit...</div>
          <button
            title="Edit Section"
            onClick={() => setEditHeader(true)}
            className="py-2 px-4 hover:bg-zinc-50 flex items-center gap-2"
          >
            <CiEdit size={20} />
            <span>Section</span>
          </button>
          <button
            title="Edit Image"
            onClick={() => setEditImage(true)}
            className="py-2 px-4 hover:bg-zinc-50 flex items-center gap-2"
          >
            <CiImageOn size={20} />
            <span>Image</span>
          </button>
          <button
            title="Copy Section ID"
            onClick={copyIDtoClipboard}
            className="py-2 px-4 hover:bg-zinc-50 flex items-center gap-2"
          >
            <IoCopyOutline size={20} />
            <span>Copy ID</span>
          </button>
        </div>
      </div>
      <Section
        key={item.id}
        definitions={item.definitions}
        words={item.words}
        section={item}
        sectionLists={item.sectionLists}
        sentences={item.sentences}
        tables={item.tables}
        tableWords={[]}
      />

      {editHeader && <FormSectionEdit section={item} setEdit={setEditHeader} />}
      {addWord && <FormWordAdd setAdd={setAddWord} sectionID={item.id} />}
      {}
    </div>
  );
}
