import React, { useState, useEffect } from "react";
import './video.css';
import ThumbUpOffAltIcon from '@mui/icons-material/ThumbUpOffAlt';
import ThumbDownOffAltIcon from '@mui/icons-material/ThumbDownOffAlt';
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";
import axios from "axios";

const Video = () => {
    const [message, setMessage] = useState("");
    const [data, setData] = useState(null);
    const [videoUrl, setVideoUrl] = useState("");
    const { id } = useParams();
    const [comments, setComments] = useState([]);
    const [error, setError] = useState(""); // For handling errors

    // Fetch video data by ID
    const fetchVideoById = async () => {
        try {
            const response = await axios.get(`http://localhost:4000/api/getVideoById/${id}`);
            console.log(response.data.video);
            setData(response.data.video);
            setVideoUrl(response?.data?.video?.videoLink);
        } catch (err) {
            console.log(err);
            setError("Failed to load video.");
        }
    };

    // Fetch comments for the video by ID
    const getCommentByVideoId = async () => {
        try {
            const response = await axios.get(`http://localhost:4000/commentApi/comment/${id}`);
            console.log(response);
            setComments(response.data.comments);
        } catch (err) {
            console.log(err);
            setError("Failed to load comments.");
        }
    };

    useEffect(() => {
        fetchVideoById();
        getCommentByVideoId();
    }, [id]);

    // Handle comment submission
    const handleCommentSubmit = async () => {
        if (message.trim()) {
            try {
                await axios.post(`http://localhost:4000/commentApi/comment/${id}`, { message }, { withCredentials: true });
                setMessage(""); // Clear the input field after comment is posted
                getCommentByVideoId(); // Refresh the comments after posting
            } catch (err) {
                console.log(err);
                setError("Failed to post comment.");
            }
        }
    };

    return (
        <div className="video">
            {error && <div className="error-message">{error}</div>} {/* Display error if any */}
            <div className="videoPostSection">
                <div className="video_youtube">
                    {data && (
                        <video width="400" controls autoPlay className="video_youtube_video">
                            <source src={videoUrl} type="video/mp4" />
                            <source src={videoUrl} type="video/webm" />
                            Your browser does not support the video tag.
                        </video>
                    )}
                </div>
                <div className="video_youtubeAbout">
                    <div className="video_uTubeTitle">{data?.title}</div>
                    <div className="youtube_video_ProfileBlock">
                        <div className="youtube_video_ProfileBlock_left">
                            <Link to={`/user/${data?.user?._id}`} className="youtube_video_ProfileBlock_left_img">
                                <img
                                    className="youtube_video_ProfileBlock_left_image"
                                    src={data?.user?.profilePic}
                                    alt="User Avatar"
                                />
                            </Link>
                            <div className="youtubeVideo_subsView">
                                <div className="youtubePostProfileName">{data?.user?.channelName}</div>
                                <div className="youtubePostProfileSubs">{data?.user?.createdAt.slice(0, 10)}</div>
                            </div>
                            <div className="subscribeBtnYoutube">Subscribe</div>
                        </div>
                        <div className="youtube_video_likeBlock">
                            <div className="youtube_video_likeBlock_Like">
                                <ThumbUpOffAltIcon />
                                <div className="youtube_video_likeBlock_NoOfLikes">{data?.like}</div>
                            </div>
                            <div className="youtubeVideoDivider"></div>
                            <div className="youtube_video_likeBlock_Like">
                                <ThumbDownOffAltIcon />
                            </div>
                        </div>
                    </div>
                    <div className="youtube_video_About">
                        <div>{data?.createdAt.slice(0, 10)}</div>
                        <div>{data?.description}</div>
                    </div>

                    <div className="youtubeCommentSection">
                        <div className="youtubeCommentSectionTitle">{comments.length} Comment</div>
                        <div className="youtubeSelfComment">
                            <img
                                src="https://tse2.mm.bing.net/th?id=OIP.XU8AMLP5t-8efN0MF-mFMAHaE8&pid=Api&P=0&h=180"
                                alt=""
                                className="video_youtubeSelfCommentProfile"
                            />
                            <div className="addAComment">
                                <input
                                    type="text"
                                    value={message}
                                    onChange={(e) => setMessage(e.target.value)}
                                    className="addAcommentInput"
                                    placeholder="Add a Comment"
                                />
                                <div className="cancelSubmitComment">
                                    <div className="cancelComment" onClick={() => setMessage("")}>
                                        Cancel
                                    </div>
                                    <div className="cancelComment" onClick={handleCommentSubmit}>
                                        Comment
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="youtubeOthersComments">
                            {comments.map((item, index) => {
                                return (
                                    <div className="youtubeSelfComment" key={index}>
                                        <img
                                            src={item?.user?.profilePic}
                                            className="video_youtubeSelfCommentProfile"
                                            alt="user"
                                        />
                                        <div className="others_commentSection">
                                            <div className="others_commentSectionHeader">
                                                <div className="channelName_comment">{item?.user?.channelName}</div>
                                                <div className="commentTimingOthers">{item.createdAt.slice(0, 10)}</div>
                                            </div>
                                            <div className="otherCommentSectionComment">{item?.message}</div>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                </div>
            </div>

            <div className="videoSuggestions">
                {[...Array(4)].map((_, index) => (
                    <div className="videoSuggestionsBlock" key={index}>
                        <div className="video_suggetion_thumbnail">
                            <img
                                src="https://th.bing.com/th/id/OIP.8gLtXrl4KYPfPA6QyMnlUwHaEK?w=304&h=180&c=7&r=0&o=5&dpr=1.3&pid=1.7"
                                className="video_suggetion_thumbnail_img"
                                alt="suggested video"
                            />
                        </div>
                        <div className="video_suggetions_About">
                            <div className="video_suggetions_About_title">
                                T20 2024 Worldcup Final IND vs SA Last 5 overs #cricket #india
                            </div>
                            <div className="video_suggetions_About_Profile">Cricket 320</div>
                            <div className="video_suggetions_About_Profile">136K views . 1 day ago</div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Video;
