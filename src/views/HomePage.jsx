import { Link } from "react-router-dom";
import Linguist from "../assets/linguist.png";
import WorldLang from "../assets/world-language.png";

const HomePage = () => {
  return (
    <div className="flex flex-col gap-3 flex-1">
      {/* <div className=" top-0 left-0 w-full h-[40vh] flex justify-center items-center bg-gradient-to-br from-orange-600/70 to-yellow-400/30">
        <img src={Linguist} alt="Linguist" width={300} height={150} />
      </div> */}
      <div className="flex flex-wrap-reverse justify-evenly items-center gap-6 max-w-[1000px] mx-auto">
        <img src={WorldLang} alt="World_Language" width={400} height={350} />
        <div className="flex-1 flex flex-col justify-center items-center">
          <p className="italic font-semibold text-xl">
            Learn languages fast & easy
          </p>
          <Link
            to="/language"
            title="Start Learning!"
            className="py-4 px-10 text-2xl bg-gradient-to-tr from-red-700 to-red-600 text-white  hover:from-red-600 hover:to-red-500 duration-200 rounded-full my-4"
          >
            Start Now
          </Link>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
