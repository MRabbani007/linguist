import { useDispatch, useSelector } from "react-redux";
import { genDate } from "../../data/utils";
import { logOut, selectCurrentAuth } from "./authSlice";
import { useLogoutMutation } from "./authApiSlice";

const SignOut = () => {
  const auth = useSelector(selectCurrentAuth);
  const [logout] = useLogoutMutation();
  const dispatch = useDispatch();

  const todayDate = genDate();

  const handleLogout = () => {
    logout();
    dispatch(logOut());
  };

  return (
    <div>
      {/* Header */}
      <div className="">
        <p>Hello {auth.user},</p>
        <p className="btn btn-yellow my-2">
          {todayDate.day + ", " + todayDate.date + " " + todayDate.month}
        </p>
      </div>
      <div>
        <button className="btn btn-blue" onClick={handleLogout}>
          Sign Out
        </button>
      </div>
    </div>
  );
};

export default SignOut;
