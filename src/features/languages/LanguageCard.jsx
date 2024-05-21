import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectEditMode, setLanguage } from "../globals/globalsSlice";
import { useNavigate } from "react-router-dom";
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
    <div className="">
      <h2 className="bg-red-600 text-white rounded-t-md p-2 border-2 border-red-600 flex items-center justify-between">
        {language?.title || "Title"}
        {editMode && (
          <button onClick={() => setEdit(true)}>
            <CiEdit size={28} />
          </button>
        )}
      </h2>
      <div className="w-[300px] border-2 border-red-600 p-2">
        {language?.image && (
          <img
            src={language.image === "russian.png" ? Russian : Arabic}
            className="object-contain"
          />
        )}
        <p className="">{language.subtitle}</p>
        <div className="w-full h-full flex items-end justify-center">
          <button
            className={
              language?.id === selectedLang
                ? "btn btn-blue mx-auto"
                : "btn btn-red mx-auto"
            }
            title={`Select ${language.name}`}
            onClick={handleSelect}
          >
            {language?.id === selectedLang ? "Selected" : "Select"}
          </button>
        </div>
      </div>
      <div className="p-2 bg-red-600 text-white rounded-b-md border-2 border-red-600">
        <p>{language.detail}</p>
      </div>
      {edit ? <FormEditLanguage language={language} setEdit={setEdit} /> : null}
    </div>
  );
}
