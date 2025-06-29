import { lazy } from "react";
import { Route, Routes } from "react-router-dom";
// Imported Styles
import "./styles/styles.css";
// generated from SASS
import "./styles/main.css";
// Imported Context
import { AuthProvider } from "./context/AuthProvider";
// import { lazyLoad } from "./data/lazyLoad";
// Import Error Handler
import { ErrorBoundary } from "react-error-boundary";
import ErrorFallBack from "./features/auth/ErrorFallBack";
import SkeletonContentPage from "./skeletons/SkeletonContentPage";
// Layouts & navigation
import Layout from "./features/layout/Layout";
import LayoutAdmin from "./features/layout/LayoutAdmin";
import LayoutLearning from "./features/layout/LayoutLearning";
import RequireAuth from "./features/auth/RequireAuth";
import PersistLogin from "./features/auth/PersistLogin";
import Unauthorized from "./views/auth/Unauthorized";
import MissingPage from "./views/MissingPage";
// Auth
import SigninPage from "./views/auth/SigninPage";
import SignupPage from "./views/auth/SignupPage";
import SignOutPage from "./views/auth/SignOutPage";
// Admin
import AdminPage from "./views/admin/AdminPage";
import AdminSettings from "./views/admin/AdminSettings";
import AdminUsersPage from "./views/admin/AdminUsersPage";
// Editor
import AdminChapters from "./views/admin/AdminChapters";
import AdminLessons from "./views/admin/AdminLessons";
import AdminSections from "./views/admin/AdminSections";
import AdminLessonEditor from "./views/admin/AdminLessonEditor";
import AdminDefinitions from "./views/admin/AdminDefinitions";
import AdminSentences from "./views/admin/AdminSentences";
import AdminWords from "./views/admin/AdminWords";
import AdminDialogues from "./views/admin/AdminDialogues";
import AdminDialogueID from "./views/admin/AdminDialogueIDPage";
import AdminWordAttributes from "./views/admin/AdminWordAttributes";
import AdminWordListsPage from "./views/admin/AdminWordListsPage";
import ImageUpload from "./views/admin/ImageUpload";
// User
import DashboardPage from "./views/user/DashboardPage";
import ProfilePage from "./views/user/ProfilePage";
import UserNotesPage from "./views/user/UserNotesPage";
import SettingsPage from "./views/user/SettingsPage";
// Website
import HomePage from "./views/HomePage";
import AboutPage from "./views/website/AboutPage";
import NotePage from "./views/website/NotePage";
import ContactUs from "./views/website/ContactUs";
// Content
import LanguagePage from "./views/content/LanguagePage";
import ContentPage from "./views/content/ContentPage";
import TextsPage from "./views/content/TextsPage";
import DialoguePage from "./views/content/DialoguePage";
import DialogueID from "./views/content/DialogueID";
import ChapterPage from "./views/content/ChapterPage";
import LessonPage from "./views/content/LessonPage";
import SearchPage from "./views/content/SearchPage";
import SentencesPage from "./views/content/SentencesPage";
// Review
import DefinitionsPage from "./views/review/DefinitionsPage";
import WordsPage from "./views/review/WordsPage";
import WordListsPage from "./views/review/WordListsPage";
// Exercise
import ExercisesMainPage from "./views/exercise/ExercisesMainPage";
import MatchWordsPage from "./views/exercise/MatchWordsPage";
import ReadingPage from "./views/exercise/ReadingPage";
import SpellingPage from "./views/exercise/SpellingPage";
import GrammarPage from "./views/exercise/GrammarPage";
import FlashCardsPage from "./views/exercise/FlashCardsPage";

// const AddContentPage = lazyLoad("../views/AddContentPage", "AddContentPage");
// const AddContentPage = lazy(() =>
//   wait(0).then(() =>
//     import("./views/AddContentPage").then((module) => {
//       return { default: module.AddContentPage };
//     })
//   )
// );

