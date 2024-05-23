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
    <div className="w-fit my-4 mx-auto flex flex-col items-center justify-center gap-3 min-h-[70vh]">
      {/* Header */}
      <CardHeader />
      <div>
        <button
          className="py-2 px-6 rounded-full bg-red-600 hover:bg-red-500 text-zinc-50 mx-2 duration-200"
          onClick={handleLogout}
        >
          Sign Out
        </button>
      </div>
    </div>
  );
};

export default SignOut;
