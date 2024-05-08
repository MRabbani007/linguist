import { Outlet, useLocation } from "react-router-dom";
import Header from "../../views/Header";
import { Suspense } from "react";
import Navbar from "./Navbar";
import SkeletonContentPage from "../../skeletons/SkeletonContentPage";
import Sidebar from "../navigation/Sidebar";
import { ToastContainer } from "react-toastify";

const Layout = () => {
  const location = useLocation();

  const onAuthPage =
    location.pathname.includes("login") || location.pathname.includes("signup");

  const onContentPage =
    location.pathname.includes("chapters") ||
    location.pathname.includes("sections") ||
    location.pathname.includes("lesson");

  return (
    <>
      <Navbar />
      <div className={onAuthPage ? "page-container-fluid" : "page-container"}>
        {/* <Header /> */}
        {onContentPage && <Sidebar />}
        <Suspense fallback={<SkeletonContentPage />}>
          <Outlet />
        </Suspense>
      </div>
    </>
  );
};
export default Layout;
