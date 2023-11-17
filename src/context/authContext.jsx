import axios from "axios";
import { createContext, useEffect, useState } from "react";
import bcrypt from "bcryptjs-react";

const API_ENDPOINT = import.meta.env.VITE_API_ENDPOINT;

export const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(
    JSON.parse(localStorage.getItem("user")) || false
  );

  const login = async (inputs) => {
    // console.log(API_ENDPOINT);
    try {
      const pseudoUser = {
        username: "admin",
        password: "admin",
        fullName: "Admin",
        profilePicture: "https://i.imgur.com/6VBx3io.png",
        id: 1,
      };

      if (inputs.username === pseudoUser.username) {
        if (inputs.password === pseudoUser.password) {
          pseudoUser.password = bcrypt.hashSync(pseudoUser.password);
          setCurrentUser(pseudoUser);
          alert("Login successfully");
          return;
        }
      }
      const tmpInputs = { ...inputs };
      tmpInputs.password = bcrypt.hashSync(tmpInputs.password);
      loginWithPassword(tmpInputs);
      const res = await axios.post(`${API_ENDPOINT}/api/auth/login`, tmpInputs);
      //add lastLogin later
      // console.log(res);
      if (res.status === 200) {
        setCurrentUser(tmpInputs);
        alert("Login successfully");
      } else {
        // alert("Wrong username or password");
        // console.log(res.data);
        throw new Error("Wrong username or password");
      }
    } catch (err) {
      // console.log(err);
      alert("Wrong username or password");
      throw new Error("Wrong username or password");
    }
  };

  const logout = () => {
    setCurrentUser(null);
    localStorage.removeItem("user");
    //request logout (lastLogout)
  };

  useEffect(() => {
    localStorage.setItem("user", JSON.stringify(currentUser));
  }, [currentUser]);

  return (
    <>
      <AuthContext.Provider value={{ currentUser, login, logout }}>
        {children}
      </AuthContext.Provider>
    </>
  );
};
