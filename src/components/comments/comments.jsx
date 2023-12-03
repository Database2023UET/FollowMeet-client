import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../context/authContext";
import "./comments.scss";
import { useNavigate } from "react-router";
import axios from "axios";
import { getTime } from "../../utils/getTime";

const Comments = ({ postId }) => {
  const { currentUser } = useContext(AuthContext);
  //Temporary

  const userId = currentUser.id;

  const API_ENDPOINT = import.meta.env.VITE_API_ENDPOINT;
  const [comments, setComments] = useState([]);

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
    } catch (err) {
      console.log(err);
    }
  };

  const fetchCommentOwnerInfos = async (userId) => {
    try {
      const res = await axios.get(
        `${API_ENDPOINT}/api/user/getUserInfos?userId=${userId}`
      );
      console.log(res.data);
      return res.data;
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchComments();
  }, []);

  const navigate = useNavigate();

  return (
    <div className="comments">
      <div className="write">
        <img src={currentUser.profilePicture} alt="" />
        <input type="text" placeholder="write a comment" />
        <button>Send</button>
      </div>
      {comments.map((comment) => 
        (
        <div className="comment" key={comment.id}>
          <img
            src={comment.commentOwnerInfos.profilePicture}
            alt=""
            onClick={() => {
              navigate(`/profile/${comment.id}`);
              window.scrollTo(0, 0);
            }}
            style={{ cursor: "pointer" }}
          />
          <div className="comment__info">
            <span
              onClick={() => {
                navigate(`/profile/${comment.id}`);
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
