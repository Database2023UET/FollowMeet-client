import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
import FavoriteOutlinedIcon from "@mui/icons-material/FavoriteOutlined";
import TextsmsOutlinedIcon from "@mui/icons-material/TextsmsOutlined";
import ShareOutlinedIcon from "@mui/icons-material/ShareOutlined";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import { useNavigate } from "react-router-dom";
import Comments from "../comments/comments";
import { useContext, useState } from "react";
import "./Post.scss";
import { AuthContext } from "../../context/authContext";

export const Post = ({ post }) => {
  const { currentUser } = useContext(AuthContext);

  const [commentOpen, setCommentOpen] = useState(false);

  const [liked, setLiked] = useState(false);

  const handleLike = () => {
    setLiked(!liked);
    //request to like post
  };

  const navigate = useNavigate();

  return (
    <div className="post">
      <div className="container">
        <div className="user">
          <div className="userInfo">
            <img
              src={post.profilePicture}
              alt=""
              onClick={() => {
                navigate(`/profile/${post.id}`);
                window.scrollTo(0, 0);
              }}
              style={{ cursor: "pointer" }}
            />
            <div className="details">
              <div
                onClick={() => {
                  navigate(`/profile/${post.id}`);
                  window.scrollTo(0, 0);
                }}
                style={{
                  textDecoration: "none",
                  color: "inherit",
                  cursor: "pointer",
                }}
              >
                <span className="name">{post.fullName}</span>
              </div>
              <span className="date">1 min ago</span>
            </div>
          </div>
          <MoreHorizIcon />
        </div>
        <div className="content">
          <p>{post.rawText}</p>
          <img src={post.imgURL} alt="" />
        </div>
        <div className="info">
          <div className="item heart" onClick={handleLike}>
            {liked ? <FavoriteOutlinedIcon /> : <FavoriteBorderOutlinedIcon />}
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
        {commentOpen && <Comments />}
      </div>
    </div>
  );
};
