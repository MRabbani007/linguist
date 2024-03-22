import { useReducer, useEffect, useState } from "react";
import useAxiosPrivate from "./useAxiosPrivate";
import axios from "axios";

const ACTIONS = {
  API_REQUEST: "api-request",
  FETCH_DATA: "fetch-data",
  ERROR: "error",
};

const initialState = {
  data: [],
  loading: false,
  error: null,
};

function reducer(state, { type, payload }) {
  switch (type) {
    case ACTIONS.API_REQUEST:
      return { ...state, data: [], loading: true };
    case ACTIONS.FETCH_DATA:
      return { ...state, data: payload.data, loading: false };
    case ACTIONS.ERROR:
      return { ...state, data: [], error: payload };
    default:
      return state;
  }
}

const useFetch = () => {
  const axiosPrivate = useAxiosPrivate();
  const [state, dispatch] = useReducer(reducer, initialState);
  const [URL, setURL] = useState("");
  const [DATA, setDATA] = useState({});

  const handleFetch = (url, data) => {
    setURL(url);
    setDATA(data);
  };

  useEffect(() => {
    if (URL === "" || !DATA) return;
    let isMounted = true;
    const controller = new AbortController();

    dispatch({ type: ACTIONS.API_REQUEST });

    const fetchServer = async () => {
      await axiosPrivate
        .post(URL, {
          signal: controller.signal,
          action: DATA,
        })
        .then((res) => {
          isMounted &&
            dispatch({ type: ACTIONS.FETCH_DATA, payload: res.data });
        })
        .catch((e) => {
          dispatch({ type: ACTIONS.ERROR, payload: e.error });
        });
    };

    fetchServer();

    return () => {
      isMounted = false;
      controller.abort();
    };
  }, [URL, DATA]);

  return { ...state, handleFetch };
};

export default useFetch;
