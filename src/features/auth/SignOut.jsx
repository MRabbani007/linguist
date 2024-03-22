import { genDate } from "../../data/utils";
import useAuth from "../../hooks/useAuth";
import useLogout from "../../hooks/useLogout";

const SignOut = () => {
  const { auth } = useAuth();
  const logout = useLogout();
  const todayDate = genDate();

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
        <button className="btn btn-blue" onClick={() => logout()}>
          Sign Out
        </button>
      </div>
    </div>
  );
};

export default SignOut;
