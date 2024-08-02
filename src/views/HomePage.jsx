import { Link } from "react-router-dom";
import WorldLang from "../assets/world-language.png";
import { useSelector } from "react-redux";
import { selectLanguage } from "../features/globals/globalsSlice";

const HomePage = () => {
  const language = useSelector(selectLanguage);

  return (
    <main>
      {/* <div className=" top-0 left-0 w-full h-[40vh] flex justify-center items-center bg-gradient-to-br from-orange-600/70 to-yellow-400/30">
        <img src={Linguist} alt="Linguist" width={300} height={150} />
      </div> */}
      <div>
        <img
          src={WorldLang}
          alt="World_Language"
          width={400}
          height={350}
          className="w-full max-w-[600px] mx-auto p-2"
        />
        <div className="flex-1 flex flex-col justify-center items-center">
          <p className="italic font-semibold text-xl text-destructive_foreground">
            Learn languages fast & easy
          </p>
          <div className="flex flex-col md:flex-row flex-wrap items-center md:gap-4 gap-2 mt-2">
            {!!language?.name ? (
              <>
                <Link
                  to="/content/chapters"
                  title={"Continue  " + language.name}
                  className="py-4 px-10 md:my-4 text-2xl bg-gradient-to-tr from-blue-700 to-blue-600 text-white hover:from-blue-600 hover:to-blue-500 duration-200 hover:shadow-lg hover:shadow-zinc-700"
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
              className="py-2 px-6 text-xl bg-gradient-to-tr from-red-800 to-red-600 text-white  hover:from-red-700 hover:to-red-500 duration-200 md:my-4 hover:shadow-lg hover:shadow-zinc-700"
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
