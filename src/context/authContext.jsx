import axios from "axios";
import { createContext, useEffect, useState } from "react";
import { API_ENDPOINT } from "../../secret.json";

export const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(
    JSON.parse(localStorage.getItem("user")) || false
  );

  const login = async (inputs) => {
    try {
      const pseudoUser = {
        username: "admin",
        password: "admin",
      };

      if (inputs.username === pseudoUser.username) {
        if (inputs.password === pseudoUser.password) {
          inputs.fullName = "Admin";
          inputs.profilePicture = "https://i.imgur.com/6VBx3io.png";
          inputs.id = 1;
          setCurrentUser(inputs);
          alert("Login successfully");
          return;
        }
      }

      const res = await axios.post(`${API_ENDPOINT}/login`, inputs);
      if (res.status === 200) {
        setCurrentUser(inputs);
        alert("Login successfully");
      } else {
        alert("Wrong username or password");
        throw new Error("Wrong username or password");
      }
    } catch (err) {
      alert("Wrong username or password");
      throw new Error("Wrong username or password");
    }
  };

  const logout = () => {
    setCurrentUser(null);
    localStorage.removeItem("user");
  };

  useEffect(() => {
    localStorage.setItem("user", JSON.stringify(currentUser));
  }, [currentUser]);

  return (
    <>
      <AuthContext.Provider value={{ currentUser, login }}>
        {children}
      </AuthContext.Provider>
    </>
  );
};
