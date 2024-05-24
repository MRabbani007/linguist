import { Link } from "react-router-dom";
// Imported Icons
import { FiUser } from "react-icons/fi";
import { TbReportAnalytics } from "react-icons/tb";
import {
  IoAddCircleOutline,
  IoBarbellOutline,
  IoBookOutline,
  IoGridOutline,
  IoHomeOutline,
  IoMenu,
  IoSettingsOutline,
} from "react-icons/io5";
import { useDispatch, useSelector } from "react-redux";
import { selectCurrentRoles, selectCurrentUser } from "../auth/authSlice";
import { FaUserGear } from "react-icons/fa6";
import { useEffect, useRef, useState } from "react";
import Offcanvas from "./Offcanvas";
import { MdKeyboardArrowRight } from "react-icons/md";
import UserDropDown from "./UserDropDown";
import AdminDropDown from "./AdminDropDown";
import { BsBook } from "react-icons/bs";
import { GiWeightLiftingUp } from "react-icons/gi";
import { PiBirdLight } from "react-icons/pi";
import { GoHome } from "react-icons/go";
import { CiDumbbell, CiGrid41 } from "react-icons/ci";
import { SlBookOpen } from "react-icons/sl";
import Logo from "../../assets/logo-red.png";
import Learn from "../../assets/learn.png";
import Dashboard from "../../assets/dashboard.png";
import Exercise from "../../assets/train.png";
import IMG_User from "../../assets/user.png";

const Navbar = () => {
  const user = useSelector(selectCurrentUser);
  const roles = useSelector(selectCurrentRoles);
  const isAdmin = !!roles?.find((role) => role === 5150);

  const [viewUserDropDown, setViewUserDropDown] = useState(false);
  const [viewSideBar, setViewSideBar] = useState(false);

  const sideBarRef = useRef();
  const sideBarButtonRef = useRef();
  const dropDownRefUser = useRef();
  const dropDownRefAdmin = useRef();

  const handleSideBar = (val = false) => {
    setViewSideBar(val);
  };

  const handleUserDropDown = (val = false) => {
    setViewUserDropDown(val);
  };

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
  };

  useEffect(() => {
    document.addEventListener("mousedown", closeSideBar);
    return () => {
      document.removeEventListener("mousedown", closeSideBar);
    };
  }, []);

  return (
    <div className="z-50 py-2 px-4 text-white flex justify-between bg-gradient-to-br from-red-700 to-red-600">
      <span className="flex items-center justify-between gap-4">
        <button
          ref={sideBarButtonRef}
          onClick={() => handleSideBar(true)}
          className="lg:hidden"
        >
          <IoMenu className="icon" />
        </button>
        <Link to="/" title="Home">
          {/* <GoHome size={40} /> */}
          <img src={Logo} alt="Linguist" width={100} />
          {/* <IoHomeOutline size={40} /> */}
        </Link>
        <Link to="/dashboard" title="Dashboard">
          {/* <IoGridOutline size={40} /> */}
          <img src={Dashboard} alt="Linguist" width={50} />
        </Link>
        <Link to="/chapters" title="Learn">
          <img src={Learn} alt="Linguist" width={50} />
          {/* <SlBookOpen size={40} /> */}
        </Link>
        <Link to="/exercise" title="Exercise">
          <img src={Exercise} alt="Linguist" width={50} />
          {/* <IoBarbellOutline size={40} /> */}
        </Link>
      </span>
      <span className="bg-transparent">
        {!user ? (
          <Link to="/login" title="User">
            {/* <FiUser size={40} /> */}
            <img src={IMG_User} alt="Linguist" width={50} />
          </Link>
        ) : (
          <div className=" relative">
            <button
              className="flex items-center gap-0"
              onClick={handleUserDropDown}
              title="User Menu"
            >
              {user}
              {/* <FiUser size={40} /> */}
              <img src={IMG_User} alt="Linguist" width={50} />
              {/* <MdKeyboardArrowRight size={20} /> */}
            </button>
            {isAdmin && (
              <AdminDropDown
                ref={dropDownRefUser}
                viewUserDropDown={viewUserDropDown}
              />
            )}
            {!isAdmin && <UserDropDown ref={dropDownRefAdmin} />}
          </div>
        )}
      </span>
      <Offcanvas
        viewSideBar={viewSideBar}
        handleSideBar={handleSideBar}
        ref={sideBarRef}
        setViewSideBar={setViewSideBar}
      />
    </div>
  );
};

export default Navbar;
