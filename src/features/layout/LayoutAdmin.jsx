import React, { Suspense } from "react";
import { Outlet, useLocation } from "react-router-dom";
import SkeletonContentPage from "../../skeletons/SkeletonContentPage";
import AdminMenu from "../admin/AdminMenu";

export default function LayoutAdmin({ children }) {
  const location = useLocation();
  return (
    <div className="flex w-full">
      <AdminMenu />
      <div className="flex-1">
        <h2 className="bg-zinc-200 py-4 px-8 w-full font-semibold border-b-[1px] border-red-600">
          {location?.pathname.replace("/", "").replaceAll("/", " / ")}
        </h2>
        <div className="flex flex-col items-center gap-4 p-4 w-full">
          <Suspense fallback={<SkeletonContentPage />}>
            <Outlet />
          </Suspense>
        </div>
      </div>
    </div>
  );
}
