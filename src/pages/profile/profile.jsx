import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import "./profile.scss";
import Posts from "../../components/posts/posts";
import { useLocation } from "react-router";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../context/authContext";
import axios from "axios";

const Profile = () => {
  const { currentUser } = useContext(AuthContext);

  const id = Number(useLocation().pathname.split("/")[2]);

  const [profileOwner, setProfileOwner] = useState(null);

  const API_ENDPOINT = import.meta.env.VITE_API_ENDPOINT;

  useEffect(() => {
    const fetchProfileOwner = async () => {
      try {
        const res = await axios.get(
          `${API_ENDPOINT}/api/user/getUserInfos?userId=${id}`
        );
        setProfileOwner(res.data);
        console.log(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchProfileOwner();
  }, []);

  const handleFollow = () => {
    setProfileOwner((prev) => ({ ...prev, followed: !prev.followed }));
    //request to change followed status
  };

  const handleUpdateInfo = () => {
    //popup to update info
    //then request to update info
  };

  return (
    <div className="profile">
      {profileOwner && (
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
      )}
    </div>
  );
};

export default Profile;
