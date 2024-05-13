import { useEffect, useState } from "react";
import FormAddLanguage from "../features/languages/FormAddLanguage";
import { axiosPrivate } from "../api/axios";
import LanguageCard from "../features/languages/LanguageCard";
import { useSelector } from "react-redux";
import { selectEditMode } from "../features/globals/globalsSlice";

const HomePage = () => {
  const editMode = useSelector(selectEditMode);
  const [languages, setLanguages] = useState([]);
  const [add, setAdd] = useState(false);

  const getLangauges = async () => {
    let response = await axiosPrivate.get("/languages");

    if (Array.isArray(response?.data)) {
      setLanguages(response.data);
    }
  };

  useEffect(() => {
    getLangauges();
  }, [add]);

  return (
    <div className="flex flex-col gap-3 justify-center flex-1">
      <div className="flex flex-wrap items-stretch justify-center gap-3">
        {languages.map((lang) => {
          return <LanguageCard language={lang} key={lang.id} />;
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
};

export default HomePage;
