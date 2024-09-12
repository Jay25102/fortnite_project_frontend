import React, { useContext } from "react";
import { Route, Routes } from "react-router-dom";
import UserContext from "../context/UserContext";

import DailyShop from "../fortnite-items/DailyShop";
import Compendium from "../fortnite-items/Compendium";
import ItemInfoPage from "../fortnite-items/ItemInfoPage";
import RegisterForm from "../user/RegisterForm";
import LoginForm from "../user/LoginForm";
import UserInfo from "../user/UserInfo";

/**
 * Manages the routes for the website. Some of the routes are not accessible
 * if the user is not logged in.
 */
function RouteManager({ login, signup }) {
    const { activeUser } = useContext(UserContext);
    console.debug("RouteManager");

    if (!activeUser) {
        return (
            <Routes>
                <Route path="/compendium" element={<Compendium/>}/>
                <Route path="/dailyshop" element={<DailyShop/>}/>
                <Route path="/login" element={<LoginForm login={login}/>}/>
                <Route path="/register" element={<RegisterForm signup={signup}/>}/>
                <Route path="/item/:itemMainId" element={<ItemInfoPage/>}/>
                <Route path="/" to="/dailyshop"/>
                <Route path="*"to="/dailyshop"/>
            </Routes>
        )
    }

    return (
        <Routes>
            <Route path="/compendium" element={<Compendium/>}/>
            <Route path="/dailyshop" element={<DailyShop/>}/>
            <Route path="/login" element={<LoginForm login={login}/>}/>
            <Route path="/register" element={<RegisterForm signup={signup}/>}/>
            <Route path="/users/:username" element={<UserInfo/>}/>
            <Route path="/item/:itemMainId" element={<ItemInfoPage/>}/>
            <Route path="/" to="/dailyshop"/>
            <Route path="*"to="/dailyshop"/>
        </Routes>
    )
}

export default RouteManager;