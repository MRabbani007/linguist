import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { RiAdminLine } from "react-icons/ri";
import { IoMenu } from "react-icons/io5";
import { BiX } from "react-icons/bi";

const CONTENT = [
  { label: "Chapters", url: "/admin/chapters" },
  { label: "Lessons", url: "/admin/lessons" },
  { label: "Sections", url: "/admin/sections" },
  { label: "Definitions", url: "/admin/definitions" },
  { label: "Words", url: "/admin/words" },
  { label: "Sentences", url: "/admin/sentences" },
];

export default function AdminMenu() {
  const [show, setShow] = useState(false);

  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const closeSideBar = (event: MouseEvent) => {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        setShow(false);
      }
    };

    document.addEventListener("mousedown", closeSideBar);
    return () => {
      document.removeEventListener("mousedown", closeSideBar);
    };
  }, []);

  return (
    <div ref={ref} className="flex">
      <button onClick={() => setShow(true)} className="g:hidden inline-block">
        <IoMenu size={25} />
      </button>
      {show && (
        <div
          className="fixed inset-0 bg-zinc-900/80 z-[100]"
          onClick={() => setShow(false)}
        />
      )}
      <nav
        className={
          (show ? "" : " -translate-x-full invisible opacity-0") +
          " text-zinc-800 bg-zinc-100 fixed top-0 bottom-0 left-0 duration-200 p-4 z-[120] w-[80vw] min-w-[250px] max-w-[400px] overflow-y-auto"
        }
      >
        <div className="py-4 px-4 flex items-center gap-2 border-b-[1px] border-red-600">
          <RiAdminLine size={30} />
          <span className="font-semibold text-zinc-900">Admin</span>
          <button className="ml-auto" onClick={() => setShow(false)}>
            <BiX size={25} />
          </button>
        </div>
        <div className="flex flex-col">
          <h3 className="py-2 px-4 font-semibold border-b-2">Pages</h3>
          <Link
            className="py-2 px-4 hover:bg-zinc-200 duration-200"
            to={"/admin/images/upload"}
            onClick={() => setShow(false)}
          >
            Upload Images
          </Link>
        </div>
        <div>
          <h3 className="py-2 px-4 font-semibold border-b-2">Content</h3>
          <div className="flex flex-col">
            {CONTENT.map((item, index) => {
              return (
                <Link
                  key={index}
                  to={item.url}
                  onClick={() => setShow(false)}
                  className="py-2 px-4 hover:bg-zinc-200 duration-200"
                >
                  {item.label}
                </Link>
              );
            })}
          </div>
        </div>
        <div>
          <h3 className="py-2 px-4 font-semibold  border-b-2">Users</h3>
          <div className="flex flex-col">
            <Link
              className="py-2 px-4 hover:bg-zinc-200 duration-200"
              to={"/admin/users"}
              onClick={() => setShow(false)}
            >
              Users
            </Link>
          </div>
        </div>
      </nav>
    </div>
  );
}
