// Imported Hooks
import useAuth from "../hooks/useAuth";
// Imported Components
import SignIn from "../features/auth/SignIn";
import SignOut from "../features/auth/SignOut";
import { useSelector } from "react-redux";
import { selectCurrentAuth } from "../features/auth/authSlice";

const SigninPage = () => {
  const auth = useSelector(selectCurrentAuth);

  return <div className="">{auth?.user ? <SignOut /> : <SignIn />}</div>;
};

export default SigninPage;
