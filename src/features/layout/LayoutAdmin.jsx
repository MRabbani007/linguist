import React, { Suspense, useEffect, useRef, useState } from "react";
import { Outlet, useLocation } from "react-router-dom";
import SkeletonContentPage from "../../skeletons/SkeletonContentPage";
import AdminMenu from "../admin/AdminMenu";
import { IoMenuOutline } from "react-icons/io5";

export default function LayoutAdmin({ children }) {
  const location = useLocation();
  const [showMenu, setShowMenu] = useState(false);

  const menuRef = useRef();
  const menuButtonRef = useRef();

  const closeSideBar = (e) => {
    if (!menuRef.current?.contains(e.target)) {
      if (menuButtonRef.current?.contains(e.target)) {
      } else {
        setShowMenu(false);
      }
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", closeSideBar);
    return () => {
      document.removeEventListener("mousedown", closeSideBar);
    };
  }, []);

  return (
    <div className="flex w-full">
      <div className="flex-1">
        <div className="relative">
          <h2 className="bg-zinc-200 py-4 px-8 w-full font-semibold border-b-[1px] border-red-600 flex items-center gap-4">
            <button
              onClick={() => setShowMenu((curr) => !curr)}
              ref={menuButtonRef}
            >
              <IoMenuOutline size={32} />
            </button>
            <span>
              {location?.pathname.replace("/", "").replaceAll("/", " / ")}
            </span>
          </h2>
          <AdminMenu showMenu={showMenu} ref={menuRef} />
        </div>
        <div className="flex flex-col items-center gap-4 p-4 w-full">
          <Suspense fallback={<SkeletonContentPage />}>
            <Outlet />
          </Suspense>
        </div>
      </div>
    </div>
  );
}
