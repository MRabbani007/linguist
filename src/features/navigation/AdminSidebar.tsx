import { Link } from "react-router-dom";
import { CgTranscript } from "react-icons/cg";
import { GrNotes } from "react-icons/gr";
import { PiNotebook } from "react-icons/pi";
import { IoInformationCircleOutline } from "react-icons/io5";
import { VscSymbolParameter, VscWholeWord } from "react-icons/vsc";
import { RiSpeakLine } from "react-icons/ri";
import { MdPassword } from "react-icons/md";
import { ReactNode } from "react";

const CONTENT = [
  {
    label: "Chapters",
    url: "/admin/chapters",
    icon: <PiNotebook size={25} />,
  },
  { label: "Lessons", url: "/admin/lessons", icon: <GrNotes size={25} /> },
  {
    label: "Sections",
    url: "/admin/sections",
    icon: <CgTranscript size={25} />,
  },
  {
    label: "Definitions",
    url: "/admin/definitions",
    icon: <IoInformationCircleOutline size={25} />,
  },
  { label: "Words", url: "/admin/words", icon: <VscWholeWord size={25} /> },
  {
    label: "Sentences",
    url: "/admin/sentences",
    icon: <VscSymbolParameter size={25} />,
  },
  {
    label: "Dialogues",
    url: "/admin/dialogues",
    icon: <RiSpeakLine size={25} />,
  },
  {
    label: "Word Attributes",
    url: "/admin/attributes",
    icon: <MdPassword size={25} />,
  },
];

const PAGES = [
  { label: "Upload Images", url: "/admin/images/upload" },
  { label: "Users", url: "/admin/users" },
];

const items = [
  { label: "Content", url: "#", children: CONTENT },
  { label: "Pages", url: "#", children: PAGES },
];

export default function AdminSidebar() {
  return (
    <nav className="text-zinc-800 hidden lg:inline-block">
      {/* <div className="py-4 px-4 flex items-center gap-2 border-b-[1px] border-red-600">
        <RiAdminLine size={30} />
        <span className="font-semibold text-zinc-900">Admin</span>
      </div> */}
      {items.map((menuBlock, index) => {
        return <MenuBlock menuBlock={menuBlock} key={index} />;
      })}
    </nav>
  );
}

function MenuBlock({
  menuBlock,
}: {
  menuBlock: {
    label: string;
    url: string;
    children: { label: string; url: string; icon?: ReactNode }[];
  };
}) {
  return (
    <div>
      <div className="py-2 px-2 font-semibold">{menuBlock.label}</div>
      <div className="flex flex-col">
        {Array.isArray(menuBlock?.children) && menuBlock.children.length !== 0
          ? menuBlock.children.map((item, index) => {
              return (
                <Link
                  title={item.label}
                  key={index}
                  to={item.url}
                  className="py-2 px-4 flex items-center gap-2 hover:bg-zinc-100 duration-200"
                >
                  {item?.icon}
                  {item.label}
                </Link>
              );
            })
          : null}
      </div>
    </div>
  );
}
