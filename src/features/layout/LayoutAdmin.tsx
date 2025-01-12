import { Suspense, useEffect } from "react";
import { Outlet, useLocation } from "react-router-dom";
import SkeletonContentPage from "../../skeletons/SkeletonContentPage";
import AdminMenu from "../admin/AdminMenu";

import { useLazyGetAllSectionsQuery } from "../admin/adminApiSlice";
import { useDispatch } from "react-redux";
import { setSections } from "../globals/globalsSlice";

export default function LayoutAdmin() {
  const location = useLocation();
  const dispatch = useDispatch();

  const [getAllSections, { data: sections, isSuccess: isSuccessSections }] =
    useLazyGetAllSectionsQuery();

  useEffect(() => {
    getAllSections(1);
  }, []);

  useEffect(() => {
    if (isSuccessSections) {
      dispatch(setSections(sections?.data));
    }
  }, [sections]);

  return (
    <div className="flex flex-row items-stretch flex-1 ">
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
