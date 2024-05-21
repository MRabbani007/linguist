import { Outlet, useLocation } from "react-router-dom";
import Header from "../../views/Header";
import { Suspense } from "react";
import Navbar from "./Navbar";
import SkeletonContentPage from "../../skeletons/SkeletonContentPage";
import Sidebar from "../navigation/Sidebar";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Layout = () => {
  const location = useLocation();

  const onAuthPage =
    location.pathname.includes("login") ||
    location.pathname.includes("signup") ||
    location.pathname === "/";

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
        <ToastContainer autoClose={2000} />
      </div>
    </>
  );
};
export default Layout;
