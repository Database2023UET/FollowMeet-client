import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import "./profile.scss";
import Posts from "../../components/posts/posts";
import { useLocation } from "react-router";
import { useContext, useState } from "react";
import { AuthContext } from "../../context/authContext";

const Profile = () => {
  const { currentUser } = useContext(AuthContext);

  const id = Number(useLocation().pathname.split("/")[2]);

  const [profileOwner, setProfileOwner] = useState({
    //request to get profile owner
    //Temporary
    id: id,
    fullName: "Nguyen Van A",
    profilePicture:
      "https://fastly.picsum.photos/id/453/500/500.jpg?hmac=YXiO3MsxF_O5rVKhdSc5ySezycPBJO_AylS8hXbKmYo",
    coverPicture:
      "https://fastly.picsum.photos/id/273/1000/1000.jpg?hmac=OsetjarMnauEuUCTo6xkBfhkhgZOxrnVyrdJWkQuXiE",
    followed: false,
    bio: "Lorem ipsum dolor sit amet consectetur adipisicing elit.",
  });

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
      <div className="images">
        <img src={profileOwner.coverPicture} alt="" className="cover" />
        <img src={profileOwner.profilePicture} alt="" className="profilePic" />
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
        <Posts />
      </div>
    </div>
  );
};

export default Profile;
