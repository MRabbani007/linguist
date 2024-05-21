import { Link } from "react-router-dom";
// Imported Icons
import { FiUser } from "react-icons/fi";
import { TbReportAnalytics } from "react-icons/tb";
import {
  IoAddCircleOutline,
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
import Offcanvas from "../navigation/Offcanvas";
import { MdKeyboardArrowRight } from "react-icons/md";
import UserDropDown from "../navigation/UserDropDown";
import AdminDropDown from "../navigation/AdminDropDown";
import { BsBook } from "react-icons/bs";
import { GiWeightLiftingUp } from "react-icons/gi";
import { PiBirdLight } from "react-icons/pi";

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
    <menu className="navbar-red">
      <span className="flex items-center justify-between gap-3">
        <button
          ref={sideBarButtonRef}
          onClick={() => handleSideBar(true)}
          className="lg:hidden"
        >
          <IoMenu size={34} />
        </button>
        <Link to="/" title="Home">
          <PiBirdLight size={34} />
          {/* <IoHomeOutline size={34} /> */}
        </Link>
        <Link to="/dashboard" title="Dashboard">
          <IoGridOutline size={34} />
        </Link>
        <Link to="/chapters" title="Learn">
          <IoBookOutline size={34} />
        </Link>
        <Link to="/exercise" title="Exercise">
          <GiWeightLiftingUp size={34} />
        </Link>
      </span>
      <span>
        {!user ? (
          <Link to="/login" title="User">
            <FiUser className="icon" />
          </Link>
        ) : (
          <div className=" relative">
            <button
              className="flex items-center gap-0"
              onClick={handleUserDropDown}
              title="User Menu"
            >
              {user}
              <FiUser className="icon" />
              <MdKeyboardArrowRight size={20} />
            </button>
            {viewUserDropDown && isAdmin && (
              <AdminDropDown ref={dropDownRefUser} />
            )}
            {viewUserDropDown && !isAdmin && (
              <UserDropDown ref={dropDownRefAdmin} />
            )}
          </div>
        )}
      </span>
      <Offcanvas
        viewSideBar={viewSideBar}
        handleSideBar={handleSideBar}
        ref={sideBarRef}
      />
    </menu>
  );
};

export default Navbar;
