import { useDispatch, useSelector } from "react-redux";
import { genDate } from "../../data/utils";
import { logOut, selectCurrentAuth } from "./authSlice";
import { useLogoutMutation } from "./authApiSlice";
import CardHeader from "../../components/CardHeader";

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
    <div className="w-fit my-4 mx-auto flex flex-col items-center gap-3">
      {/* Header */}
      <CardHeader />
      <div>
        <button className="btn btn-blue" onClick={handleLogout}>
          Sign Out
        </button>
      </div>
    </div>
  );
};

export default SignOut;
