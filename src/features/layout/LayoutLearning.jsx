import React, { Suspense, useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import SkeletonContentPage from "../../skeletons/SkeletonContentPage";
import Sidebar from "../navigation/Sidebar";
import { useDispatch } from "react-redux";

export default function LayoutLearning() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  return (
    <div className="flex items-stretch w-full">
      <Sidebar />
      <Suspense fallback={<SkeletonContentPage />}>
        <Outlet />
      </Suspense>
    </div>
  );
}
