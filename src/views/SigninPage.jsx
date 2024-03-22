// Imported Hooks
import useAuth from "../hooks/useAuth";
// Imported Components
import SignIn from "../features/auth/SignIn";
import SignOut from "../features/auth/SignOut";

const SigninPage = () => {
  const { auth } = useAuth();

  return (
    <div className="flex-center user-section text-slate-950">
      {auth?.user ? <SignOut /> : <SignIn />}
    </div>
  );
};

export default SigninPage;
