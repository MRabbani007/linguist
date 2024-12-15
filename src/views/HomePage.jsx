import { Link } from "react-router-dom";
import WorldLang from "../assets/world-language.png";
import { useSelector } from "react-redux";
import { selectLanguage } from "../features/globals/globalsSlice";

const HomePage = () => {
  const language = useSelector(selectLanguage);

  return (
    <main className="p-0 m-0">
      <div className="flex-1 flex flex-col md:flex-row-reverse items-center justify-center gap-4">
        <div className="">
          <img
            src={WorldLang}
            alt="World_Language"
            width={400}
            height={350}
            className="w-full max-w-[600px] mx-auto"
          />
        </div>
        <div className="flex flex-col justify-center items-center">
          <p className="italic font-semibold text-xl text-destructive_foreground">
            Learn languages fast & easy
          </p>
          <div className="flex flex-col md:flex-row flex-wrap items-center md:gap-4 gap-2 mt-2">
            {!!language?.name ? (
              <>
                <Link
                  to="/learn"
                  title={"Continue  " + language.name}
                  className="py-2 px-4 text-base bg-gradient-to-tr from-blue-700 to-blue-600 text-white hover:from-blue-600 hover:to-blue-500 duration-200 hover:shadow-md hover:shadow-zinc-700"
                >
                  {"Continue  " + language.name}
                </Link>
                <span>
                  <i>
                    <u>or</u>
                  </i>
                </span>
              </>
            ) : null}

            <Link
              to="/language"
              title={!!language?.name ? "Select Language" : "Start Now"}
              className="py-2 px-4 text-base bg-gradient-to-tr from-red-800 to-red-600 text-white  hover:from-red-700 hover:to-red-500 duration-200 md:my-4 hover:shadow-md hover:shadow-zinc-700"
            >
              {!!language?.name ? "Select Language" : "Start Now"}
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
};

export default HomePage;
