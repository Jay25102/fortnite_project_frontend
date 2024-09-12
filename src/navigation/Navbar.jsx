import React, { useContext } from "react";
import { NavLink } from "react-router-dom";
import UserContext from "../context/UserContext";
import "./Navbar.css";

/**
 * Navbar component that shows different items depending on if the user is logged in.
 * Uses the UserContext to keep track of activeUser.
 */
function Navbar({ logout }) {
    const { activeUser } = useContext(UserContext);
    console.debug("Navbar");

    function displayLoggedIn() {
        return (
            <div>
                <ul className="navbar-nav me-auto">
                    <li className="nav-item mr-4">
                        <NavLink className="nav-link" to={`/users/${activeUser.username}`}>{activeUser.username}</NavLink>
                    </li>
                    <li className="nav-item mr-4">
                        <NavLink className="nav-link" to="/" onClick={logout}>Logout</NavLink>
                    </li>
                </ul>
            </div>
        )
    }

    function displayLoggedOut() {
        return (
            <div>
                <ul className="navbar-nav ml-auto">
                    <li className="nav-item mr-4">
                        <NavLink className="nav-link" to="/login">Login/Signup</NavLink>
                    </li>
                </ul>
            </div>
        )
    }

    return (
        <nav className="Navbar navbar navbar-expand-md bg-light">
            <div className="navbar-brand">Fortnite Shop Compendium</div>
            <ul className="navbar-nav mx-auto">
                <li className="nav-item mr-4">
                    <NavLink className="nav-link" to="/dailyshop">Daily Shop</NavLink>
                </li>
                <li className="nav-item mr-4">
                    <NavLink className="nav-link" to="/compendium">Compendium</NavLink>
                </li>
            </ul>
            {activeUser ? displayLoggedIn() : displayLoggedOut()}
        </nav>
    )
}

export default Navbar;