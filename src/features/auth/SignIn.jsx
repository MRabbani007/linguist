import { useEffect, useRef, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
// Imported Context
// Imported Hooks
import useAuth from "../../hooks/useAuth";
import useInput from "../../hooks/useInput";
import useToggle from "../../hooks/useToggle";
// Imported Data
import { ACTIONS } from "../../data/actions";
// Imported Icons
import { FaRegUserCircle } from "react-icons/fa";
import axios from "../../api/axios";

const SignIn = () => {
  const { setAuth } = useAuth();

  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";

  // Set focus to username input on load
  const userRef = useRef();
  const errRef = useRef();

  const [user, resetUser, userAttribs] = useInput("user", "");
  const [pwd, setPwd] = useState("");
  const [errMsg, setErrMsg] = useState("");
  const [check, toggleCheck] = useToggle("persist", false);

  const [success, setSuccess] = useState(false);

  useEffect(() => {
    if (!success) {
      userRef.current.focus();
    }
  }, []);

  useEffect(() => {
    // Remove error message on user input
    setErrMsg("");
  }, [user, pwd]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      let response = await axios.post("/user/auth", {
        type: ACTIONS.USER_SIGNIN,
        payload: {
          username: user,
          password: pwd,
        },
      });

      if (response?.data?.status === "success") {
        const accessToken = response?.data?.accessToken;
        const roles = response?.data?.roles;
        setAuth({ user, roles, accessToken });
        resetUser();
        setPwd("");
        setSuccess(true);
        navigate(from, { replace: true });
        navigate("/", { state: { username: user } });
      } else {
        alert(response);
      }
    } catch (err) {
      if (!err?.response) {
        setErrMsg("No Server Response");
      } else if (err.response?.status === 400) {
        setErrMsg("Missing Username or Password");
      } else if (err.response?.status === 401) {
        setErrMsg("Unauthorized");
      } else {
        setErrMsg("Login Failed");
      }
      console.log(err);
      errRef.current.focus();
    }
  };

  return (
    <main className=" border-2 border-red-500">
      <section>
        <h1 className="p-3">Sign In</h1>
        <p
          ref={errRef}
          className={errMsg ? "errmsg" : "offscreen"}
          aria-live="assertive"
        >
          {errMsg}
        </p>
      </section>
      {success ? (
        <section className="text-slate-950">
          <p>You are now logged in!</p>
          <Link to="/">Go to Home Page</Link>
        </section>
      ) : (
        <form className="flex flex-col p-5 w-[400px]" onSubmit={handleSubmit}>
          <FaRegUserCircle className="text-[80px] mx-auto" />
          <label htmlFor="username" className="my-2">
            Username
          </label>
          <input
            type="text"
            id="username"
            placeholder="UserName"
            ref={userRef}
            autoComplete="off"
            {...userAttribs}
            required
          />
          <label htmlFor="password" className="my-2">
            Password
          </label>
          <input
            type="password"
            id="password"
            placeholder="Password"
            onChange={(e) => setPwd(e.target.value)}
            value={pwd}
            required
          />
          <button type="submit" className="btn btn-yellow mx-auto my-2">
            Signin
          </button>
          <div className="persistCheck">
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
        </form>
      )}
      <p className="my-2 mx-3">
        Create account
        <Link to="/signup" className="btn btn-blue ml-2">
          Signup
        </Link>
      </p>
    </main>
  );
};

export default SignIn;
