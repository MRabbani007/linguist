import { Outlet, useLocation } from "react-router-dom";
import { Suspense, useEffect, useState } from "react";
import Navbar from "../navigation/Navbar";
import SkeletonContentPage from "../../skeletons/SkeletonContentPage";
import Sidebar from "../navigation/Sidebar";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useDispatch, useSelector } from "react-redux";
import { selectCurrentUser } from "../auth/authSlice";
import { useLazyGetProfileQuery } from "../profile/profileSlice";
import { axiosPrivate } from "../../api/axios";
import { setLanguage } from "../globals/globalsSlice";

const Layout = () => {
  const location = useLocation();
  const dispatch = useDispatch();

  const user = useSelector(selectCurrentUser);
  const [languages, setLanguages] = useState([]);

  const getLangauges = async () => {
    let response = await axiosPrivate.get("/languages");

    if (Array.isArray(response?.data)) {
      setLanguages(response.data);
    }
  };

  const [getProfile, { data: userProfile, isLoading, isSuccess }] =
    useLazyGetProfileQuery();

  useEffect(() => {
    getLangauges();
  }, []);

  useEffect(() => {
    if (user) {
      getProfile();
    }
  }, [user]);

  useEffect(() => {
    if (
      isSuccess &&
      userProfile[0]?.selectedLanguage &&
      userProfile[0].selectedLanguage !== ""
    ) {
      let temp = languages.find(
        (lang) => lang.id === userProfile[0].selectedLanguage
      );
      if (temp?.id) {
        dispatch(setLanguage(temp));
      }
    }
  }, [userProfile, isSuccess]);

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
        {/* {onContentPage && <Sidebar />} */}
        <Suspense fallback={<SkeletonContentPage />}>
          <Outlet />
        </Suspense>
        <ToastContainer autoClose={2000} />
      </div>
    </>
  );
};
export default Layout;
