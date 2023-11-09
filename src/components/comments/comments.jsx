import { useContext } from "react";
import { AuthContext } from "../../context/authContext";
import "./comments.scss";
import { useNavigate } from "react-router";

const Comments = ({ posts }) => {
  const { currentUser } = useContext(AuthContext);
  //Temporary
  const comments = [
    {
      id: 1,
      rawText:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Autem nequeaspernatur ullam aperiam. Lorem ipsum dolor sit amet consectetur adipisicing elit. Autem nequeaspernatur ullam aperiam",
      fullName: "John Doe",
      profilePicture:
        "https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    },
    {
      id: 2,
      rawText:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Autem nequeaspernatur ullam aperiam",
      fullName: "Jane Doe",
      profilePicture:
        "https://images.pexels.com/photos/1036623/pexels-photo-1036623.jpeg?auto=compress&cs=tinysrgb&w=1600",
    },
  ];

  const navigate = useNavigate();

  return (
    <div className="comments">
      <div className="write">
        <img src={currentUser.profilePicture} alt="" />
        <input type="text" placeholder="write a comment" />
        <button>Send</button>
      </div>
      {comments.map((comment) => (
        <div className="comment" key={comment.id}>
          <img
            src={comment.profilePicture}
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
            >
              {comment.fullName}
            </span>
            <p>{comment.rawText}</p>
          </div>
          <span className="comment__date">1 hour ago</span>
        </div>
      ))}
    </div>
  );
};

export default Comments;
