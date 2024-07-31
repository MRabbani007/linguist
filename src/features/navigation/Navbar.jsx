import { Link, useLocation } from "react-router-dom";
// Imported Icons
import { FiUser } from "react-icons/fi";
import { IoGridOutline, IoMenu } from "react-icons/io5";
import { useDispatch, useSelector } from "react-redux";
import { selectCurrentRoles, selectCurrentUser } from "../auth/authSlice";
import { useEffect, useRef, useState } from "react";
import Offcanvas from "./Offcanvas";
import UserDropDown from "./UserDropDown";
import AdminDropDown from "./AdminDropDown";
import { PiBookOpenTextLight } from "react-icons/pi";
import Logo from "../../assets/logo-red.png";
import SidebarSearch from "./SidebarSearch";
import MobileMenu from "./MobileMenu";
import MenuLessons from "./MenuLessons";
import { AiOutlineUser } from "react-icons/ai";
import { IoIosSearch } from "react-icons/io";
import NavbarSearch from "./NavbarSearch";
import { FaRegUserCircle } from "react-icons/fa";
import Dropdown from "../components/Dropdown";

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
    url: "/content",
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

const Navbar = () => {
  const user = useSelector(selectCurrentUser);
  const roles = useSelector(selectCurrentRoles);
  const isAdmin = !!roles?.find((role) => role === 5150);
  const location = useLocation();

  const [viewMobileMenu, setViewMobileMenu] = useState(false);
  const [viewUserDropDown, setViewUserDropDown] = useState(false);
  const [viewSideBar, setViewSideBar] = useState(false);
  const [viewLessonsMenu, setViewLessonsMenu] = useState(false);
  const [viewSearch, setViewSearch] = useState(false);

  const sideBarRef = useRef();
  const sideBarButtonRef = useRef();
  const dropDownRefUser = useRef();
  const dropDownRefAdmin = useRef();
  const dropDownRefMobile = useRef();
  const dropDownRefLessons = useRef();

  const handleSideBar = (val = false) => {
    setViewSideBar(val);
  };

  const handleUserDropDown = (val = false) => {
    setViewUserDropDown(val);
  };

  const isActive = (page) => location.pathname.includes(page);

  const closeSideBar = (e) => {
    if (!sideBarRef.current?.contains(e.target)) {
      if (!sideBarButtonRef.current?.contains(e.target)) {
        handleSideBar(false);
      } else {
        handleSideBar(!viewSideBar);
      }
    }
    if (!dropDownRefUser?.current?.contains(e.target)) {
      handleUserDropDown();
    }
    if (!dropDownRefAdmin?.current?.contains(e.target)) {
      // handleUserDropDown();
    }
    if (!dropDownRefMobile?.current?.contains(e.target)) {
      setViewMobileMenu(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", closeSideBar);
    return () => {
      document.removeEventListener("mousedown", closeSideBar);
    };
  }, []);

  // max-w-[1024px]

  return (
    <>
      <div className="z-50 w-full text-accent relative font-medium bg-destructive">
        <div className="flex items-center flex-1 mx-auto py-4 px-4 relative">
          <Link to="/" title="Home" className="font-bold text-4xl">
            Lingo
          </Link>
          <div className="flex items-center sm:gap-4 gap-2 flex-1">
            <div className="hidden lg:flex flex-row items-center sm:gap-4 gap-2 ml-auto">
              <Dropdown
                label={"Lessons"}
                url={"/content/chapters"}
                items={lessonsDropDown}
              />
              <Dropdown label={"Words & Phases"} items={wordsDropDown} />
              <Link to={"#"}>Text & Dialogue</Link>
              <Dropdown
                label={"Practive"}
                url={"/exercise"}
                items={exerciseDropDown}
              />
            </div>
            {/* Search Button */}
            <button
              className="hidden lg:inline-block"
              onClick={() => setViewSearch((curr) => !curr)}
            >
              <IoIosSearch size={30} />
            </button>
            {!user ? (
              <div className="hidden lg:flex items-center gap-4 ml-auto ">
                <Link to="/login" title="Sign In" className="">
                  {/* <AiOutlineUser size={30} /> */}
                  Sign In
                </Link>
                <Link
                  to="/register"
                  title="Register"
                  className="bg-accent text-accent_foreground py-2 px-4 rounded-md"
                >
                  {/* <AiOutlineUser size={30} /> */}
                  Register
                </Link>
              </div>
            ) : (
              <div className="flex items-center gap-2 ml-auto">
                <Link
                  to="/dashboard"
                  title="Dashboard"
                  className={
                    (isActive("dashboard") ? "" : "") +
                    " p-2 rounded-lg duration-200"
                  }
                >
                  {/* Dashboard */}
                  <IoGridOutline size={30} />
                </Link>
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
                    <FaRegUserCircle size={40} />
                    {/* <AiOutlineUser  /> */}
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
            <div
              className="relative lg:hidden ml-auto"
              onMouseOver={() => setViewMobileMenu(true)}
              onMouseLeave={() => setViewMobileMenu(false)}
            >
              <button onClick={() => setViewMobileMenu(true)}>
                <IoMenu size={40} />
              </button>
              <MobileMenu
                ref={dropDownRefMobile}
                viewDropDown={viewMobileMenu}
              />
            </div>
          </div>
          <NavbarSearch viewSearch={viewSearch} />
        </div>
        <Offcanvas
          viewSideBar={viewSideBar}
          handleSideBar={handleSideBar}
          ref={sideBarRef}
          setViewSideBar={setViewSideBar}
        />
      </div>
    </>
  );
};

export default Navbar;
