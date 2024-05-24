import { lazy } from "react";
import { Route, Routes, useNavigate } from "react-router-dom";
// Imported Styles
import "./styles/styles.css";
// generated from SASS
import "./styles/main.css";
// Imported Context
import { GlobalProvider } from "./context/GlobalState";
import { AuthProvider } from "./context/AuthProvider";
// Imported Components
import HomePage from "./views/HomePage";
import SigninPage from "./views/SigninPage";
import SignupPage from "./views/SignupPage";
import ChapterPage from "./views/ChapterPage";
import SettingsPage from "./views/SettingsPage";
import Unauthorized from "./views/Unauthorized";
import AdminPage from "./views/AdminPage";
// import AddContentPage from "./views/AddContentPage";
import Layout from "./features/layout/Layout";
import RequireAuth from "./features/auth/RequireAuth";
import PersistLogin from "./features/auth/PersistLogin";
import MissingPage from "./views/MissingPage";
// Import Error Handler
import { ErrorBoundary } from "react-error-boundary";
// import { lazyLoad } from "./data/lazyLoad";
import ErrorFallBack from "./features/auth/ErrorFallBack";
import SkeletonContentPage from "./skeletons/SkeletonContentPage";
import SectionsPage from "./views/SectionsPage";
import LessonPage from "./views/LessonPage";
import ExercisesMainPage from "./features/exercises/ExercisesMainPage";
import DefinitionsPage from "./views/summaryPages/DefinitionsPage";
import MatchWords from "./features/exercises/MatchWords";
import LanguagePage from "./views/userPages/LanguagePage";
import DashboardPage from "./views/DashboardPage";
import SearchPage from "./views/SearchPage";

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
  const navigate = useNavigate();

  return (
    <>
      <AuthProvider>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route element={<PersistLogin />}>
              <Route index element={<HomePage />} />

              {/* Page to display language chapters, visible to all */}
              <Route path="login" element={<SigninPage />} />
              <Route path="signup" element={<SignupPage />} />
              <Route path="language" element={<LanguagePage />} />
              <Route path="chapters" element={<ChapterPage />} />
              <Route path="sections" element={<SectionsPage />} />
              <Route path="lesson" element={<LessonPage />} />
              <Route path="search?/:search" element={<SearchPage />} />
              <Route path="exercise" element={<ExercisesMainPage />} />
              <Route path="matchwords" element={<MatchWords />} />
              <Route path="definitions" element={<DefinitionsPage />} />
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
                <Route path="settings" element={<SettingsPage />} />
              </Route>

              {/* Admin page available to admin */}
              <Route element={<RequireAuth allowedRoles={[ROLES.Admin]} />}>
                <Route path="admin" element={<AdminPage />} />
              </Route>

              <Route
                element={
                  <RequireAuth allowedRoles={[ROLES.Editor, ROLES.Admin]} />
                }
              ></Route>
            </Route>

            {/* catch all */}
            <Route path="*" element={<MissingPage />} />
          </Route>
        </Routes>
      </AuthProvider>
    </>
  );
}

export default App;
