import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  selectEditMode,
  selectLanguage,
  selectSiteLanguages,
  setLanguage,
} from "../../features/globals/globalsSlice";
import { useUpdateProfileMutation } from "../../features/profile/profileSlice";
import LanguageCard from "../../features/languages/LanguageCard";
import FormAddLanguage from "../../features/languages/FormAddLanguage";
import { PROFILE } from "../../data/actions";

export default function LanguagePage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const editMode = useSelector(selectEditMode);
  const language = useSelector(selectLanguage);
  const siteLanguages = useSelector(selectSiteLanguages);

  const [add, setAdd] = useState(false);

  const [updateProfile] = useUpdateProfileMutation();
  const handleSetLanguage = async (lang) => {
    dispatch(setLanguage(lang));
    await updateProfile({ type: PROFILE.LANGUAGE, data: lang?.id });
    navigate("/chapters");
  };

  return (
    <main>
      <header className="bg-gradient-to-r from-zinc-600 to-zinc-400 text-white">
        <h1>Select Language</h1>
      </header>
      <div>
        <div className="flex flex-wrap items-stretch justify-center gap-3">
          {Array.isArray(siteLanguages) &&
            siteLanguages.map((lang) => {
              return (
                <LanguageCard
                  language={lang}
                  key={lang.id}
                  selectedLang={language?.id}
                  handleSetLanguage={handleSetLanguage}
                />
              );
            })}
        </div>
        {editMode && (
          <button
            title="Add Language"
            onClick={() => setAdd(true)}
            className="btn btn-red w-fit mx-auto"
          >
            Add Language
          </button>
        )}
      </div>
      {add && <FormAddLanguage setAdd={setAdd} />}
    </main>
  );
}
