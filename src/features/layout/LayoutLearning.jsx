import React, { Suspense, useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import SkeletonContentPage from "../../skeletons/SkeletonContentPage";
import Sidebar from "../navigation/Sidebar";
import { useDispatch } from "react-redux";

export default function LayoutLearning() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // max-w-[1024px]

  return (
    <div className="flex items-stretch w-full mx-auto">
      {/* <Sidebar /> */}
      <Suspense fallback={<SkeletonContentPage />}>
        <Outlet />
      </Suspense>
    </div>
  );
}
