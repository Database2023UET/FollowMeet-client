import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import DarkModeOutlinedIcon from "@mui/icons-material/DarkModeOutlined";
import WbSunnyOutlinedIcon from "@mui/icons-material/WbSunnyOutlined";
import GridViewOutlinedIcon from "@mui/icons-material/GridViewOutlined";
import NotificationsOutlinedIcon from "@mui/icons-material/NotificationsOutlined";
import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";
import PersonOutlinedIcon from "@mui/icons-material/PersonOutlined";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import Logo from "../../img/Logo.png";
import { useNavigate } from "react-router-dom";
import { DarkModeContext } from "../../context/darkModeContext";
import { useContext } from "react";
import "./navBar.scss";
import { AuthContext } from "../../context/authContext";

const NavBar = () => {
  const { toggle, darkMode } = useContext(DarkModeContext);
  const { currentUser } = useContext(AuthContext);

  const navigate = useNavigate();
  return (
    <div className="NavBar">
      <div className="navLeft">
        <img
          src={Logo}
          className="logo"
          alt="Logo"
          onClick={() => {
            navigate("/");
            window.scrollTo(0, 0);
          }}
        />
        <HomeOutlinedIcon
          onClick={() => {
            navigate("/");
            window.scrollTo(0, 0);
          }}
          className="NavButton"
        />
        {!darkMode ? (
          <DarkModeOutlinedIcon className="NavButton" onClick={toggle} />
        ) : (
          <WbSunnyOutlinedIcon className="NavButton" onClick={toggle} />
        )}
        <GridViewOutlinedIcon className="NavButton" />
        <div className="search">
          <SearchOutlinedIcon className="NavButton" />
          <input type="text" placeholder="Search..." />
        </div>
      </div>
      <div className="navRight">
        <PersonOutlinedIcon
          className="NavButton"
          onClick={() => {
            navigate(`/profile/${currentUser.id}`);
            window.scrollTo(0, 0);
          }}
        />
        <EmailOutlinedIcon />
        <NotificationsOutlinedIcon />
        <div className="user">
          <img
            src={currentUser.profilePicture}
            alt="Avatar"
            style={{ cursor: "pointer" }}
            onClick={() => {
              navigate(`/profile/${currentUser.id}`);
              window.scrollTo(0, 0);
            }}
          />
          <span>{currentUser.fullName}</span>
        </div>
      </div>
    </div>
  );
};

export default NavBar;
