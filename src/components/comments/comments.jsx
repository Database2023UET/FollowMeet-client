import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../context/authContext";
import "./comments.scss";
import { useNavigate } from "react-router";
import axios from "axios";
import { getTime } from "../../utils/getTime";

const Comments = ({ postId, onAddComment }) => {
  const { currentUser } = useContext(AuthContext);
  //Temporary

  const userId = currentUser.id;

  const API_ENDPOINT = import.meta.env.VITE_API_ENDPOINT;
  const [comments, setComments] = useState([]);
  const navigate = useNavigate();

  const fetchComments = async () => {
    try {
      const res = await axios.get(
        `${API_ENDPOINT}/api/comment/getComments?postId=${postId}`
      );
      const commentsWithOwnerInfo = await Promise.all(
        res.data.map(async (comment) => {
          const commentOwnerInfos = await fetchCommentOwnerInfos(comment.ownerId);
          return { ...comment, commentOwnerInfos };
        })
      );
      setComments(commentsWithOwnerInfo);
      console.log(commentsWithOwnerInfo);
      console.log(commentsWithOwnerInfo[0].commentOwnerInfos.username);
      onAddComment(commentsWithOwnerInfo.length);
    } catch (err) {
      console.log(err);
    }
  };

  const fetchCommentOwnerInfos = async (userId) => {
    try {
      const res = await axios.get(
        `${API_ENDPOINT}/api/user/getUserInfos?userId=${userId}`
      );
      return res.data;
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchComments();
  }, []);

  useEffect(() => {
    const intervalId = setInterval(fetchComments, 5000);

    return () => clearInterval(intervalId);
  }, []);

  const handleSendComment = async () => {
    try {
      const contentText = document.querySelector(".write input").value;
      if (contentText == "") return;
      await axios.post(`${API_ENDPOINT}/api/comment/addComment`, {
        userId,
        postId,
        contentText,
      });
      document.querySelector(".write input").value = "";
      await fetchComments();
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="comments">
      <div className="write">
        <img src={currentUser.profilePicture} alt="" />
        <input type="text" placeholder="Write a comment" />
        <button onClick={handleSendComment}>Send</button>
      </div>
      {comments.map((comment) => 
        (
        <div className="comment" key={comment.ownerId}>
          <img
            src={comment.commentOwnerInfos.profilePicture}
            alt=""
            onClick={() => {
              navigate(`/profile/${comment.commentOwnerInfos.username}`);
              window.scrollTo(0, 0);
            }}
            style={{ cursor: "pointer" }}
          />
          <div className="comment__info">
            <span
              onClick={() => {
                navigate(`/profile/${comment.commentOwnerInfos.username}`);
                window.scrollTo(0, 0);
              }}
              style={{
                textDecoration: "none",
                color: "inherit",
                cursor: "pointer",
              }}
            > {comment.commentOwnerInfos.fullName}</span>
            <p>{comment.contentText}</p>
          </div>
          <span className="comment__date">{getTime(comment.createdAt)}</span>
        </div>
      ))}
    </div>
  );
};

export default Comments;