import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { logOut, selectCurrentAuth } from "../../features/auth/authSlice";
import { useLogoutMutation } from "../../features/auth/authApiSlice";
import { genDate } from "../../data/utils";
import { clearState } from "../../features/globals/globalsSlice";
import { useNavigate } from "react-router-dom";

export default function SignOutPage() {
  const auth = useSelector(selectCurrentAuth);
  const [logout] = useLogoutMutation();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const today = genDate();

  const handleLogout = async (e) => {
    e.preventDefault();
    // logout from server
    await logout();
    // clear auth state
    dispatch(logOut());
    // clear user data
    dispatch(clearState());
    navigate("/login");
  };

  return (
    <div className="wrapper">
      <form className="login_form" onSubmit={handleLogout}>
        <div className="login_header">
          <span>Sign Out</span>
        </div>
        <h2 className="text-white text-center">{auth.user}</h2>
        {/* <p className="bg-red-600 text-red-50 rounded-b-lg py-2 px-4 text-end">
        {today.day + ", " + today.date + " " + today.month}
      </p> */}
        <button className="input_submit" type="submit">
          Sign Out
        </button>
      </form>
    </div>
  );
}