function wait(time) {
  return new Promise((resolve) => {
    setTimeout(resolve, time);
  });
}

const ROLES = {
  User: 2001,
  Editor: 1984,
  Admin: 5150,
};

function App() {
  return (
    <AuthProvider>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route element={<PersistLogin />}>
            <Route index element={<HomePage />} />
            <Route path="about" element={<AboutPage />} />
            <Route path="note" element={<NotePage />} />
            <Route path="contactUs" element={<ContactUs />} />

            {/* Page to display language chapters, visible to all */}
            <Route path="login" element={<SigninPage />} />
            <Route path="register" element={<SignupPage />} />

            <Route path="language" element={<LanguagePage />} />

            <Route path="learn">
              <Route index element={<ContentPage />} />
              <Route path="chapter" element={<ChapterPage />} />
              <Route path="lesson" element={<LessonPage />} />
              {/* ?/:chapterID */}
            </Route>

            <Route path="content" element={<LayoutLearning />}>
              <Route path="text" element={<TextsPage />} />
              <Route path="dialogue" element={<DialoguePage />} />
              <Route path="dialogue/:id" element={<DialogueID />} />
            </Route>

            <Route path="search" element={<SearchPage />} />
            <Route path="sentences/:lessonID?" element={<SentencesPage />} />

            <Route path="exercise">
              <Route index element={<ExercisesMainPage />} />
              <Route path="matchwords" element={<MatchWordsPage />} />
              <Route path="reading" element={<ReadingPage />} />
              <Route path="spelling" element={<SpellingPage />} />
              <Route path="grammar" element={<GrammarPage />} />
              <Route path="flashcards" element={<FlashCardsPage />} />
            </Route>

            <Route path="review">
              <Route path="definitions" element={<DefinitionsPage />} />
              <Route path="words" element={<WordsPage />} />
              <Route path="wordlists" element={<WordListsPage />} />
            </Route>

            <Route path="unauthorized" element={<Unauthorized />} />

            {/* Settings page available to users */}
            <Route
              element={
                <RequireAuth
                  allowedRoles={[ROLES.User, ROLES.Editor, ROLES.Admin]}
                />
              }
            >
              <Route path="dashboard" element={<DashboardPage />} />
              <Route path="profile" element={<ProfilePage />} />
              <Route path="notebook" element={<UserNotesPage />} />
              <Route path="settings" element={<SettingsPage />} />
              <Route path="logout" element={<SignOutPage />} />
            </Route>

            {/* Admin page available to admin */}
            <Route element={<RequireAuth allowedRoles={[ROLES.Admin]} />}>
              <Route path="admin" element={<LayoutAdmin />}>
                <Route index element={<AdminPage />} />
                <Route path="chapters" element={<AdminChapters />} />
                <Route path="lessonEdit" element={<AdminLessonEditor />} />
                <Route path="lessons" element={<AdminLessons />} />
                <Route path="sections" element={<AdminSections />} />
                <Route path="definitions" element={<AdminDefinitions />} />
                <Route path="sentences" element={<AdminSentences />} />
                <Route path="dialogues" element={<AdminDialogues />} />
                <Route path="dialogues/edit" element={<AdminDialogueID />} />
                <Route path="words" element={<AdminWords />} />
                <Route path="wordlists" element={<AdminWordListsPage />} />
                <Route path="attributes" element={<AdminWordAttributes />} />
                <Route path="settings" element={<AdminSettings />} />
                <Route path="users" element={<AdminUsersPage />} />
                <Route path="images/upload" element={<ImageUpload />} />
              </Route>
            </Route>

            <Route
              element={
                <RequireAuth allowedRoles={[ROLES.Editor, ROLES.Admin]} />
              }
            >
              <Route path="edit"></Route>
            </Route>
          </Route>

          {/* catch all */}
          <Route path="*" element={<MissingPage />} />
        </Route>
      </Routes>
    </AuthProvider>
  );
}

export default App;
