import { useNavigate } from "react-router-dom";
import { useContext, useState } from "react";
import "./register.scss";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import bcrypt from "bcryptjs-react";
import { AlertContext } from "../../context/alertContext";

const API_ENDPOINT = import.meta.env.VITE_API_ENDPOINT;

const Register = () => {
  const [inputs, setInputs] = useState({
    username: "",
    email: "",
    password: "",
    fullName: "",
    gender: 1,
  });

  const { showAlert } = useContext(AlertContext);

  const handleChange = (e) => {
    if (e.target.name === "male") {
      setInputs((prev) => ({ ...prev, gender: 1 }));
    } else if (e.target.name === "female") {
      setInputs((prev) => ({ ...prev, gender: 0 }));
    } else {
      setInputs((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    }
  };
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const tmpInputs = { ...inputs };
      tmpInputs.password = bcrypt.hashSync(tmpInputs.password);
      // console.log(tmpInputs);
      const res = await axios.post(
        API_ENDPOINT + "/api/auth/register",
        tmpInputs
      );
      if (res.status === 200) {
        const info = {
          name: "Positive",
          message: res.data.message,
          showButton: false,
        };
        showAlert(info);
        setTimeout(() => {
          navigate("/login");
        }, 750);
      } else {
        const info = {
          name: "Negative",
          message: res.data.message,
          showButton: false,
        };
        showAlert(info);
        navigate("/register");
      }
    } catch (err) {
      const info = {
        name: "Negative",
        message: err.message,
        showButton: false,
      };
      navigate("/register");
    }
  };

  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="login">
      <div className="card">
        <div className="right">
          <h1>Register</h1>
          <form>
            <input
              type="text"
              placeholder="Username"
              name="username"
              onChange={handleChange}
            />
            <input
              type="email"
              placeholder="Email"
              name="email"
              onChange={handleChange}
            />
            <div className="password">
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Password"
                name="password"
                onChange={handleChange}
              />
              <FontAwesomeIcon
                className="showPassword"
                icon={showPassword ? faEye : faEyeSlash}
                onClick={() => setShowPassword(!showPassword)}
              />
            </div>
            <input
              type="text"
              placeholder="Name"
              name="fullName"
              onChange={handleChange}
            />
            <div className="gender">
              <input
                type="checkbox"
                id="Male"
                checked={inputs.gender === 1}
                name="male"
                onChange={handleChange}
                placeholder="Male"
              />
              <label for="Male" style={{ color: "grey" }}>
                Male{" "}
              </label>
              <input
                type="checkbox"
                id="Female"
                checked={inputs.gender === 0}
                name="female"
                onChange={handleChange}
                placeholder="Female"
              />
              <label for="Female" style={{ color: "grey" }}>
                Female
              </label>
            </div>
            <button onClick={handleSubmit}>Sign Up</button>
          </form>
        </div>
        <div className="left">
          <h1>Follow Meet</h1>
          <p>Connect with friends and the world around you on Follow Meet.</p>
          <span>Already have an account?</span>
          <button onClick={() => navigate("/login")}>Login</button>
        </div>
      </div>
    </div>
  );
};

export default Register;
