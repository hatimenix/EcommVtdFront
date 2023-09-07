import { createContext, useContext, useState, useEffect } from "react";
import axiosClient from "../axios-client";

const StateContext = createContext({
  currentUser: null,
  token: null,
  setUser: () => {},
  setToken: () => {},
  setNotification: () => {},
  setIsLoading: () => {},
});

export const ContextProvider = ({ children }) => {
  const [user, setUser] = useState({});
  const [token, _setToken] = useState(localStorage.getItem("ACCESS_TOKEN"));
  const [refresh, _setRefresh] = useState(
    localStorage.getItem("REFRESH_TOKEN")
  );

  useEffect(() => {
    if (token) {
      axiosClient
        .get("auth/user/")
        .then(({ data }) => {
          setUser(data);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [token]);

  const setToken = (token) => {
    _setToken(token);
    if (token) {
      localStorage.setItem("ACCESS_TOKEN", token);
    } else {
      localStorage.removeItem("ACCESS_TOKEN");
    }
  };


  const setRefresh = (refresh) => {
    _setRefresh(refresh);
    if (refresh) {
      localStorage.setItem("REFRESH_TOKEN", refresh);
    } else {
      localStorage.removeItem("REFRESH_TOKEN");
    }
  };

  return (
    <StateContext.Provider
      value={{
        user,
        setUser,
        token,
        setToken,
        refresh,
        setRefresh,
      }}
    >
      {children}
    </StateContext.Provider>
  );
};
export const useStateContext = () => useContext(StateContext);
