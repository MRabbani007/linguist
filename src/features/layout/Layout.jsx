import { Outlet, useLocation } from "react-router-dom";
import Header from "../../views/Header";
import { Suspense } from "react";
import Navbar from "./Navbar";
import SkeletonContentPage from "../../skeletons/SkeletonContentPage";

const Layout = () => {
  const location = useLocation();

  const onAuthPage =
    location.pathname.includes("login") || location.pathname.includes("signup");

  return (
    <>
      <Navbar />
      <div className={onAuthPage ? "page-container-fluid" : "page-container"}>
        {/* <Header /> */}
        <Suspense fallback={<SkeletonContentPage />}>
          <Outlet />
        </Suspense>
      </div>
    </>
  );
};
export default Layout;
