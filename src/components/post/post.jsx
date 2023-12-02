import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
import FavoriteOutlinedIcon from "@mui/icons-material/FavoriteOutlined";
import TextsmsOutlinedIcon from "@mui/icons-material/TextsmsOutlined";
import ShareOutlinedIcon from "@mui/icons-material/ShareOutlined";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import { useNavigate } from "react-router-dom";
import Comments from "../comments/comments";
import { useContext, useEffect, useState } from "react";
import "./post.scss";
import { AuthContext } from "../../context/authContext";
import axios from "axios";
export const Post = ({ post }) => {
  const { currentUser } = useContext(AuthContext);

  const [commentOpen, setCommentOpen] = useState(false);

  const [reacted, setReacted] = useState(false);

  const API_ENDPOINT = import.meta.env.VITE_API_ENDPOINT;

  const handleLike = () => {
    setReacted(!reacted);
    //request to like post
  };

  const navigate = useNavigate();

  const [postOwner, setPostOwner] = useState({
    fullName: "",
    profilePicture: "",
  });

  useEffect(() => {
    const fetchPostOwner = async () => {
      try {
        const res = await axios.get(
          `${API_ENDPOINT}/api/user/getUserInfos?userId=${post.ownerId}`
        );
        setPostOwner(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchPostOwner();
  }, []);

  return (
    <div className="post">
      <div className="container">
        <div className="user">
          <div className="userInfo">
            <img
              src={postOwner.profilePicture}
              alt=""
              onClick={() => {
                navigate(`/profile/${post.ownerId}`);
                window.scrollTo(0, 0);
              }}
              style={{ cursor: "pointer" }}
            />
            <div className="details">
              <div
                onClick={() => {
                  navigate(`/profile/${post.ownerId}`);
                  window.scrollTo(0, 0);
                }}
                style={{
                  textDecoration: "none",
                  color: "inherit",
                  cursor: "pointer",
                }}
              >
                <span className="name">{postOwner.fullName}</span>
              </div>
              <span className="date">1 min ago</span>
            </div>
          </div>
          <MoreHorizIcon />
        </div>
        <div className="content">
          <p>{post.contentText}</p>
          <img src={post.contentImg} alt="" />
        </div>
        <div className="info">
          <div className="item heart" onClick={handleLike}>
            {reacted ? (
              <FavoriteOutlinedIcon />
            ) : (
              <FavoriteBorderOutlinedIcon />
            )}
            <span>12 Likes</span>
          </div>
          <div className="item" onClick={() => setCommentOpen(!commentOpen)}>
            <TextsmsOutlinedIcon />
            12 Comments
          </div>
          <div className="item">
            <ShareOutlinedIcon />
            Share
          </div>
        </div>
        {commentOpen && <Comments comments={null} postId={post.postId} />}
      </div>
    </div>
  );
};
