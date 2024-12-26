import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  selectLanguage,
  selectSiteLanguages,
  setLanguage,
} from "../../features/globals/globalsSlice";
// import { useUpdateProfileMutation } from "../../features/profile/profileSlice";
import LanguageCard from "../../features/languages/LanguageCard";
// import { PROFILE } from "../../data/actions";

export default function LanguagePage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const language = useSelector(selectLanguage);
  const siteLanguages = useSelector(selectSiteLanguages);

  // const [updateProfile] = useUpdateProfileMutation();
  const handleSetLanguage = async (lang: Language) => {
    dispatch(setLanguage(lang));
    // await updateProfile({ type: PROFILE.LANGUAGE, data: lang?.id });
    navigate("/learn");
  };

  // const getSummary = async () => {
  //   const summary = await axios.get(
  //     "/getsummary",
  //     {},
  //     { withCredentials: true },
  //     {
  //       headers: { Authorization: `Bearer ${token}` },
  //     }
  //   );
  // };

  // useEffect(() => {
  //   getSummary();
  // }, []);

  return (
    <main>
      <header className="text-primary justify-center">
        <h1 className="text-2xl md:text-4xl font-semibold text-wrap inline py-1 px-2 ">
          Select Language
        </h1>
      </header>
      <div className="flex-1 flex flex-wrap items-stretch justify-center gap-4">
        {Array.isArray(siteLanguages) &&
          siteLanguages.map((lang) => {
            return (
              <LanguageCard
                language={lang}
                key={lang.id}
                selectedLang={language?.id ?? null}
                handleSetLanguage={handleSetLanguage}
              />
            );
          })}
      </div>
    </main>
  );
}
