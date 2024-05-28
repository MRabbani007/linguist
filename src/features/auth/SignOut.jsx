import { useDispatch, useSelector } from "react-redux";
import { genDate } from "../../data/utils";
import { logOut, selectCurrentAuth } from "./authSlice";
import { useLogoutMutation } from "./authApiSlice";
import CardHeader from "../../components/CardHeader";
import { clearState } from "../globals/globalsSlice";

const SignOut = () => {
  const auth = useSelector(selectCurrentAuth);
  const [logout] = useLogoutMutation();
  const dispatch = useDispatch();

  const today = genDate();

  const handleLogout = () => {
    logout();
    dispatch(logOut());
    dispatch(clearState());
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
        <button className="input_submit">Sign Out</button>
      </form>
    </div>
  );
};

export default SignOut;
