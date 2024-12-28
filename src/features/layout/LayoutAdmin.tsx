import { Suspense } from "react";
import { Outlet, useLocation } from "react-router-dom";
import SkeletonContentPage from "../../skeletons/SkeletonContentPage";
import AdminMenu from "../admin/AdminMenu";
// import AdminSidebar from "../navigation/AdminSidebar";

export default function LayoutAdmin() {
  const location = useLocation();

  return (
    <div className="flex flex-row items-stretch flex-1">
      {/* <AdminSidebar /> */}
      <main className="">
        <div className="relative flex items-center gap-4">
          <AdminMenu />
          <h2 className="font-semibold flex items-center gap-4 uppercase">
            {location?.pathname.replace("/", "").replaceAll("/", " / ")}
          </h2>
        </div>
        <Suspense fallback={<SkeletonContentPage />}>
          <Outlet />
        </Suspense>
      </main>
    </div>
  );
}
