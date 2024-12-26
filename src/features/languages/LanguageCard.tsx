import { Link } from "react-router-dom";

export default function LanguageCard({
  language,
  selectedLang,
  handleSetLanguage,
}: {
  language: Language;
  selectedLang: string | null;
  handleSetLanguage: (lang: Language) => void;
}) {
  const handleSelect = () => {
    handleSetLanguage(language);
  };

  return (
    <div className=" h-full bg-gradient-to-b from-red-500 to-red-700 text-white rounded-xl flex flex-col items-center justify-center w-[300px] min-h-[200px] ">
      <h2 className="p-4 flex items-center justify-center font-semibold">
        {language?.title || "Title"}
      </h2>
      <div className="p-4 ">
        {language?.subtitle ? <p className="">{language?.subtitle}</p> : null}
        {language?.id === selectedLang ? (
          <Link
            to={"/learn"}
            title={`Start ${language.name}`}
            className="py-2 px-8 text-xl text-white bg-sky-600 hover:bg-sky-500 duration-200 rounded-full mx-auto mt-auto"
          >{`Start ${language.name}`}</Link>
        ) : (
          <button
            className={
              "py-2 px-6 text-xl bg-zinc-100 font-medium text-red-600 hover:bg-white rounded-full duration-200  mx-auto mt-auto"
            }
            title={`Select ${language.name}`}
            onClick={handleSelect}
          >
            Select
          </button>
        )}
      </div>
    </div>
  );
}
