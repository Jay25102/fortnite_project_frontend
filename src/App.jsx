import React, { useEffect, useState } from "react";
import { BrowserRouter } from "react-router-dom";
import { decodeToken } from "react-jwt";
import useLocalStorage from "./hooks/useLocalStorage";
import Navbar from "./navigation/Navbar";
import UserContext from "./context/UserContext";
import RouteManager from "./navigation/RouteManager";
import backendApi from "../api";
import "bootstrap/dist/css/bootstrap.css";
import Loading from "./common/Loading";

export const TOKEN_STORAGE_ID = "fornite-shop-token";

function App() {
  const [activeUser, setActiveUser] = useState(null);
  const [infoLoaded, setInfoLoaded] = useState(false);
  const [token, setToken] = useLocalStorage(TOKEN_STORAGE_ID);
  console.debug("App", "activeUser=", activeUser);

  /**
   * Whenever the token is updated, set the active user accordingly
   */
  useEffect(function loadUserInfo() {
    async function getActiveUser() {
      if (token) {
        try {
          let { username } = decodeToken(token);
          backendApi.token = token;
          let currentUser = await backendApi.getCurrentUser(username);
          setActiveUser(currentUser);
        }
        catch (err) {
          console.error("App loadUserInfo: problem loading", err);
          setActiveUser(null);
        }
      }
      setInfoLoaded(true);
    }
    setInfoLoaded(false);
    getActiveUser();
  }, [token])

  /**
   * Makes a call to the api to sign up a user with credentials
   * in signupData. Sets their token afterwards which effectively
   * logs them in. This is passed down to the signup form component.
   */
  async function signup(signupData) {
    try {
      let token = await backendApi.signup(signupData);
      setToken(token);
      return { success: true };
    } catch (errors) {
      console.error("signup failed", errors);
      return { success: false, errors };
    }
  }

  /**
   * Similar to signup and is passed down to the login form comp.
   */
  async function login(loginData) {
    try {
      let token = await backendApi.login(loginData);
      setToken(token);
      return { success: true };
    } catch (errors) {
      console.error("login failed", errors);
      return { success: false, errors };
    }
  }

  function logout() {
    setActiveUser(null);
    setToken(null);
  }

  if (!infoLoaded) return <Loading/>

  return (
    <BrowserRouter>
      <UserContext.Provider value={{activeUser, setActiveUser}}>
        <Navbar logout={logout}/>
        <RouteManager login={login} signup={signup}/>
      </UserContext.Provider>
    </BrowserRouter>
  )
}

export default App;