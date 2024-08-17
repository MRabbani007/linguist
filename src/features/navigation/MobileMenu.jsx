import React, { forwardRef } from "react";
import { FaUserGear } from "react-icons/fa6";
import { IoIosLogOut } from "react-icons/io";
import {
  IoAddCircleOutline,
  IoBarbellOutline,
  IoDocumentTextOutline,
  IoGridOutline,
  IoSettingsOutline,
  IoTextOutline,
} from "react-icons/io5";
import { SlBookOpen } from "react-icons/sl";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { selectEditMode, toggleEditMode } from "../globals/globalsSlice";
import { selectCurrentRoles, selectCurrentUser } from "../auth/authSlice";
import { BsBlockquoteLeft, BsTextParagraph } from "react-icons/bs";
import { LuScrollText, LuText } from "react-icons/lu";

const items = [
  {
    id: 16,
    label: "Exercise",
    title: "Exercise",
    url: "/exercise",
    icon: <IoBarbellOutline size={38} />,
  },
  {
    id: 10,
    label: "Chapters",
    title: "Chapters",
    url: "/content/chapters",
    icon: <LuScrollText size={30} />,
  },
  {
    id: 11,
    label: "Lessons",
    title: "Lessons",
    url: "/content/lesson",
    icon: <LuText size={30} />,
  },
  {
    id: 12,
    label: "Words",
    title: "Words",
    url: "/review/words",
    icon: <IoTextOutline size={32} />,
  },
  {
    id: 13,
    label: "Sentences",
    title: "Sentences",
    url: "/sentences",
    icon: <BsTextParagraph size={32} />,
  },
  {
    id: 14,
    label: "Texts",
    title: "Texts",
    url: "/content/text",
    icon: <IoDocumentTextOutline size={32} />,
  },
  {
    id: 15,
    label: "Dialogues",
    title: "Dialogues",
    url: "/content/dialogue",
    icon: <BsBlockquoteLeft size={32} />,
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

  const menuItems = isLoggedIn
    ? [
        {
          id: 1,
          label: "Dashboard",
          title: "Dashboard",
          url: "/dashboard",
          icon: <IoGridOutline size={34} />,
        },
        ...items,
        {
          id: 5,
          label: "Settings",
          title: "Settings",
          url: "/settings",
          icon: <IoSettingsOutline size={36} />,
        },
      ]
    : items;

  return (
    <ul
      ref={ref}
      className={
        (viewDropDown ? " " : " -translate-y-[20px] invisible opacity-0") +
        " text-zinc-800 bg-slate-200 mobile-menu"
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
      {menuItems.map((item) => (
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
