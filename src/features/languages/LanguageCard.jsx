import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectEditMode, setLanguage } from "../globals/globalsSlice";
import { Link, useNavigate } from "react-router-dom";
import { CiEdit } from "react-icons/ci";
import FormEditLanguage from "./FormEditLanguage";
import Russian from "../../assets/russian.png";
import Arabic from "../../assets/arabic.png";

export default function LanguageCard({
  language,
  selectedLang,
  handleSetLanguage,
}) {
  const editMode = useSelector(selectEditMode);

  const [edit, setEdit] = useState(false);

  const handleSelect = () => {
    handleSetLanguage(language);
  };

  return (
    <div className=" h-full">
      <h2 className="bg-red-600 text-white rounded-t-md p-2 border-2 border-red-600 flex items-center justify-between">
        {language?.title || "Title"}
        {editMode && (
          <button onClick={() => setEdit(true)}>
            <CiEdit size={28} />
          </button>
        )}
      </h2>
      <div className="w-[300px] border-2 border-red-600 p-2 flex flex-col items-center justify-center">
        {language?.image && (
          <img
            src={language.image === "russian.png" ? Russian : Arabic}
            className="object-contain h-[300px]"
          />
        )}
        {language?.subtitle ? <p className="">{language?.subtitle}</p> : null}
        {language?.id === selectedLang ? (
          <Link
            to={"/chapters"}
            title={`Start ${language.name}`}
            className="py-2 px-8 text-xl text-white bg-sky-600 hover:bg-sky-500 duration-200 rounded-full mx-auto mt-auto"
          >{`Start ${language.name}`}</Link>
        ) : (
          <button
            className={
              "py-2 px-8 text-xl text-white bg-red-600 hover:bg-red-500 duration-200 rounded-full mx-auto mt-auto"
            }
            title={`Select ${language.name}`}
            onClick={handleSelect}
          >
            Select
          </button>
        )}
      </div>
      <div className="p-2 bg-red-600 text-white rounded-b-md border-2 border-red-600">
        <p>{language.detail}</p>
      </div>
      {edit ? <FormEditLanguage language={language} setEdit={setEdit} /> : null}
    </div>
  );
}
