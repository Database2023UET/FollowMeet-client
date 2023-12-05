import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router";
import "./rightBar.scss";
import { AuthContext } from "../../context/authContext";
import axios from "axios";
import { getTime } from "../../utils/getTime";

const RightBar = () => {
  const [suggestions, setSuggestions] = useState([]);
  const [followings, setFollowings] = useState([]);
  const { currentUser } = useContext(AuthContext);
  const API_ENDPOINT = import.meta.env.VITE_API_ENDPOINT;
  const navigate = useNavigate();

  const fetchSuggestions = async () => {
    try {
      const res = await axios.get(
        `${API_ENDPOINT}/api/user/suggestUser?userId=${currentUser.id}`
      );
      setSuggestions(res.data);
    } catch (err) {
      console.log(err);
    }
  };
  const fetchFollowings = async () => {
    try {
      const res = await axios.get(
        `${API_ENDPOINT}/api/follow/getOnlineFollowings?userId=${currentUser.id}`
      );
      setFollowings(res.data);
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    fetchSuggestions();
    fetchFollowings();
  }, []);

  const handleDismiss = (e) => {
    let newNode = e.target.parentNode.parentNode;
    newNode.innerHTML = `<div className="user">
      <span>Dismissed</span>
    </div>`;
    setTimeout(() => {
      newNode.remove();
    }, 1000);
  };

  const handleFollow = async (e, suggestionId) => {
    try {
      await axios.post(`${API_ENDPOINT}/api/follow/followUser`, {
        userId: currentUser.id,
        followingId: suggestionId,
      });
    } catch (err) {
      console.log(err);
    }
    let newNode = e.target.parentNode;
    newNode.innerHTML = `
        <Button style="background-color: #5271ff !important">Followed</Button>`;
  };

  return (
    <div className="RightBar">
      <div className="container">
        <div className="item">
          <span>Suggestions For You</span>
          {suggestions.map((suggestion) => (
            <div className="user" key={suggestion.id}>
              <div
                className="userInfo"
                onClick={() => {
                  navigate(`/profile/${suggestion.username}`);
                  window.location.reload();
                }}
              >
                <img src={suggestion.profilePicture} alt="Avatar" />
                <span>{suggestion.fullName}</span>
              </div>
              <div className="buttons">
                <button onClick={(e) => handleFollow(e, suggestion.id)}>
                  Follow
                </button>
                <button onClick={(e) => handleDismiss(e)}>Dismiss</button>
              </div>
            </div>
          ))}
        </div>
        <div className="item">
          <span>Followings</span>
          {followings.map((following) => (
            <div className="user" key={following.id}>
              <div
                className="userInfo"
                onClick={() => {
                  navigate(`/profile/${following.username}`);
                  window.location.reload();
                }}
              >
                <img src={following.profilePicture} alt="Avatar" />
                <span>{following.fullName}</span>
                {getTime(following.lastLogout) === "Online" ? (
                  <div className="online" />
                ) : (
                  <div className="status_info">
                    {getTime(following.lastLogout)} ago
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>

        <div className="item">
          <span>Latest Activities</span>
          <div className="user">
            <div className="userInfo">
              <img
                src="https://i.ytimg.com/vi/UowDFX1NTB8/maxresdefault.jpg"
                alt="Avatar"
              />
              <p>
                <span>Megatron</span> liked your post
              </p>
            </div>
            <span className="status_info">3 min ago</span>
          </div>
          <div className="user">
            <div className="userInfo">
              <img
                src="https://i.ytimg.com/vi/UowDFX1NTB8/maxresdefault.jpg"
                alt="Avatar"
              />
              <p>
                <span>Megatron</span> commented on your post
              </p>
            </div>
            <span className="status_info">1 min ago</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RightBar;
