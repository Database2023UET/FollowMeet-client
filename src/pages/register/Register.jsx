import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import "./Register.scss";
import axios from "axios";
import {API_ENDPOINT} from "../../../secret.json";

const Register = () => {
  const [inputs, setInputs] = useState({
    username: "",
    email: "",
    password: "",
    fullName: "",
    gender: 1,
  });

  const handleChange = (e) => {
    if (e.target.name === "male") {
      setInputs((prev) => ({ ...prev, gender: 1 }));
    } else if (e.target.name === "female") {
      setInputs((prev) => ({ ...prev, gender: 0 }));
    } else {
      setInputs((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    }
  };

  const [Err, setErr] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post(API_ENDPOINT + "/register", inputs);
      if (res.status === 200) {
        alert("Register Successfully");
        navigate("/login");
      } else {
        alert(res.data);
        navigate("/register");
      }
    } catch(err) {
      alert(err.response.data);
      navigate("/register");
    }
  };

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
            <input
              type="password"
              placeholder="Password"
              name="password"
              onChange={handleChange}
            />
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
          <Link to="/login">
            <button>Login</button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Register;
