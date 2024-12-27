import { useState } from "react";
import { FaUserGear } from "react-icons/fa6";
import { IoIosLogOut } from "react-icons/io";
import {
  IoAddCircleOutline,
  IoBarbellOutline,
  IoDocumentTextOutline,
  IoGridOutline,
  IoMenu,
  IoSettingsOutline,
  IoTextOutline,
} from "react-icons/io5";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { selectCurrentRoles, selectCurrentUser } from "../auth/authSlice";
import { BsBlockquoteLeft, BsTextParagraph } from "react-icons/bs";
import { LuScrollText } from "react-icons/lu";
import { selectEditMode, toggleEditMode } from "../admin/adminSlice";
import { BiX } from "react-icons/bi";

const items = [
  { id: 20, type: "separator", title: "Learn", url: "" },
  {
    id: 10,
    label: "Chapters",
    title: "Chapters",
    url: "/learn",
    icon: <LuScrollText size={30} />,
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
  // {
  //   id: 11,
  //   label: "Lessons",
  //   title: "Lessons",
  //   url: "/content/lesson",
  //   icon: <LuText size={30} />,
  // },
  { id: 20, type: "separator", title: "Review", url: "" },
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
  { id: 20, type: "separator", title: "Practice", url: "" },
  {
    id: 16,
    label: "Exercise",
    title: "Exercise",
    url: "/exercise",
    icon: <IoBarbellOutline size={38} />,
  },
];

export default function MobileMenu() {
  const dispatch = useDispatch();
  const editMode = useSelector(selectEditMode);
  const user = useSelector(selectCurrentUser);
  const roles = useSelector(selectCurrentRoles);

  const [show, setShow] = useState(false);

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
    <div
      className="relative lg:hidden flex items-center justify-center"
      // onMouseOver={() => setShow(true)}
      // onMouseLeave={() => setShow(false)}
    >
      <button className="my-auto" onClick={() => setShow((curr) => !curr)}>
        <IoMenu size={40} />
      </button>
      {show && (
        <div
          className="fixed inset-0 bg-zinc-900/80 z-[100]"
          onClick={() => setShow(false)}
        />
      )}
      <nav
        className={
          (show ? "" : " -translate-x-full invisible opacity-0") +
          " text-zinc-800 bg-zinc-100 fixed top-0 bottom-0 left-0 duration-200 p-4 z-[120] w-[80vw] min-w-[250px] max-w-[400px] overflow-y-auto"
        }
      >
        <div className="flex items-center justify-between gap-4 mb-6">
          <Link
            to="/"
            title="Home"
            className="font-semibold text-2xl my-auto text-accent"
          >
            Lingo
          </Link>
          <button onClick={() => setShow(false)}>
            <BiX size={25} />
          </button>
        </div>
        {isAdmin ? (
          <>
            <div className="border-b-[1px] border-zinc-400 my-2">Admin</div>
            <button
              onClick={handleToggleEditMode}
              className={(editMode ? "text-green-600" : "") + " dropdown-item"}
            >
              <IoAddCircleOutline size={32} />
              <span>Toggle Edit</span>
            </button>
            <Link to="/admin" className="dropdown-item">
              <FaUserGear size={32} />
              <span>Admin Page</span>
            </Link>
          </>
        ) : null}
        {menuItems.map((item) =>
          item?.type === "separator" ? (
            <div className="border-b-[1px] border-zinc-400 my-2">
              {item.title}
            </div>
          ) : (
            <Link
              key={item?.id}
              to={item.url}
              title={item?.title}
              className="dropdown-item hover:bg-zinc-200 duration-150"
              onClick={() => setShow(false)}
            >
              {item?.icon}
              <span>{item?.label}</span>
            </Link>
          )
        )}
        <Link
          to={"/login"}
          title={isLoggedIn ? "Sign Out" : "Sign In"}
          className="dropdown-item hover:bg-zinc-200 duration-150"
          onClick={() => setShow(false)}
        >
          <IoIosLogOut size={36} />
          <span>{isLoggedIn ? "Sign Out" : "Sign In"}</span>
        </Link>
      </nav>
    </div>
  );
}
