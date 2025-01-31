import { Outlet } from "react-router-dom";
import { Suspense, useEffect } from "react";
import Navbar from "../navigation/Navbar";
import SkeletonContentPage from "../../skeletons/SkeletonContentPage";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useDispatch, useSelector } from "react-redux";
import {
  selectDisplayLesson,
  selectDisplayChapter,
  selectLanguage,
  setChapters,
  setDisplayChapter,
  setLanguage,
  setLessons,
  setSiteLanguages,
  setDisplayLesson,
} from "../globals/globalsSlice";
import Footer from "./Footer";
import useLocalStorage from "../../hooks/useLocalStorage";
import { axiosPrivate } from "../../api/axios";
import { DEFAULT_LANG } from "../../lib/defaultLanguage";
import {
  useLazyGetAllLessonsQuery,
  useLazyGetChaptersQuery,
  useLazyGetLanguagesQuery,
} from "../globals/globalsApiSlice";

export default function Layout() {
  // const location = useLocation();
  const dispatch = useDispatch();

  const [getLanguages, { data: languages }] = useLazyGetLanguagesQuery();

  const [getChapters, { data: chapters, isSuccess: isSuccessChapters }] =
    useLazyGetChaptersQuery();

  const [getAllLessons, { data: lessons, isSuccess: isSuccessLessons }] =
    useLazyGetAllLessonsQuery();

  // const [
  //   getProfile,
  //   { data: userProfile, isLoading: isLoadingProfile, isSuccess },
  // ] = useGetUserProfileQuery();

  // const user = useSelector(selectCurrentUser);
  const language = useSelector(selectLanguage);

  const displayChapter = useSelector(selectDisplayChapter);
  const displayBlock = useSelector(selectDisplayLesson);

  const fetchLanguages = async () => {
    try {
      const response = await axiosPrivate.get("/languages");

      if (response.status === 200 && Array.isArray(response.data)) {
        dispatch(setSiteLanguages(response.data));
      }
    } catch (error) {}
  };

  useEffect(() => {
    fetchLanguages;
  }, []);

  const [lastChapter, setLastChapter] = useLocalStorage("displayChapter", null);
  const [lastLesson, setLastLesson] = useLocalStorage("displayLesson", null);
  // const [lastPage, setLastPage] = useLocalStorage("lastPage", null);

  useEffect(() => {
    getLanguages(null);
  }, []);

  useEffect(() => {
    if (Array.isArray(languages)) {
      dispatch(setSiteLanguages(languages));
    }
  }, [languages]);

  // useEffect(() => {
  //   setLastPage(location);
  // }, [location]);

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
      }
    }
    if (!displayBlock?.id && lastLesson?.id) {
      dispatch(setDisplayLesson(lastLesson));
      // navigate("/content/lesson");
    }
  }, [lastChapter, lastLesson]);

  // useEffect(() => {
  //   if (user) {
  //     getProfile();
  //   }
  // }, [user]);

  useEffect(() => {
    if (language?.id) {
      getChapters(language?.id);
      getAllLessons(language?.id);
    }
  }, [language?.id]);

  // Set Chapters
  useEffect(() => {
    if (isSuccessChapters) {
      // const tempChapters = chapters.ids.map(
      //   (id: string) => chapters.entities[id]
      // );
      dispatch(setChapters(chapters));
    }
  }, [chapters]);

  // Set Lessons
  useEffect(() => {
    if (isSuccessLessons) {
      // const tempLessons = lessons.ids.map((id: string) => lessons.entities[id]);
      dispatch(setLessons(lessons));
    }
  }, [lessons]);

  // Set Language
  // useEffect(() => {
  //   if (
  //     isSuccess &&
  //     isSuccessSiteLangauges &&
  //     userProfile[0]?.selectedLanguage &&
  //     userProfile[0].selectedLanguage !== ""
  //   ) {
  //     let temp = siteLanguages.ids
  //       .map((id) => siteLanguages.entities[id])
  //       .find((lang) => lang.id === userProfile[0].selectedLanguage);
  //     if (temp?.id) {
  //       dispatch(setLanguage(temp));
  //     }
  //   } else {
  //   }
  // }, [userProfile, siteLanguages]);

  useEffect(() => {
    dispatch(setLanguage(DEFAULT_LANG));
  }, []);

  // const onAuthPage =
  //   location.pathname.includes("login") ||
  //   location.pathname.includes("signup") ||
  //   location.pathname === "/";

  // const onContentPage =
  //   location.pathname.includes("chapters") ||
  //   location.pathname.includes("sections") ||
  //   location.pathname.includes("lesson");

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
}
