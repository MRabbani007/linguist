// Imported Hooks
import useAuth from "../hooks/useAuth";
// Imported Components
import SignIn from "../features/auth/SignIn";
import SignOut from "../features/auth/SignOut";
import { useSelector } from "react-redux";
import { selectCurrentAuth } from "../features/auth/authSlice";

const SigninPage = () => {
  const auth = useSelector(selectCurrentAuth);

  return auth?.user ? <SignOut /> : <SignIn />;
};

export default SigninPage;
