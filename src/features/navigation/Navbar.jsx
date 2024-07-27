import { Link, useLocation } from "react-router-dom";
// Imported Icons
import { FiUser } from "react-icons/fi";
import { IoMenu } from "react-icons/io5";
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

  return (
    <>
      <div className="z-50 w-full text-red-600 relative font-medium ">
        <div className="flex justify-between items-center flex-1 max-w-[1024px] mx-auto py-4 px-4 md:px-0">
          <Link to="/" title="Home" className="font-bold text-2xl">
            Lingo
          </Link>
          <div className="flex items-center justify-between sm:gap-4 gap-2">
            <div className="sm:flex flex-row items-center justify-between hidden sm:gap-4 gap-2 border-green-300">
              <Link
                to="/dashboard"
                title="Dashboard"
                className={
                  (isActive("dashboard") ? "bg-zinc-100" : "") +
                  " p-2 rounded-lg duration-200"
                }
              >
                Dashboard
                {/* <IoGridOutline size={40} /> */}
              </Link>
              <div
                className={
                  (isActive("content") ? "bg-zinc-100" : "") +
                  " p-2 rounded-lg duration-200 relative"
                }
                onMouseOver={() => setViewLessonsMenu(true)}
                onMouseLeave={() => setViewLessonsMenu(false)}
              >
                <button
                  title="Learning"
                  onClick={() => setViewLessonsMenu(true)}
                >
                  Learning
                  {/* <SlBookOpen size={40} /> */}
                </button>
                <MenuLessons
                  ref={dropDownRefLessons}
                  viewDropDown={viewLessonsMenu}
                />
              </div>
              <Link
                to="/exercise"
                title="Exercise"
                className={
                  (isActive("exercise") ? "bg-zinc-100" : "") +
                  " p-2 rounded-lg duration-200"
                }
              >
                Practice
                {/* <IoBarbellOutline size={40} /> */}
              </Link>
            </div>
            <button onClick={() => setViewSearch((curr) => !curr)}>
              <IoIosSearch size={30} />
            </button>
            {/* <button
              ref={sideBarButtonRef}
              onClick={() => handleSideBar(true)}
              className="sm:hidden"
              title="Chapters & Lessons"
            >
              <PiBookOpenTextLight size={50} />
            </button> */}
            {!user ? (
              <Link to="/login" title="User" className="hidden sm:inline-block">
                <AiOutlineUser size={30} />
              </Link>
            ) : (
              <div
                className="relative"
                onMouseOver={() => setViewUserDropDown(true)}
                onMouseLeave={() => setViewUserDropDown(false)}
              >
                <button
                  className="hidden sm:flex items-center gap-0"
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
            )}
            <div
              className="relative"
              onMouseOver={() => setViewMobileMenu(true)}
              onMouseLeave={() => setViewMobileMenu(false)}
            >
              <button
                onClick={() => setViewMobileMenu(true)}
                className="sm:hidden"
              >
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
