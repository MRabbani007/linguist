import { FormEvent, useEffect, useRef, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";

// Imported Components
import { useDispatch } from "react-redux";
import { setCredentials } from "../../features/auth/authSlice";
import { useLoginMutation } from "../../features/auth/authApiSlice";
import useInput from "../../hooks/useInput";
import useToggle from "../../hooks/useToggle";

export default function SigninPage() {
  const navigate = useNavigate();

  const location = useLocation();
  const from = location.state?.from || "/";
  const search = location.state?.search || "";

  const [login] = useLoginMutation();
  const dispatch = useDispatch();

  // Set focus to username input on load
  const userRef = useRef<HTMLInputElement>();

  const [user, resetUser, userAttribs] = useInput("user", "");
  const [pwd, setPwd] = useState("");
  const [errMsg, setErrMsg] = useState("");
  const [check, toggleCheck] = useToggle("persist", false);

  const [type, setType] = useState("password");
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    if (!success) {
      // set focus to login username
      userRef?.current?.focus();
    }
  }, []);

  useEffect(() => {
    // Remove error message on user input
    setErrMsg("");
  }, [user, pwd]);

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();

    try {
      const response = await login({ username: user, password: pwd }).unwrap();

      if (response?.status === "success") {
        const userData = {
          user: response?.user,
          roles: response?.roles,
          token: response?.accessToken,
        };

        dispatch(setCredentials({ ...userData }));
        resetUser();
        setPwd("");
        setSuccess(true);
        navigate({
          pathname: from,
          search: search,
        });
      }
    } catch (err: any) {
      if (err?.status === "FETCH_ERROR") {
        setErrMsg("No Server Response");
      } else if (err?.status === 400) {
        setErrMsg("Missing Username or Password");
      } else if (err?.status === 401) {
        setErrMsg("Wrong user details");
      }
      // set focus to error
      // errRef?.current?.focus();
    }
  };

  return (
    <div className="wrapper">
      {/* <div className="fixed top-0 left-0 right-0 bottom-0 z-0 flex justify-center items-center">
      <img src={Background} alt="bg" className="object-cover w-full h-full" />
    </div> */}
      <form className="login_form" onSubmit={handleSubmit}>
        <div className="login_header">
          <span>Sign In</span>
        </div>
        <p
          // ref={errRef}
          className={errMsg ? "errmsg" : "offscreen"}
          aria-live="assertive"
        >
          {errMsg}
        </p>
        <div className="input_box">
          <input
            type="text"
            id="username"
            placeholder="UserName"
            className="input_field"
            ref={userRef}
            autoComplete="off"
            {...userAttribs}
            required
          />
          <label htmlFor="username" className="label">
            Username
          </label>
          <i className="bx bx-user icon"></i>
        </div>
        <div className="input_box">
          <input
            type={type}
            id="password"
            placeholder="Password"
            className="input_field"
            onChange={(e) => setPwd(e.target.value)}
            value={pwd}
            required
          />
          <label htmlFor="password" className="label">
            Password
          </label>
          <button
            type="button"
            onClick={() =>
              setType((curr) => (curr === "password" ? "text" : "password"))
            }
          >
            <i className="bx bx-lock-alt icon"></i>
          </button>
        </div>
        <div className="remember_forgot">
          <div className="remember_me">
            {/* <input type="checkbox" name="remember" id="remember" />
              <label htmlFor="remember">Remember me</label> */}
          </div>
          <div className="forgot">
            <a href="#">Forgot Password</a>
          </div>
        </div>
        <div>
          <button type="submit" className="input_submit my-2">
            Sign In
          </button>
        </div>
        <div className="persistCheck ml-4">
          <input
            type="checkbox"
            id="persist"
            onChange={toggleCheck}
            checked={check}
          />
          <label htmlFor="persist" className="ml-2">
            Trust This Device
          </label>
        </div>
        <div className="register mt-2">
          <span>Don't Have an account?</span>
          <Link
            to="/register"
            className="py-2 px-6 rounded-full bg-zinc-100 hover:bg-white text-zinc-950 mx-2 duration-200"
          >
            Sign Up
          </Link>
        </div>
      </form>
    </div>
  );
}
