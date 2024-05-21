import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  selectEditMode,
  selectLanguage,
  setLanguage,
} from "../../features/globals/globalsSlice";
import { selectCurrentUser } from "../../features/auth/authSlice";
import {
  useLazyGetProfileQuery,
  useUpdateProfileMutation,
} from "../../features/profile/profileSlice";
import LanguageCard from "../../features/languages/LanguageCard";
import FormAddLanguage from "../../features/languages/FormAddLanguage";
import { axiosPrivate } from "../../api/axios";
import { PROFILE } from "../../data/actions";

export default function LanguagePage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const editMode = useSelector(selectEditMode);
  const language = useSelector(selectLanguage);
  const user = useSelector(selectCurrentUser);

  const [languages, setLanguages] = useState([]);
  const [add, setAdd] = useState(false);

  const [getProfile, { data: userProfile, isLoading, isSuccess }] =
    useLazyGetProfileQuery();

  const [updateProfile] = useUpdateProfileMutation();
  const handleSetLanguage = async (lang) => {
    await updateProfile({ type: PROFILE.LANGUAGE, data: lang?.id });
    dispatch(setLanguage(lang));
  };

  const getLangauges = async () => {
    let response = await axiosPrivate.get("/languages");

    if (Array.isArray(response?.data)) {
      setLanguages(response.data);
    }
  };

  useEffect(() => {
    getLangauges();
  }, [add]);

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

  return (
    <div className="flex flex-col gap-3 justify-center flex-1">
      <div className="flex flex-wrap items-stretch justify-center gap-3">
        {languages.map((lang) => {
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
      {add && <FormAddLanguage setAdd={setAdd} />}
    </div>
  );
}
