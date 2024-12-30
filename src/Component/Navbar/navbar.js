import React, { useState, useEffect } from 'react';
import './navbar.css';
import MenuIcon from '@mui/icons-material/Menu';
import SearchIcon from '@mui/icons-material/Search';
import MicIcon from '@mui/icons-material/Mic';
import VideoCallIcon from '@mui/icons-material/VideoCall';
import NotificationsIcon from '@mui/icons-material/Notifications';
import { Link, useNavigate } from 'react-router-dom';
import Login from '../Login/login';
import axios from 'axios';  

const Navbar = ({ setSideNavbarFunc, sideNavbar }) => {
    const [userPic, setUserPic] = useState("https://th.bing.com/th/id/OIP.Wy2uo_y-ttULYs4chLmqSAAAAA?rs=1&pid=ImgDetMain");
    const [navbarModal, setNavbarModal] = useState(false);
    const navigate = useNavigate();
    const [login, setLogin] = useState(false);
    const [isLogedIn, setIsLogedIn] = useState(false);

    const handleClickModal = () => {
        setNavbarModal(prev => !prev);
    };

    const sideNavbarFunc = () => {
        setSideNavbarFunc(!sideNavbar);
    };

    const handleprofile = () => {
        let userId = localStorage.getItem("userId");
        navigate(`/user/${userId}`);
        setNavbarModal(false);
    };

    const setLoginModal = () => {
        setLogin(false);
    };

    const onclickOfOopUpOption = (button) => {
        setNavbarModal(false);

        if (button === "login") {
            setLogin(true);
        } else if (button === "logout") {
            localStorage.clear();
            getLogoutFun();
            setTimeout(() => {
                navigate('/');
                window.location.reload();
            }, 1000);
        }
    };

    const getLogoutFun = async () => {
        axios.post("http://localhost:4000/auth/logout", {}, { withCredentials: true })
            .then((res) => {
                console.log("Logged out successfully");
            }).catch(err => {
                console.log(err);
            });
    };

    useEffect(() => {
        let userProfilePic = localStorage.getItem("userProfilePic");
        setIsLogedIn(localStorage.getItem("userId") !== null ? true : false);
        if (userProfilePic !== null) {
            setUserPic(userProfilePic);
        }
    }, []);

    return (
        <div className="navbar">
            <div className="navbar-left">
                <div className="navbarHamberger" onClick={sideNavbarFunc}>
                    <MenuIcon sx={{ color: "white" }} />
                </div>
                <Link to={'/'} className="navbar_youtubeImg">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        height="34"
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
                    <div className="navbar_utubeTitle">YouTube</div>
                </Link>
            </div>

            <div className="navbar-middle">
                <div className="navbar_searchBox">
                    <input type='text' placeholder='Search' className='navbar_searchBoxInput' />
                    <div className='navbar_searchIconBox'>
                        <SearchIcon sx={{ fontSize: "28px", color: "white" }} />
                    </div>
                </div>
                <div className="navbar_mike">
                    <MicIcon sx={{ color: "white" }} />
                </div>
            </div>

            <div className='navbar-right'>
                <Link to={'/7676/upload'}>
                    <VideoCallIcon sx={{ fontSize: "30px", cursor: "pointer", color: 'white' }} />
                </Link>
                <NotificationsIcon sx={{ fontSize: "30px", cursor: "pointer", color: 'white' }} />
                <img onClick={handleClickModal} src={userPic} className='navbar-right-logo' alt='Logo' />

                {navbarModal &&
                    <div className='navbar-modal'>
                        {isLogedIn && <div className='navbar-modal-option' onClick={handleprofile}>Profile</div>}
                        {isLogedIn && <div className='navbar-modal-option' onClick={() => onclickOfOopUpOption("logout")}>Logout</div>}
                        {!isLogedIn && <div className='navbar-modal-option' onClick={() => onclickOfOopUpOption("login")}>Login</div>}
                    </div>
                }
            </div>

            {login && <Login setLoginModal={setLoginModal} />}
        </div>
    );
};

export default Navbar;
