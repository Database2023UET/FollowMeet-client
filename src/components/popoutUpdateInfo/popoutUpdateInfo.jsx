import { useContext } from "react";
import { UpdateInfoContext } from "../../context/updateInfoContext";
import { faCheckCircle } from "@fortawesome/free-regular-svg-icons";
import { faTimesCircle } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { AlertContext } from "../../context/alertContext";

const API_ENDPOINT = import.meta.env.VITE_API_ENDPOINT;

const PopoutUpdateInfo = ({ }) => {

  const navigate = useNavigate();
  const { showAlert, hideAlert } = useContext(AlertContext);

  const currentUser = JSON.parse(localStorage.getItem("user"));

  const handleSubmit = async (e) => {
    e.preventDefault();
    let messageFailed = "";
    const username = document.getElementById("username").value;
    const name = document.getElementById("name").value;
    const email = document.getElementById("email").value;
    const data = {
      userId : currentUser.id,
      username: username,
      name: name,
      email: email,
    };
    if (!username) delete data.username;
    if (!name) delete data.name;
    if (!email) delete data.email;
    try {
      await axios.post(`${API_ENDPOINT}/api/user/updateInfo`, data);
    } catch (err) {
      messageFailed = err.response.data;
    }
    hidePopout();

    try {
      const res = await axios.get(
        `${API_ENDPOINT}/api/user/getUserInfos?userId=${currentUser.id}`
      );
      localStorage.setItem("user", JSON.stringify(res.data));
    } catch (err) {
      currentUser.username = username || currentUser.username;
      currentUser.fullName = name || currentUser.fullName;
      currentUser.email = email || currentUser.email;
    }

    console.log(messageFailed);

    if (messageFailed === "") {
      const info = {
        name: "Positive",
        message: "Update successfully!",
        showButton: false,
      };
      showAlert(info);
      setTimeout(() => {
        hideAlert();
      }, 750);
      if (username) {
        navigate(`/profile/${username}`);
      }
    } else {
      const info = {
        name: "Negative",
        message: messageFailed,
        showButton: false,
      };
      showAlert(info);
    }
  }

  const { hidePopout } = useContext(UpdateInfoContext);
  return (
    <div className="popoutUpdateInfo">
      <div className="background" onClick={hidePopout} />
      <div className="alert">
        <h1>Update Profile Form</h1>
        <div className="container">
            <div className="cta-form">
            <h2>Fill out the form to update your profile!</h2> 
            <h3>Leave it blank if you do not want to change</h3>
            </div>
            <form action="" className="form">
            
            <input type="text" placeholder="Username" className="form__input" id="username"/>
            <label htmlFor="username" className="form__label">Username</label>

            <input type="text" placeholder="Name" className="form__input" id="name"/>
            <label htmlFor="name" className="form__label">Name</label>

            <input type="email" placeholder="Email" className="form__input" id="email"/>
            <label htmlFor="email" className="form__label">Email</label>
            
            <div className="buttons-container">
              <button className="button-arounder" onClick={handleSubmit}>Submit</button>
            </div>
            </form>
        </div>
      </div>
    </div>
  );
};
  
export default PopoutUpdateInfo;
  
