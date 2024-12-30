import React, { useState } from "react";
import './login.css';
import { Link } from "react-router-dom";
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Box from '@mui/material/Box';
import LinearProgress from '@mui/material/LinearProgress';

const Login = ({ setLoginModal }) => {
    const [loginField, setLoginField] = useState({ username: "", password: "" });
    const [loader, setLoader] = useState(false);

    const handleOnChangeInput = (event, name) => {
        setLoginField({
            ...loginField, [name]: event.target.value
        });
    };

    const handleLoginFun = async () => {
        setLoader(true);
        const { username, password } = loginField;

        // Validate input fields
        if (!username || !password) {
            toast.error("Please fill in both username and password!");
            setLoader(false);
            return;
        }

        try {
            // Make login request
            const response = await axios.post(
                "http://localhost:4000/auth/login", 
                { userName: username, password },
                { withCredentials: true } // Ensure cookies are sent/received correctly
            );

            // Save token and user data to localStorage
            setLoader(false);
            localStorage.setItem("token", response.data.token);
            localStorage.setItem("userId", response.data.user._id);
            localStorage.setItem("userProfilePic", response.data.user.profilePic);

            toast.success("Login successful!");
            window.location.reload(); // Reload the page or redirect as needed
        } catch (err) {
            setLoader(false);
            toast.error(err.response?.data?.error || "Invalid credentials. Please try again!");
        }
    };

    return (
        <div className="login">
            <div className="login_card">
                <div className="titleCard_login">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        height="44"
                        viewBox="0 0 24 24"
                        width="64"
                        className="custom-youtube-icon"
                    >
                        <path
                            d="M21.8,8.001c-0.263-0.999-1.03-1.772-2.03-2.038C18.195,5.5,12,5.5,12,5.5s-6.195,0-7.77,0.463C3.23,6.231,2.463,7.002,2.2,8.001 C1.735,9.575,1.735,12,1.735,12s0,2.425,0.465,3.999c0.263,0.999,1.03,1.771,2.03,2.037C5.805,18.5,12,18.5,12,18.5 s6.195,0,7.77-0.463c1-0.266,1.768-1.038,2.03-2.037C22.265,14.425,22.265,12,22.265,12S22.265,9.575,21.8,8.001z"
                            fill="red"
                        />
                        <path d="M10,15L15,12L10,9V15Z" fill="white" />
                    </svg>
                    Login
                </div>

                <div className="loginCredentials">
                    <div className="userNameLogin">
                        <input
                            type="text"
                            placeholder="Username"
                            value={loginField.username}
                            onChange={(e) => handleOnChangeInput(e, "username")}
                            className="userNameLoginUserName"
                        />
                    </div>
                    <div className="userNameLogin">
                        <input
                            type="password"
                            placeholder="Password"
                            value={loginField.password}
                            onChange={(e) => handleOnChangeInput(e, "password")}
                            className="userNameLoginUserName"
                        />
                    </div>
                </div>

                <div className="login_buttons">
                    <div className="login-btn" onClick={handleLoginFun}>Login</div>
                    <Link to={'/signUp'} className="login-btn" onClick={() => setLoginModal(false)}> SignUp </Link>
                    <div className="login-btn" onClick={() => setLoginModal(false)}>Cancel</div>
                </div>

                {loader && <Box sx={{ width: '100%' }}><LinearProgress /></Box>}
            </div>

            <ToastContainer />
        </div>
    );
};

export default Login;
