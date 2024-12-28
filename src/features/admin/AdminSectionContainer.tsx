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

  console.log(showDropDown);

  return (
    <div className="relative">
      <div ref={dropdownRef} className="absolute top-2 right-2 z-50">
        <button onClick={() => setShowDropDown(true)}>
          <BsThreeDots size={25} />
        </button>
        <div
          className={
            (showDropDown ? "" : "-translate-y-2 opacity-0 invisible") +
            " section-dropdown"
          }
        >
          <div className="dropdown-title">Add...</div>
          <div className="flex flex-row flex-wrap gap-2 items-center justify-start">
            <button title="Add Introduction" onClick={() => setAddIntro(true)}>
              <RxTextAlignLeft size={25} />
            </button>
            <button title="Add Definition" onClick={() => setAddDef(true)}>
              <BsChatLeftText size={28} />
            </button>
            <button title="Add Table" onClick={() => setAddTable(true)}>
              <CiViewTable size={32} />
            </button>
            <button title="Add List" onClick={() => setAddList(true)}>
              <PiListBullets size={32} />
            </button>
          </div>
          <div>
            <button title="Add Word" onClick={() => setAddWord(true)}>
              <VscWholeWord size={32} />
              <span>Word</span>
            </button>
            <button title="Add Sentence" onClick={() => setAddSentence(true)}>
              <BsTextParagraph size={32} />
              <span>Sentence</span>
            </button>
          </div>
          <div className="dropdown-title">Edit...</div>
          <div>
            <button title="Edit Section" onClick={() => setEditHeader(true)}>
              <CiEdit size={32} />
              <span>Title</span>
            </button>
            <button title="Edit Image" onClick={() => setEditImage(true)}>
              <CiImageOn size={32} />
              <span>Image</span>
            </button>
            <button title="Copy Section ID" onClick={copyIDtoClipboard}>
              <IoCopyOutline size={30} />
              <span>Copy ID</span>
            </button>
          </div>
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
    </div>
  );
}
