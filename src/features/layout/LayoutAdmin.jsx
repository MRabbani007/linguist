import React, { Suspense, useEffect, useRef, useState } from "react";
import { Outlet, useLocation } from "react-router-dom";
import SkeletonContentPage from "../../skeletons/SkeletonContentPage";
import AdminMenu from "../admin/AdminMenu";
import { IoMenuOutline } from "react-icons/io5";
import AdminMenuDesktop from "../admin/AdminMenuDesktop";
import { useDispatch } from "react-redux";
import { setChapters } from "../admin/adminSlice";
import { useLazyGetAllChaptersQuery } from "../admin/adminApiSlice";

export default function LayoutAdmin({ children }) {
  const location = useLocation();
  const dispatch = useDispatch();
  const [showMenu, setShowMenu] = useState(false);

  const [
    getAllChapters,
    {
      data: chapters,
      isLoading: isLoadingChapters,
      isSuccess: isSuccessChapters,
      isError: isErrorChapters,
      error: errorChapters,
    },
  ] = useLazyGetAllChaptersQuery();

  useEffect(() => {
    getAllChapters(1);
  }, []);

  useEffect(() => {
    if (isSuccessChapters) {
      dispatch(setChapters(chapters.ids.map((id) => chapters.entities[id])));
    }
  }, [chapters]);

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
    <div className="flex flex-row items-stretch w-full">
      <AdminMenuDesktop />
      <main className="">
        <div className="relative w-full">
          <h2 className="bg-zinc-200 py-4 px-8 w-full font-semibold flex items-center gap-4 uppercase">
            {/* <button
              onClick={() => setShowMenu((curr) => !curr)}
              ref={menuButtonRef}
            >
              <IoMenuOutline size={32} />
            </button> */}
            <span>
              {location?.pathname.replace("/", "").replaceAll("/", " / ")}
            </span>
          </h2>
          <AdminMenu showMenu={showMenu} ref={menuRef} />
        </div>
        <Suspense fallback={<SkeletonContentPage />}>
          <Outlet />
        </Suspense>
      </main>
    </div>
  );
}
