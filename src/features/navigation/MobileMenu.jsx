import React, { forwardRef } from "react";
import { FaUserGear } from "react-icons/fa6";
import { IoIosLogOut } from "react-icons/io";
import {
  IoAddCircleOutline,
  IoBarbellOutline,
  IoGridOutline,
  IoSettingsOutline,
} from "react-icons/io5";
import { SlBookOpen } from "react-icons/sl";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { selectEditMode } from "../globals/globalsSlice";

const MobileMenu = forwardRef(({ viewDropDown }, ref) => {
  const dispatch = useDispatch();
  const editMode = useSelector(selectEditMode);

  const handleToggleEditMode = () => {
    dispatch(toggleEditMode());
  };

  return (
    <ul
      ref={ref}
      className={
        (viewDropDown ? " " : " -translate-y-[20px] invisible opacity-0") +
        " text-zinc-800 bg-slate-200 mobile-menu sm:hidden"
      }
    >
      <li>
        <Link to="/admin" className="dropdown-item">
          <FaUserGear size={32} />
          <span>Admin Page</span>
        </Link>
      </li>
      <li>
        <button
          onClick={handleToggleEditMode}
          className={(editMode ? "text-green-600" : "") + " dropdown-item"}
        >
          <IoAddCircleOutline size={32} />
          <span>Toggle Edit</span>
        </button>
      </li>
      <li>
        <Link to="/dashboard" title="Dashboard" className="dropdown-item">
          <IoGridOutline size={34} />
          <span>Dashboard</span>
        </Link>
      </li>
      <li>
        <Link to="/chapters" title="Learn" className="dropdown-item">
          <SlBookOpen size={34} />
          <span>Lessons</span>
        </Link>
      </li>
      <li>
        <Link to="/exercise" title="Exercise" className="dropdown-item">
          <IoBarbellOutline size={38} />
          <span>Practice</span>
        </Link>
      </li>
      <li>
        <Link to={"/settings"} title="Settings" className="dropdown-item">
          <IoSettingsOutline size={36} />
          <span>Settings</span>
        </Link>
      </li>
      <li>
        <Link to={"/login"} title="Logout" className="dropdown-item">
          <IoIosLogOut size={36} />
          <span>Sign Out</span>
        </Link>
      </li>
    </ul>
  );
});

export default MobileMenu;
