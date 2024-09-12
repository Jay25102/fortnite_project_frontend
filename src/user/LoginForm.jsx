import React, { useState } from "react";
import { Link } from "react-router-dom";
import Alert from "../common/Alert";
import { redirect } from "react-router-dom";
import "./Forms.css";

const BASE_API = "http://localhost:5000/users";

/**
 * Form for the user to input username and password. Does not directly
 * make the api call here, instead the login function where the
 * call is made, is passed in.
 */
function Login({login}) {
    const initialState = {
        username: "",
        password: ""
    }
    const [formData, setFormData] = useState(initialState);
    const [formErrors, setFormErrors] = useState([]);
    console.debug("Login", "login=", typeof login);

    function handleChange(e) {
        const { name, value } = e.target;
        setFormData(data => ({
            ...data,
            [name]: value
        }));
    }

    async function handleSubmit(e) {
        e.preventDefault();
        let result = await login(formData);
        if (result.success) {
            return redirect("/dailyshop");
        }
        else {
            setFormErrors(result.errors);
        }
    }

    return (
        <div className="userForm">
            <form onSubmit={handleSubmit}>
                <div>
                    <input 
                        name="username"
                        type="text"
                        className="form-control"
                        placeholder="username"
                        autoComplete="username"
                        onChange={handleChange}
                        value={formData.username}
                    ></input>
                </div>
                <div>
                    <input 
                        name="password"
                        type="password"
                        className="form-control"
                        placeholder="password"
                        autoComplete="current-password"
                        onChange={handleChange}
                        value={formData.password}
                    ></input>
                </div>

                {formErrors.length
                    ? <Alert type="danger" messages={formErrors}/>
                    : null}

                <button className="btn btn-primary" type="submit" onClick={handleSubmit}>Login</button>
                <div>Don't have an account? <Link to="/register">Register</Link></div>
            </form>
        </div>
    )
}

export default Login;