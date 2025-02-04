import { Link } from "react-router-dom";
import WorldLang from "../assets/world-language.png";
import TreeImage from "../assets/tree_image.jpg";
import { useSelector } from "react-redux";
import { selectLanguage } from "../features/globals/globalsSlice";
import { DEFAULT_LANG } from "../lib/defaultLanguage";
import { motion } from "framer-motion";
import Flag_Russia from "../assets/flag_russia.png";
import Flag_USA from "../assets/flag_usa.png";
import Flag_UAE from "../assets/flag_uae.png";
import Flag_France from "../assets/flag_france.png";
import Flag_Spain from "../assets/flag_spain.png";
import Flag_Germany from "../assets/flag_germany.png";

export default function HomePage() {
  const language = useSelector(selectLanguage) ?? DEFAULT_LANG;

  const langs = [
    { label: "Russian", icon: Flag_Russia },
    { label: "English", icon: Flag_USA },
    { label: "Arabic", icon: Flag_UAE },
    { label: "French", icon: Flag_France },
    { label: "Spanish", icon: Flag_Spain },
    { label: "German", icon: Flag_Germany },
  ];

  return (
    <main className="p-0 m-0 gap-0">
      <div className="min-h-[80vh] relative flex-1 bg-gradient-to-b from-red-600/40 to-white flex flex-col items-center justify-center">
        <motion.img
          src={WorldLang}
          alt="World_Language"
          width={400}
          height={350}
          className="w-full max-w-[600px]"
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, ease: "easeOut" }}
        />
        <p className="italic font-semibold text-xl text-destructive_foreground">
          Learn languages fast & easy
        </p>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="flex flex-row flex-wrap items-center md:gap-4 gap-2 mt-2"
        >
          {!!language?.name ? (
            <>
              <Link
                to="/learn"
                title={"Continue  " + language.name}
                className="py-2 px-4 rounded-md text-sm bg-gradient-to-tr from-blue-700 to-blue-600 text-white duration-200 hover:shadow-md hover:shadow-zinc-700"
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
            className="py-2 px-4 rounded-md text-sm bg-gradient-to-tr from-red-800 to-red-600 text-white  hover:from-red-700 hover:to-red-500 duration-200 md:my-4 hover:shadow-md hover:shadow-zinc-700"
          >
            {!!language?.name ? "Select Language" : "Start Now"}
          </Link>
        </motion.div>
      </div>
      <div className="h-screen relative bg-red-600/40 flex flex-col items-center justify-center gap-6">
        <div className="custom-wave absolute top-0 left-0 w-full overflow-hidden ">
          <svg
            data-name="Layer 1"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 1200 120"
            preserveAspectRatio="none"
          >
            <path
              d="M985.66,92.83C906.67,72,823.78,31,743.84,14.19c-82.26-17.34-168.06-16.33-250.45.39-57.84,11.73-114,31.07-172,41.86A600.21,600.21,0,0,1,0,27.35V120H1200V95.8C1132.19,118.92,1055.71,111.31,985.66,92.83Z"
              className="fill-white"
            ></path>
          </svg>
        </div>
        {/* <div className="custom-wav rotate-180 absolute top-0 left-0 w-full overflow-hidden ">
          <svg
            data-name="Layer 1"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 1200 120"
            preserveAspectRatio="none"
          >
            <path
              className="fill-red-600/20"
              d="M985.66,92.83C906.67,72,823.78,31,743.84,14.19c-82.26-17.34-168.06-16.33-250.45.39-57.84,11.73-114,31.07-172,41.86A600.21,600.21,0,0,1,0,27.35V120H1200V95.8C1132.19,118.92,1055.71,111.31,985.66,92.83Z"
            ></path>
          </svg>
        </div> */}
        <div className="font-bold text-white text-lg  max-w-[1024px] bg-gradient-to-r from-red-600/80 to-red-600 py-2 px-8 rounded-full">
          Popular Languages
        </div>
        <div className="px-8 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 w-full max-w-[1024px] text-center font-medium text-zinc-800">
          {langs.map((item) => (
            <button
              key={item.label}
              className="py-2 px-4 bg-white rounded-lg hover:bg-zinc-50 hover:shadow-md hover:shadow-zinc-400 duration-200 flex items-center justify-center gap-2"
            >
              <img src={item?.icon} alt={item.label} className="w-12 h-10" />
              <span>{item.label}</span>
            </button>
          ))}
        </div>
      </div>
      <div className="min-h-screen relative bg-lime-800/10 flex flex-col items-center justify-center gap-10 px-4 py-10 md:py-20">
        <p className="text-3xl font-extrabold text-lime-800">
          Learn More about our learning method
        </p>
        <div className="bg-white rounded-xl w-full max-w-[1024px] flex-1 shadow-[0_0_10px_10px] shadow-zinc-200 flex flex-col gap-6 items-center justify-center py-10 px-4">
          <img
            src={TreeImage}
            alt="learning method"
            width={400}
            height={350}
            className="w-full max-w-[600px] rounded-lg"
          />
          <p className="text-3xl font-extrabold text-lime-800/60">
            30 Minutes a Day That Will Change Your Life
          </p>
          <p className="text-xl font-extrabold text-zinc-800/60">
            All you need is the desire to learn. We take care of the rest.
          </p>
          <div className="space-y-2">
            <p className="lg:mx-32">
              Of all the digital language learning methods, ours is probably the
              one that most closely mimics the natural language acquisition
              process.
            </p>
            <p className="lg:mx-32">
              It stands out for its effectiveness, simplicity, and its ability
              to produce quick and tangible results.
            </p>
            <p className="lg:mx-32">
              You won't need to immediately understand complex grammatical
              structures. The explanations will come gradually.
            </p>
            <p className="lg:mx-32">
              All you need is to be truly available for 30 minutes a day (in one
              or two sessions) at least five days a week.
            </p>
          </div>
        </div>
      </div>
      <div className="min-h-screen bg-zinc-200 flex flex-col items-center justify-center gap-10 px-4 py-10 md:py-20">
        <p className="text-3xl font-extrabold text-zinc-900">Our Courses</p>
        <div className="bg-white rounded-xl w-full max-w-[1024px] flex-1 shadow-[0_0_10px_10px] shadow-zinc-300 flex flex-col gap-6 items-center justify-center py-10"></div>
      </div>
      <div className="min-h-screen bg-red-800/20 flex flex-col items-center justify-center gap-10 px-4 py-10 md:py-20">
        <p className="text-3xl font-extrabold text-red-800">
          Frequently asked questions
        </p>
        <div className="bg-white rounded-xl w-full max-w-[1024px] flex-1 shadow-[0_0_10px_10px] shadow-red-200 flex flex-col gap-6 items-center justify-center py-10"></div>
      </div>
    </main>
  );
}
