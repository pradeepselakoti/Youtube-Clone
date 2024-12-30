import React, { useState } from "react";
import './signUp.css';
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast, ToastContainer } from 'react-toastify';
import Box from '@mui/material/Box';
import LinearProgress from '@mui/material/LinearProgress';

const SignUp = () => {
    const [uploadedImageUrl, setUploadedImageUrl] = useState("https://th.bing.com/th/id/OIP.Wy2uo_y-ttULYs4chLmqSAAAAA?rs=1&pid=ImgDetMain");
    const [signUpField, setSignUpField] = useState({
        "channelName": "",
        "userName": "",
        "password": "",
        "about": "",
        "profilePic": uploadedImageUrl
    });
    const [progressBar, setProgressBar] = useState(false);
    const navigate = useNavigate();

    // Handle input field changes
    const handleInputField = (event, name) => {
        setProgressBar(false); // Ensure loader is off when typing
        setSignUpField({
            ...signUpField,
            [name]: event.target.value
        });
    };

    // Handle image upload
    const uploadImage = async (e) => {
        const files = e.target.files;
        if (files.length === 0) {
            console.log("No file selected");
            return;
        }

        const data = new FormData();
        data.append('file', files[0]);
        data.append('upload_preset', 'Youtube-clone');

        try {
            setProgressBar(true); // Show loader during image upload
            console.log("Uploading image...");
            const response = await axios.post("https://api.cloudinary.com/v1_1/dmlyctgv2/image/upload", data);
            setProgressBar(false); // Hide loader after upload

            const imageUrl = response.data.url;
            console.log("Image uploaded successfully:", imageUrl);
            setUploadedImageUrl(imageUrl);
            setSignUpField({
                ...signUpField, 'profilePic': imageUrl
            });
        } catch (err) {
            console.error("Error uploading image:", err);
            setProgressBar(false); // Hide loader if upload fails
        }
    };

    // Handle sign-up process
    const handleSignup = async () => {
        setProgressBar(true); // Show loader during sign-up
        axios.post('http://localhost:4000/auth/signUp', signUpField)
            .then((res) => {
                setProgressBar(false); // Hide loader on success
                toast.success(res.data.message);
                navigate('/'); // Redirect to home page
            })
            .catch(err => {
                setProgressBar(false); // Hide loader on error
                toast.error("Error signing up");
            });
    };

    // Prevent form reload
    const handleSubmit = (e) => {
        e.preventDefault();
    };

    return (
        <div className="signUp">
            <div className="signup_card">
                {progressBar && (
                    <div className="signup_progressBar">
                        <Box sx={{ width: '100%' }}>
                            <LinearProgress />
                        </Box>
                    </div>
                )}
                <div className="signUp_title">
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
                    SignUp
                </div>
                <form onSubmit={handleSubmit} className="signUp_Inputs">
                    <input
                        type="text"
                        placeholder="Channel Name"
                        value={signUpField.channelName}
                        onChange={(e) => { handleInputField(e, "channelName") }}
                        className="signUp_Inputs_inp"
                    />
                    <input
                        type="text"
                        placeholder="User Name"
                        value={signUpField.userName}
                        onChange={(e) => { handleInputField(e, "userName") }}
                        className="signUp_Inputs_inp"
                    />
                    <input
                        type="password"
                        placeholder="Password"
                        value={signUpField.password}
                        onChange={(e) => { handleInputField(e, "password") }}
                        className="signUp_Inputs_inp"
                    />
                    <input
                        type="text"
                        placeholder="About Your Channel"
                        value={signUpField.about}
                        onChange={(e) => { handleInputField(e, "about") }}
                        className="signUp_Inputs_inp"
                    />
                    <div className="image_upload_signup">
                        <input type="file" onChange={(e) => { uploadImage(e) }} />
                        <div className="image_upload_signup_div">
                            <img src={uploadedImageUrl} className="image_default_signUp" alt="Profile" />
                        </div>
                    </div>
                    <div className="signUpBtns">
                        <button type="submit" className="signUpBtn" onClick={handleSignup}>Sign Up</button>
                        <Link to={'/'} className="signUpBtn">Home Page</Link>
                    </div>
                </form>
            </div>
            <ToastContainer />
        </div>
    );
};

export default SignUp;
