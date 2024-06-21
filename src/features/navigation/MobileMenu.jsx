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
import { selectEditMode, toggleEditMode } from "../globals/globalsSlice";
import { selectCurrentRoles, selectCurrentUser } from "../auth/authSlice";
import { BsTextParagraph } from "react-icons/bs";

const items = [
  {
    id: 1,
    label: "Dashboard",
    title: "Dashboard",
    url: "/dashboard",
    icon: <IoGridOutline size={34} />,
  },
  {
    id: 2,
    label: "Learn",
    title: "Lessons",
    url: "/chapters",
    icon: <SlBookOpen size={34} />,
  },
  {
    id: 3,
    label: "Sentences",
    title: "Sentences",
    url: "/sentences",
    icon: <BsTextParagraph size={32} />,
  },
  {
    id: 4,
    label: "Exercise",
    title: "Exercise",
    url: "/exercise",
    icon: <IoBarbellOutline size={38} />,
  },
  {
    id: 5,
    label: "Settings",
    title: "Settings",
    url: "/settings",
    icon: <IoSettingsOutline size={36} />,
  },
];

const MobileMenu = forwardRef(({ viewDropDown }, ref) => {
  const dispatch = useDispatch();
  const editMode = useSelector(selectEditMode);
  const user = useSelector(selectCurrentUser);
  const roles = useSelector(selectCurrentRoles);

  const handleToggleEditMode = () => {
    dispatch(toggleEditMode());
  };

  const isAdmin = roles && roles.includes(5150);
  const isLoggedIn = !!user;

  return (
    <ul
      ref={ref}
      className={
        (viewDropDown ? " " : " -translate-y-[20px] invisible opacity-0") +
        " text-zinc-800 bg-slate-200 mobile-menu sm:hidden"
      }
    >
      {isAdmin ? (
        <>
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
            <Link to="/admin" className="dropdown-item">
              <FaUserGear size={32} />
              <span>Admin Page</span>
            </Link>
          </li>
        </>
      ) : null}
      {items.map((item) => (
        <li key={item?.id}>
          <Link to={item.url} title={item?.title} className="dropdown-item">
            {item?.icon}
            <span>{item?.label}</span>
          </Link>
        </li>
      ))}
      <li>
        <Link
          to={"/login"}
          title={isLoggedIn ? "Sign Out" : "Sign In"}
          className="dropdown-item"
        >
          <IoIosLogOut size={36} />
          <span>{isLoggedIn ? "Sign Out" : "Sign In"}</span>
        </Link>
      </li>
    </ul>
  );
});

export default MobileMenu;
