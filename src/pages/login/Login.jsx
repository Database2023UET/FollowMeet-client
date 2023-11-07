import { Link, useNavigate } from "react-router-dom";
import "./Login.scss";
import { AuthContext } from "../../context/AuthContext.jsx";
import { useContext, useState } from "react";
import axios from "axios";
import { API_ENDPOINT } from "../../../secret.json";

const Login = () => {
  const [inputs, setInputs] = useState({
    username: "",
    password: "",
  });

  const { login } = useContext(AuthContext);

  const [Err, setErr] = useState(false);

  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      await login(inputs);
      navigate("/");
    } catch(err) {
      setErr(true);
      navigate("/login");
    }
  };

  const handleChange = (e) => {
    setInputs((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  return (
    <div className="login">
      <div className="card">
        <div className="left">
          <h1>Follow Meet</h1>
          <p>Connect with friends and the world around you on Follow Meet.</p>
          <span>Don't have an account?</span>
          <Link to="/register">
            <button>Register</button>
          </Link>
        </div>
        <div className="right">
          <h1>Login</h1>
          <form>
            <input
              type="text"
              placeholder="Username"
              name="username"
              onChange={handleChange}
            />
            <input
              type="password"
              placeholder="Password"
              name="password"
              onChange={handleChange}
            />
            <button onClick={handleLogin}>Login</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
