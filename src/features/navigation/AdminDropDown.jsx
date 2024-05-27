import React, { forwardRef } from "react";
import { selectEditMode, toggleEditMode } from "../globals/globalsSlice";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { FaUserGear } from "react-icons/fa6";
import { IoAddCircleOutline, IoSettingsOutline } from "react-icons/io5";
import { IoIosLogOut } from "react-icons/io";

const AdminDropDown = forwardRef(({ viewUserDropDown }, ref) => {
  const dispatch = useDispatch();
  const editMode = useSelector(selectEditMode);

  const handleToggleEditMode = () => {
    dispatch(toggleEditMode());
  };

  return (
    <ul
      ref={ref}
      className={
        (viewUserDropDown ? " " : " -translate-y-[20px] invisible opacity-0") +
        " text-zinc-800 bg-slate-200 mobile-menu"
      }
    >
      <li>
        <Link to={"/login"} className="dropdown-item">
          <IoIosLogOut size={32} />
          <span>Sign Out</span>
        </Link>
      </li>
      <button
        onClick={handleToggleEditMode}
        className={(editMode ? "text-green-600" : "") + " dropdown-item"}
      >
        <IoAddCircleOutline size={32} />
        <span>Toggle Edit</span>
      </button>
      <Link to="/settings" className="dropdown-item">
        <IoSettingsOutline size={32} />
        <span>Settings</span>
      </Link>
      <Link to="/admin" className="dropdown-item">
        <FaUserGear size={32} />
        <span>Admin Page</span>
      </Link>
    </ul>
  );
});

export default AdminDropDown;
