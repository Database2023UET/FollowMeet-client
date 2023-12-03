import { useContext, useEffect, useState } from "react";
import "./rightBar.scss";
import { AuthContext } from "../../context/authContext";
import axios from "axios";

const RightBar = () => {
  const [suggestions, setSuggestions] = useState([]);
  const { currentUser } = useContext(AuthContext);
  const API_ENDPOINT = import.meta.env.VITE_API_ENDPOINT;
  useEffect(() => {
    const fetchSuggestions = async () => {
      try {
        const res = await axios.get(
          `${API_ENDPOINT}/api/user/suggestUser?userId=${currentUser.id}`
        );
        setSuggestions(res.data);
        console.log(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchSuggestions();
  }, []);

  const handleDismiss = (e) => {
    //hide the user
    console.log(e.target.parentNode.parentNode);
    e.target.parentNode.parentNode.innerHTML = (
      <div class="user">
        <div className="userInfo">
          <img src="https://static.vecteezy.com/system/resources/previews/009/292/244/original/default-avatar-icon-of-social-media-user-vector.jpg" />
          <span>Dismissed</span>
        </div>
      </div>
    );
  };

  return (
    <div className="RightBar">
      <div className="container">
        <div className="item">
          <span>Suggestions For You</span>
          {suggestions.map((suggestion) => (
            <div className="user" key={suggestion.id}>
              <div className="userInfo">
                <img src={suggestion.profilePicture} alt="Avatar" />
                <span>{suggestion.fullName}</span>
              </div>
              <div className="buttons">
                <button>Follow</button>
                <button onClick={(e) => handleDismiss(e)}>Dismiss</button>
              </div>
            </div>
          ))}
        </div>
        <div className="item">
          <span>Friends</span>
          <div className="user">
            <div className="userInfo">
              <img
                src="https://i.ytimg.com/vi/UowDFX1NTB8/maxresdefault.jpg"
                alt="Avatar"
              />
              <span>Megatron</span>
              <div className="online" />
            </div>
          </div>
          <div className="user">
            <div className="userInfo">
              <img
                src="https://i.ytimg.com/vi/UowDFX1NTB8/maxresdefault.jpg"
                alt="Avatar"
              />
              <span>Megatroll</span>
            </div>
            <span className="status_info">8 min ago</span>
          </div>
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
