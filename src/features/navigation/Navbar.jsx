import { Link, useLocation } from "react-router-dom";
import { IoGridOutline, IoMenu } from "react-icons/io5";
import { useSelector } from "react-redux";
import { selectCurrentRoles, selectCurrentUser } from "../auth/authSlice";
import { useEffect, useRef, useState } from "react";
import UserDropDown from "./UserDropDown";
import AdminDropDown from "./AdminDropDown";
import MobileMenu from "./MobileMenu";
import NavbarSearch from "./NavbarSearch";
import Dropdown from "../components/Dropdown";
import { AiOutlineUser } from "react-icons/ai";

const lessonsDropDown = [
  {
    label: "Chapters",
    title: "Chapters",
    url: "/content/chapter",
  },
  {
    label: "Lessons",
    title: "Lessons",
    url: "/content/lesson",
  },
  {
    label: "Content",
    title: "Content Overview",
    url: "/learn",
  },
];

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

const Navbar = () => {
  const user = useSelector(selectCurrentUser);
  const roles = useSelector(selectCurrentRoles);
  const isAdmin = !!roles?.find((role) => role === 5150);
  const location = useLocation();

  const [dark, setDark] = useState(false);

  const darkModeHandler = () => {
    setDark(!dark);
    document.body.classList.toggle("dark");
  };

  const [viewMobileMenu, setViewMobileMenu] = useState(false);
  const [viewUserDropDown, setViewUserDropDown] = useState(false);

  const dropDownRefUser = useRef();
  const dropDownRefAdmin = useRef();
  const dropDownRefMobile = useRef();

  const handleUserDropDown = (val = false) => {
    setViewUserDropDown(val);
  };

  const isActive = (page) => location.pathname.includes(page);

  return (
    <div className="z-50 relative font-medium bg-destructive">
      <div className="flex items-stretch justify-between px-4 py-2 my-0 relative">
        {/* Left Logo */}
        <Link
          to="/"
          title="Home"
          className="font-semibold text-2xl my-auto text-accent"
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
              <div
                className="relative"
                onMouseOver={() => setViewUserDropDown(true)}
                onMouseLeave={() => setViewUserDropDown(false)}
              >
                <button
                  className="hidden lg:flex items-center"
                  onClick={() => setViewUserDropDown(true)}
                  title="User"
                >
                  <AiOutlineUser size={30} />
                </button>
                {isAdmin ? (
                  <AdminDropDown
                    ref={dropDownRefUser}
                    viewUserDropDown={viewUserDropDown}
                  />
                ) : !!user ? (
                  <UserDropDown ref={dropDownRefAdmin} />
                ) : null}
              </div>
            </div>
          )}
          <div className="lg:hidden h-full my-auto flex items-center">
            <NavbarSearch />
          </div>
          <div
            className="relative lg:hidden flex items-center justify-center"
            onMouseOver={() => setViewMobileMenu(true)}
            onMouseLeave={() => setViewMobileMenu(false)}
          >
            <button className="my-auto" onClick={() => setViewMobileMenu(true)}>
              <IoMenu size={40} />
            </button>
            <MobileMenu ref={dropDownRefMobile} viewDropDown={viewMobileMenu} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
