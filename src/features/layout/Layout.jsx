import { Outlet, useLocation } from "react-router-dom";
import { Suspense, useEffect, useState } from "react";
import Navbar from "../navigation/Navbar";
import SkeletonContentPage from "../../skeletons/SkeletonContentPage";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useDispatch, useSelector } from "react-redux";
import { selectCurrentUser } from "../auth/authSlice";
import { useLazyGetProfileQuery } from "../profile/profileSlice";
import { axiosPrivate } from "../../api/axios";
import {
  selectLanguage,
  selectSiteLanguages,
  setChapters,
  setLanguage,
  setLessons,
  setSiteLanguages,
} from "../globals/globalsSlice";
import { useGetChaptersQuery } from "../chapters/chapterSlice";
import { useLazyGetAllBlocksQuery } from "../blocks/blockSlice";
import Footer from "./Footer";

const Layout = () => {
  const location = useLocation();
  const dispatch = useDispatch();

  const user = useSelector(selectCurrentUser);
  const language = useSelector(selectLanguage);
  const siteLanguages = useSelector(selectSiteLanguages);

  const getLangauges = async () => {
    let response = await axiosPrivate.get("/languages");

    if (Array.isArray(response?.data)) {
      dispatch(setSiteLanguages(response.data));
    }
  };

  const [getProfile, { data: userProfile, isLoading, isSuccess }] =
    useLazyGetProfileQuery();

  const {
    data: chapters,
    isLoading: isLoadingChapters,
    isSuccess: isSuccessChapters,
    isError: isErrorChapters,
    error: errorChapters,
  } = useGetChaptersQuery(language?.id);

  const [getAllBlocks, { data: lessons, isSuccess: isSuccessLessons }] =
    useLazyGetAllBlocksQuery();

  useEffect(() => {
    getLangauges();
  }, [user]);

  useEffect(() => {
    if (user) {
      getProfile();
    }
  }, [user]);

  useEffect(() => {
    if (language?.id) {
      getAllBlocks(language?.id);
    }
  }, [language?.id]);

  useEffect(() => {
    if (
      isSuccess &&
      userProfile[0]?.selectedLanguage &&
      userProfile[0].selectedLanguage !== ""
    ) {
      let temp = siteLanguages.find(
        (lang) => lang.id === userProfile[0].selectedLanguage
      );
      if (temp?.id) {
        dispatch(setLanguage(temp));
      }
    }
  }, [userProfile, siteLanguages, isSuccess]);

  useEffect(() => {
    if (isSuccessChapters) {
      const temp = chapters.ids.map((id) => chapters.entities[id]);
      dispatch(setChapters(temp));
    }
  }, [chapters]);

  useEffect(() => {
    if (isSuccessLessons) {
      const temp = lessons.ids.map((id) => lessons.entities[id]);
      dispatch(setLessons(temp));
    }
  }, [lessons]);

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
      {/* <Header /> */}
      {/* {onContentPage && <Sidebar />} */}
      <Suspense fallback={<SkeletonContentPage />}>
        <Outlet />
      </Suspense>
      <ToastContainer autoClose={1000} />
      <Footer />
    </>
  );
};
export default Layout;
