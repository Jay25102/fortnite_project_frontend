import React, { useState } from "react";
import Alert from "../common/Alert";
import { redirect } from "react-router-dom";
import "./Forms.css";

const BASE_API = "http://localhost:5000/users";

/**
 * Form for users to register with username, password, and email.
 * Api is not directly called here. Instead, the signup funciton
 * which includes the call in passed in and ran when the form submits.
 */
function Register({signup}) {
    const initialState = {
        username: "",
        password: "",
        email: "",
    }
    const [formData, setFormData] = useState(initialState);
    const [formErrors, setFormErrors] = useState([]);
    console.debug("Register", "signup=", typeof signup);

    function handleChange(e) {
        const { name, value } = e.target;
        setFormData(data => ({
            ...data,
            [name]: value
        }));
    }

    async function handleSubmit(e) {
        e.preventDefault();
        // console.log(`formdata= ${formData.username}`)
        let result = await signup(formData);
        console.log(result);
        if (result.success) {
            return redirect("/");
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
                <div>
                    <input 
                        name="email"
                        type="email"
                        className="form-control"
                        placeholder="email"
                        onChange={handleChange}
                        value={formData.email}
                    ></input>
                </div>

                {formErrors.length
                    ? <Alert type="danger" messages={formErrors}/>
                    : null}

                <button className="btn btn-primary" type="submit">Create account</button>
            </form>
        </div>
    )
}

export default Register;