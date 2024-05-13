import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectEditMode, setLanguage } from "../globals/globalsSlice";
import { useNavigate } from "react-router-dom";
import { CiEdit } from "react-icons/ci";
import FormEditLanguage from "./FormEditLanguage";

export default function LanguageCard({ language }) {
  const editMode = useSelector(selectEditMode);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [edit, setEdit] = useState(false);

  const handleSelect = () => {
    dispatch(setLanguage(language));
    navigate("/chapters");
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
      <div className="min-h-32 w-[300px] border-2 border-red-600 p-2">
        <img src={"public/lang/" + language?.image} alt={language?.name} />
        <p className="">{language.subtitle}</p>
        <div className="w-full flex items-center justify-end">
          <button
            className="btn btn-red mx-auto"
            title={`Select ${language.name}`}
            onClick={handleSelect}
          >
            Select
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
