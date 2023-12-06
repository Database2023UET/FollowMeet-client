import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import "./profile.scss";
import Posts from "../../components/posts/posts";
import { useNavigate, useParams, useLocation } from "react-router";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../context/authContext";
import axios from "axios";
import { UpdateInfoContext } from "../../context/updateInfoContext";

const Profile = () => {
  const { currentUser } = useContext(AuthContext);

  const { username } = useParams();
  const location = useLocation();

  const [profileOwner, setProfileOwner] = useState(null);
  const [fetchError, setFetchError] = useState(false);
  const [isFollowed, setIsFollowed] = useState(false);
  const { showPopout, hidePopout } = useContext(UpdateInfoContext);

  const API_ENDPOINT = import.meta.env.VITE_API_ENDPOINT;

  useEffect(() => {
    const fetchData = async () => {
      const id = await fetchIdOfProfileOwner(username);
      try {
        const res = await axios.get(
          `${API_ENDPOINT}/api/user/getUserInfos?userId=${id}`
        );
        setProfileOwner(res.data);
        console.log(res.data);
      } catch (err) {
        console.log(err);
        setFetchError(true);
      }
    };
  
    fetchData();  
  }, []);

  const fetchIdOfProfileOwner = async (username) => {
    let id = new URLSearchParams(location.search).get('id');
    if (id) return id;
    try {
      const res = await axios.get(
        `${API_ENDPOINT}/api/user/getUserIdByUsername?username=${username}`
      );
      return res.data;
    } catch (err) {
      console.log(err);
    }
  };

  const fetchIsFollowed = async () => {
    const id = await fetchIdOfProfileOwner(username);
    try {
      const res = await axios.get(
        `${API_ENDPOINT}/api/follow/isFollowed?userId=${currentUser.id}&followingId=${id}`
      );
      setIsFollowed(res.data);
      console.log(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchIsFollowed();
    console.log(isFollowed);
  }, [profileOwner]);

  const navigate = useNavigate();

  if (fetchError) {
    navigate("/404");
  }

  const handleFollow = async () => {
    const id = await fetchIdOfProfileOwner(username);
    if (isFollowed) {
      await axios.post(`${API_ENDPOINT}/api/follow/unfollowUser`, {
        userId: currentUser.id,
        followingId: id,
      });
    } else {
      await axios.post(`${API_ENDPOINT}/api/follow/followUser`, {
        userId: currentUser.id,
        followingId: id,
      });
    }
    fetchIsFollowed();
  };

  const handleUpdateInfo = () => {
    showPopout(currentUser);
    //popup to update info
    //then request to update info
  };

  return (
    <>
      {profileOwner && (
        <div className="profile">
          <>
            <div className="images">
              <img src={profileOwner.coverPicture} alt="" className="cover" />
              <img
                src={profileOwner.profilePicture}
                alt=""
                className="profilePic"
              />
            </div>
            <div className="profileContainer">
              <div className="uInfo">
                <div className="left">
                  <span>{profileOwner.fullName}</span>
                </div>
                <div className="center">
                  <p>{profileOwner.bio}</p>
                </div>
                <div className="right">
                  {profileOwner.id === currentUser.id ? (
                    <button className="updateInfo" onClick={handleUpdateInfo}>
                      Update Info
                    </button>
                  ) : (
                    <button
                      className={isFollowed ? "unfollow__btn" : "follow__btn"}
                      onClick={handleFollow}
                    >
                      {isFollowed ? "Unfollow" : "Follow"}
                    </button>
                  )}
                  <EmailOutlinedIcon />
                  <MoreVertIcon />
                </div>
              </div>
              {/* <Posts /> */}
            </div>
          </>
        </div>
      )}
    </>
  );
};

export default Profile;