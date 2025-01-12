import { Link, useLocation } from "react-router-dom";
import { IoGridOutline } from "react-icons/io5";
import { useSelector } from "react-redux";
import { selectCurrentUser } from "../auth/authSlice";
import UserDropDown from "./UserDropDown";
import MobileMenu from "./MobileMenu";
import NavbarSearch from "./NavbarSearch";
import Dropdown from "../components/Dropdown";

const wordsDropDown = [
  {
    label: "Words",
    title: "Words",
    url: "/review/words",
  },
  {
    label: "Sentences",
    title: "Sentences",
    url: "/sentences",
  },
];

const exerciseDropDown = [
  {
    label: "Match Words",
    title: "Match Words",
    url: "/exercise/matchwords",
  },
  {
    label: "Flash Cards",
    title: "Flash Cards",
    url: "/exercise/flashcards",
  },
];

const TextDialogueDropDown = [
  {
    label: "Texts",
    title: "Texts",
    url: "/content/text",
  },
  {
    label: "Dialogues",
    title: "Dialogues",
    url: "/content/dialogue",
  },
];

export default function Navbar() {
  const user = useSelector(selectCurrentUser);
  const location = useLocation();

  const isActive = (page: string) => location.pathname.includes(page);

  return (
    <div className="z-50 font-medium bg-destructive flex items-stretch justify-between px-4 py-2 my-0 relative">
      {/* Left Logo */}
      <Link
        to="/"
        title="Home"
        className="font-semibold text-2xl my-auto text-accent mr-auto"
      >
        Lingo
      </Link>

      {/* Middle Block */}
      <div className="absolute left-1/2 top-0 bottom-0 -translate-x-1/2 -translate-y-0 hidden justify-center lg:flex flex-row items-stretch sm:gap-4 gap-2 text-zinc-900">
        <Dropdown label={"Learn"} url={"/learn"} items={[]} />
        <Dropdown label={"Words & Phases"} items={wordsDropDown} />
        <Dropdown label={"Text & Dialogue"} items={TextDialogueDropDown} />
        <Dropdown
          label={"Practice"}
          url={"/exercise"}
          items={exerciseDropDown}
        />
        <NavbarSearch />
      </div>

      {/* Right Block */}
      <div className="flex items-center sm:gap-4 gap-2">
        {!user ? (
          <div className="hidden lg:flex items-center gap-4">
            <Link to="/login" title="Sign In" className="">
              {/* <AiOutlineUser size={30} /> */}
              Sign In
            </Link>
            <Link
              to="/register"
              title="Register"
              className="bg-accent text-accent_foreground py-2 px-4 rounded-md"
            >
              Register
            </Link>
          </div>
        ) : (
          <div className="flex items-center gap-2">
            {/* Dashboard */}
            <Link
              to="/dashboard"
              title="Dashboard"
              className={
                (isActive("dashboard") ? "" : "") +
                " p-2 rounded-lg duration-200 hidden lg:inline-block"
              }
            >
              <IoGridOutline size={26} />
            </Link>
            {/* User menu */}
            <UserDropDown />
          </div>
        )}
        <div className="lg:hidden h-full my-auto flex items-center">
          <NavbarSearch />
        </div>
        <MobileMenu />
      </div>
    </div>
  );
}
