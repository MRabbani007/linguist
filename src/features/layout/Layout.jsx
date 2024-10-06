import {
  createSearchParams,
  Outlet,
  useLocation,
  useNavigate,
} from "react-router-dom";
import { Suspense, useEffect, useState } from "react";
import Navbar from "../navigation/Navbar";
import SkeletonContentPage from "../../skeletons/SkeletonContentPage";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useDispatch, useSelector } from "react-redux";
import { selectCurrentUser } from "../auth/authSlice";
import { useLazyGetProfileQuery } from "../profile/profileSlice";
import {
  selectDisplayBlock,
  selectDisplayChapter,
  selectLanguage,
  selectSiteLanguages,
  setChapters,
  setDisplayBlock,
  setDisplayChapter,
  setLanguage,
  setLessons,
  setSiteLanguages,
} from "../globals/globalsSlice";
import { useLazyGetChaptersQuery } from "../chapters/chapterSlice";
import { useLazyGetAllBlocksQuery } from "../blocks/blockSlice";
import Footer from "./Footer";
import useLocalStorage from "../../hooks/useLocalStorage";
import { useGetLanguagesQuery } from "../globals/globalsApiSlice";

const Layout = () => {
  const location = useLocation();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const user = useSelector(selectCurrentUser);
  const language = useSelector(selectLanguage);
  // const siteLanguages = useSelector(selectSiteLanguages);

  const {
    data: siteLanguages,
    isLoading: isLoadingSiteLanguages,
    isSuccess: isSuccessSiteLangauges,
  } = useGetLanguagesQuery();

  const displayChapter = useSelector(selectDisplayChapter);
  const displayBlock = useSelector(selectDisplayBlock);

  const [
    getProfile,
    { data: userProfile, isLoading: isLoadingProfile, isSuccess },
  ] = useLazyGetProfileQuery();

  const [
    getChapters,
    {
      data: chapters,
      isLoading: isLoadingChapters,
      isSuccess: isSuccessChapters,
    },
  ] = useLazyGetChaptersQuery();

  const [
    getAllBlocks,
    { data: lessons, isLoading: isLoadingLessons, isSuccess: isSuccessLessons },
  ] = useLazyGetAllBlocksQuery();

  const [lastChapter, setLastChapter] = useLocalStorage("displayChapter", null);
  const [lastLesson, setLastLesson] = useLocalStorage("displayLesson", null);
  const [lastPage, setLastPage] = useLocalStorage("lastPage", null);

  useEffect(() => {
    if (isSuccessSiteLangauges) {
      dispatch(
        setSiteLanguages(
          siteLanguages.ids.map((id) => siteLanguages.entities[id])
        )
      );
    }
  }, [siteLanguages]);

  useEffect(() => {
    // if (lastPage?.pathname) {
    //   navigate(`${lastPage?.pathname}${lastPage?.search ?? ""}`);
    // }
  }, []);

  useEffect(() => {
    setLastPage(location);
  }, [location]);

  useEffect(() => {
    if (displayChapter?.id) {
      setLastChapter(displayChapter);
    }
  }, [displayChapter]);

  useEffect(() => {
    if (displayBlock?.id) {
      setLastLesson(displayBlock);
    }
  }, [displayBlock]);

  useEffect(() => {
    if (!displayChapter?.id && lastChapter?.id) {
      dispatch(setDisplayChapter(lastChapter));
      if (!displayChapter?.id && !lastLesson?.id) {
        // navigate("/content/sections");
      }
    }
    if (!displayBlock?.id && lastLesson?.id) {
      dispatch(setDisplayBlock(lastLesson));
      // navigate("/content/lesson");
    }
  }, [lastChapter, lastLesson]);

  useEffect(() => {
    if (user) {
      getProfile();
    }
  }, [user]);

  useEffect(() => {
    if (language?.id) {
      getChapters(language?.id);
      getAllBlocks(language?.id);
    }
  }, [language?.id]);

  // Set Chapters
  useEffect(() => {
    if (isSuccessChapters) {
      const tempChapters = chapters.ids.map((id) => chapters.entities[id]);
      dispatch(setChapters(tempChapters));
    }
  }, [chapters]);

  // Set Lessons
  useEffect(() => {
    if (isSuccessLessons) {
      const tempLessons = lessons.ids.map((id) => lessons.entities[id]);
      dispatch(setLessons(tempLessons));
    }
  }, [lessons]);

  // Set Language
  useEffect(() => {
    if (
      isSuccess &&
      isSuccessSiteLangauges &&
      userProfile[0]?.selectedLanguage &&
      userProfile[0].selectedLanguage !== ""
    ) {
      let temp = siteLanguages.ids
        .map((id) => siteLanguages.entities[id])
        .find((lang) => lang.id === userProfile[0].selectedLanguage);
      if (temp?.id) {
        dispatch(setLanguage(temp));
      }
    } else {
      dispatch(
        setLanguage({
          createDate: "2024-05-12T14:48:04.293Z",
          detail: "Russian / English",
          id: "57f02183-67d1-4ffd-b9f8-a483561a284b",
          image: "russian.png",
          learningTime: "",
          name: "Russian",
          sortIndex: 99,
          subtitle: "",
          text: "",
          title: "Learn the Russian Language",
          userID: "",
          visible: true,
        })
      );
    }
  }, [userProfile, siteLanguages]);

  const onAuthPage =
    location.pathname.includes("login") ||
    location.pathname.includes("signup") ||
    location.pathname === "/";

  const onContentPage =
    location.pathname.includes("chapters") ||
    location.pathname.includes("sections") ||
    location.pathname.includes("lesson");

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <Suspense fallback={<SkeletonContentPage />}>
        <Outlet />
      </Suspense>
      <ToastContainer autoClose={1000} />
      <Footer />
    </div>
  );
};
export default Layout;
