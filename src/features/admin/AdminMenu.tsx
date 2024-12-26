import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { RiAdminLine } from "react-icons/ri";
import { IoMenu } from "react-icons/io5";

const CONTENT = [
  { label: "Chapters", url: "/admin/chapters" },
  { label: "Lessons", url: "/admin/lessons" },
  { label: "Sections", url: "/admin/sections" },
  { label: "Definitions", url: "/admin/definitions" },
  { label: "Words", url: "/admin/words" },
  { label: "Sentences", url: "/admin/sentences" },
];

export default function AdminMenu() {
  const [showMenu, setShowMenu] = useState(false);

  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const closeSideBar = (event: MouseEvent) => {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        setShowMenu(false);
      }
    };

    document.addEventListener("mousedown", closeSideBar);
    return () => {
      document.removeEventListener("mousedown", closeSideBar);
    };
  }, []);

  return (
    <div ref={ref} className="flex">
      <button
        onClick={() => setShowMenu(true)}
        className="lg:hidden inline-block"
      >
        <IoMenu size={25} />
      </button>
      <nav
        className={
          (showMenu ? "" : "-translate-x-full opacity-0 ") +
          "bg-zinc-100 mt-2 border-red-700 text-zinc-800 fixed top-0 left-0 w-fit duration-200 z-[100000]"
        }
      >
        <div className="py-4 px-4 flex items-center gap-2 border-b-[1px] border-red-600">
          <RiAdminLine size={30} />
          <span className="font-semibold text-zinc-900">Admin</span>
        </div>
        <div>
          <h3 className="py-2 px-4 font-semibold border-b-2">Pages</h3>
          <ul>
            <li className="py-2 px-4 border-b-2">
              <Link to={"/admin/images/upload"}>Upload Images</Link>
            </li>
          </ul>
        </div>
        <div>
          <h3 className="py-2 px-4 font-semibold border-b-2">Content</h3>
          <ul className="flex flex-col">
            {CONTENT.map((item, index) => {
              return (
                <li key={index} className="py-2 px-4 border-b-2">
                  <Link to={item.url}>{item.label}</Link>
                </li>
              );
            })}
          </ul>
        </div>
        <div>
          <h3 className="py-2 px-4 font-semibold  border-b-2">Users</h3>
          <ul className="flex flex-col">
            <li className="py-2 px-4 border-b-2">
              <Link to={"/admin/users"}>Users</Link>
            </li>
          </ul>
        </div>
      </nav>
    </div>
  );
}
