import React, { useState, useEffect } from "react";
import './videoUpload.css';
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';

const VideoUpload = () => {
    const [inputField, setInputField] = useState({
        title: "",
        description: "",
        videoLink: "",
        thumbnail: "",
        videoType: ""
    });
    const [loader, setLoader] = useState(false);
    const navigate = useNavigate();

    // Handle input field changes
    const handleOnChangeInput = (event, name) => {
        setInputField({
            ...inputField,
            [name]: event.target.value
        });
    };

    // Upload image or video to Cloudinary
    const uploadImage = async (e, type) => {
        setLoader(true);
        const files = e.target.files;
        const data = new FormData();
        data.append('file', files[0]);
        data.append('upload_preset', 'Youtube-clone');

        try {
            const response = await axios.post(`https://api.cloudinary.com/v1_1/dmlyctgv2/${type}/upload`, data);
            const url = response.data.url;
            setLoader(false);

            let val = type === "image" ? "thumbnail" : "videoLink";
            setInputField({
                ...inputField,
                [val]: url
            });
        } catch (err) {
            setLoader(false);
            console.error("Error uploading", err);
        }
    };

    // Check if form is valid
    const isFormValid = () => {
        return inputField.title && inputField.videoLink;
    };

    // Handle video upload
    const handleSubmitFunc = async () => {
        if (!isFormValid()) {
            alert("Title and Video are required!");
            return;
        }

        try {
            // Replace with actual API URL, using http://localhost:4000/api/video
            const response = await axios.post('http://localhost:4000/api/video', inputField);
            console.log("Video uploaded successfully:", response.data);
            navigate('/'); 
        } catch (error) {
            console.error("Error uploading video:", error);
        }
    };

    // Authentication check
    useEffect(() => {
        let isLogin = localStorage.getItem("userId");
        if (!isLogin) {
            navigate('/'); // Redirect to login page if not authenticated
        }
    }, [navigate]);

    return (
        <div className="videoUpload">
            <div className="uploadBox">
                <div className="uploadVideoTitle">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        height="44"
                        viewBox="0 0 24 24"
                        width="34"
                        className="custom-youtube-icon"
                    >
                        <path
                            d="M21.8,8.001c-0.263-0.999-1.03-1.772-2.03-2.038C18.195,5.5,12,5.5,12,5.5s-6.195,0-7.77,0.463C3.23,6.231,2.463,7.002,2.2,8.001 C1.735,9.575,1.735,12,1.735,12s0,2.425,0.465,3.999c0.263,0.999,1.03,1.771,2.03,2.037C5.805,18.5,12,18.5,12,18.5 s6.195,0,7.77-0.463c1-0.266,1.768-1.038,2.03-2.037C22.265,14.425,22.265,12,22.265,12S22.265,9.575,21.8,8.001z"
                            fill="red"
                        />
                        <path d="M10,15L15,12L10,9V15Z" fill="white" />
                    </svg>
                    Video Upload
                </div>

                <div className="uploadForm">
                    <input
                        type="text"
                        placeholder="Title of video"
                        value={inputField.title}
                        onChange={(e) => handleOnChangeInput(e, "title")}
                        className="uploadFormInputs"
                    />
                    <input
                        type="text"
                        placeholder="Description"
                        value={inputField.description}
                        onChange={(e) => handleOnChangeInput(e, "description")}
                        className="uploadFormInputs"
                    />
                    <input
                        type="text"
                        placeholder="Category"
                        value={inputField.videoType}
                        onChange={(e) => handleOnChangeInput(e, "videoType")}
                        className="uploadFormInputs"
                    />
                    <div> Thumbnail
                        <input
                            type="file"
                            accept="image/*"
                            onChange={(e) => uploadImage(e, "image")}
                        />
                    </div>
                    <div> Video
                        <input
                            type="file"
                            accept="video/mp4,video/webm,video/*"
                            onChange={(e) => uploadImage(e, "video")}
                        />
                    </div>
                    {loader && (
                        <Box sx={{ display: 'flex', justifyContent: 'center', margin: '10px 0' }}>
                            <CircularProgress />
                        </Box>
                    )}
                </div>

                <div className="uploadBtns">
                    <div className="uploadBtn-form" onClick={handleSubmitFunc}>Upload</div>
                    <Link to={'/'} className="uploadBtn-form">Home</Link>
                </div>
            </div>
        </div>
    );
};

export default VideoUpload;
