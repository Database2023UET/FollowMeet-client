import axios from "axios";
import { createContext, useEffect, useState } from "react";

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
        coverPicture:
          "https://cdna.artstation.com/p/assets/images/images/020/174/718/large/amarth-chen-9.jpg?1566698233",
        id: 1,
      };

      if (inputs.username === pseudoUser.username) {
        if (inputs.password === pseudoUser.password) {
          setCurrentUser(pseudoUser);
          return;
        }
      }
      const tmpInputs = { ...inputs };
      const res = await axios.post(`${API_ENDPOINT}/api/auth/login`, tmpInputs);
      //add lastLogin later
      // console.log(res);
      if (res.status === 200) {
        const user = await axios.get(
          `${API_ENDPOINT}/api/user/getUserInfos?userId=${res.data}`
        );
        setCurrentUser(user.data);
        // setCurrentUser(tmpInputs);
        // setCurrentUser(pseudoUser);
      } else {
        // alert("Wrong username or password");
        // console.log(res.data);
        throw new Error("Wrong username or password");
      }
    } catch (err) {
      // console.log(err);
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
