import React, { Suspense } from "react";
import { Outlet } from "react-router-dom";
import SkeletonContentPage from "../../skeletons/SkeletonContentPage";
import Sidebar from "../navigation/Sidebar";

export default function LayoutLearning() {
  return (
    <div className="flex items-start gap-4 p-2">
      <Sidebar />
      <Suspense fallback={<SkeletonContentPage />}>
        <Outlet />
      </Suspense>
    </div>
  );
}
