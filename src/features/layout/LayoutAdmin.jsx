import React, { Suspense, useEffect, useRef, useState } from "react";
import { Outlet, useLocation } from "react-router-dom";
import SkeletonContentPage from "../../skeletons/SkeletonContentPage";
import AdminMenu from "../admin/AdminMenu";
import { useDispatch } from "react-redux";
import { setChapters } from "../admin/adminSlice";
import { useLazyGetAllChaptersQuery } from "../admin/adminApiSlice";
import AdminSidebar from "../navigation/AdminSidebar";

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
    <div className="flex flex-row items-stretch flex-1">
      <AdminSidebar />
      <main className="">
        <div className="relative">
          <h2 className="font-semibold flex items-center gap-4 uppercase">
            {location?.pathname.replace("/", "").replaceAll("/", " / ")}
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
