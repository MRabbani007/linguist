import React, { Suspense, useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import SkeletonContentPage from "../../skeletons/SkeletonContentPage";
import Sidebar from "../navigation/Sidebar";
import { useDispatch, useSelector } from "react-redux";
import {
  selectDisplayBlock,
  selectDisplayChapter,
  setDisplayChapter,
} from "../globals/globalsSlice";
import useLocalStorage from "../../hooks/useLocalStorage";

export default function LayoutLearning() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  return (
    <div className="flex items-start gap-4 p-2">
      <Sidebar />
      <Suspense fallback={<SkeletonContentPage />}>
        <Outlet />
      </Suspense>
    </div>
  );
}
