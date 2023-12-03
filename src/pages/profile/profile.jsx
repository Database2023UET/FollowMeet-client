import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import "./profile.scss";
import Posts from "../../components/posts/posts";
import { useNavigate, useParams, useLocation } from "react-router";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../context/authContext";
import axios from "axios";

const Profile = () => {
  const { currentUser } = useContext(AuthContext);

  const { username } = useParams();
  const location = useLocation();
  let id = new URLSearchParams(location.search).get('id');

  const [profileOwner, setProfileOwner] = useState(null);
  const [fetchError, setFetchError] = useState(false);

  const API_ENDPOINT = import.meta.env.VITE_API_ENDPOINT;

  useEffect(() => {
    const fetchData = async () => {
      if (username) {
        try {
          const res = await axios.get(
            `${API_ENDPOINT}/api/user/getUserIdByUsername?username=${username}`
          );
          id = res.data;
        } catch (err) {
          console.log(err);
        }
      }
  
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

  const navigate = useNavigate();

  if (fetchError) {
    navigate("/404");
  }

  const handleFollow = () => {
    setProfileOwner((prev) => ({ ...prev, followed: !prev.followed }));
    //request to change followed status
  };

  const handleUpdateInfo = () => {
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
                      className={
                        profileOwner.followed ? "unfollow__btn" : "follow__btn"
                      }
                      onClick={handleFollow}
                    >
                      {profileOwner.followed ? "Unfollow" : "Follow"}
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
