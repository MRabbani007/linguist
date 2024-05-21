import Linguist from "../assets/linguist.png";
import WorldLang from "../assets/world-language.png";

const HomePage = () => {
  return (
    <div className="flex flex-col gap-3 flex-1">
      <div className=" top-0 left-0 w-full h-[40vh] flex justify-center items-center bg-gradient-to-br from-zinc-600 to-zinc-400">
        <img src={Linguist} alt="Linguist" width={300} height={150} />
      </div>
      <div className="flex justify-evenly items-center max-w-[1000px] mx-auto">
        <img src={WorldLang} alt="World_Language" width={400} height={350} />
        <div className="flex-1 flex flex-col justify-center items-center">
          <p className="italic font-semibold text-xl">
            Learn languages fast & easy
          </p>
          <button className="py-2 px-4 bg-gradient-to-tr from-red-800 to-red-600 text-white hover:shadow-lg hover:shadow-zinc-500 duration-200 rounded-full my-4">
            Start Now
          </button>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
