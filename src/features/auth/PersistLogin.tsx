import { Outlet } from "react-router-dom";
import { useEffect } from "react";
import useLocalStorage from "../../hooks/useLocalStorage";
import { useDispatch, useSelector } from "react-redux";
import { selectCurrentToken, setCredentials } from "./authSlice";
import { useRefreshMutation } from "./authApiSlice";
import ReactLoading from "react-loading";
import { FetchBaseQueryError } from "@reduxjs/toolkit/query";
import { SerializedError } from "@reduxjs/toolkit";

export default function PersistLogin() {
  const accessToken = useSelector(selectCurrentToken);
  const [persist] = useLocalStorage("persist", false);

  const [refresh, { isLoading }] = useRefreshMutation();
  const dispatch = useDispatch();

  useEffect(() => {
    let isMounted = true;

    const verifyRefreshToken = async () => {
      try {
        const response:
          | { data: any }
          | { error: FetchBaseQueryError | SerializedError } = (await refresh(
          null
        )) as { data: any };

        if (response && Object.keys(response).includes("data")) {
          const userData = response?.data;

          dispatch(
            setCredentials({
              ...userData,
              token: userData.accessToken,
            })
          );
        }
      } catch (err) {
        // console.error(err);
      } finally {
        isMounted; //&& setIsLoading(false);
      }
    };

    // persist added here AFTER tutorial video
    // Avoids unwanted call to verifyRefreshToken
    !accessToken && persist ? verifyRefreshToken() : null; // setIsLoading(false);

    return () => {
      isMounted = false;
    };
  }, []);

  // !persist ? (
  //   <Outlet />
  // ) :

  return (
    <>
      {isLoading ? (
        <main className="flex-1 items-center justify-center">
          <header className="text-zinc-800 font-medium justify-center">
            <h1>
              Welcome to <span className="text-red-700 font-bold">Lingo</span>!
            </h1>
          </header>
          <div className="">
            <p className="mb-6">Connecting to server</p>
            <ReactLoading
              type={"spin"}
              color={"#000"}
              height={"50px"}
              width={"50px"}
              className="mx-auto"
            />
          </div>
        </main>
      ) : (
        <Outlet />
      )}
    </>
  );
}
