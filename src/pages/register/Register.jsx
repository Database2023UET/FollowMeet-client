import { Link } from "react-router-dom";
import { useState } from "react";
import "./Register.scss";

const Register = () => {
  const [gender, setGender] = useState("male");

  return (
    <div className="login">
      <div className="card">
        <div className="right">
          <h1>Register</h1>
          <form>
            <input type="text" placeholder="Username" />
            <input type="email" placeholder="Email" />
            <input type="password" placeholder="Password" />
            <input type="text" placeholder="Name" />
            <div className="gender">
              <input
                type="checkbox"
                id="Male"
                checked={gender === "male"}
                onChange={() => setGender("male")}
                placeholder="Male"
              />
              <label for="Male" style={{ color: "grey" }}>
                Male{" "}
              </label>
              <input
                type="checkbox"
                id="Female"
                checked={gender === "female"}
                onChange={() => setGender("female")}
                placeholder="Female"
              />
              <label for="Female" style={{ color: "grey" }}>
                Female
              </label>
            </div>
            <button>Sign Up</button>
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
