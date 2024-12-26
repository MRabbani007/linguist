import { Suspense } from "react";
import { Outlet } from "react-router-dom";
import SkeletonContentPage from "../../skeletons/SkeletonContentPage";

export default function LayoutLearning() {
  return (
    <div className="flex-1 flex flex-col">
      <Suspense fallback={<SkeletonContentPage />}>
        <Outlet />
      </Suspense>
    </div>
  );
}
