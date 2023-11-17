import axios from "axios";
import { createContext, useEffect, useState } from "react";
import PopoutAlert from "../components/popoutAlert/popoutAlert";

export const AlertContext = createContext();

export const AlertContextProvider = ({ children }) => {
  const [showPop, setShowPop] = useState(true);
  const [popInfo, setPopInfo] = useState({
    name: "Alert",
    message: "Logout",
    showButton: true,
  });

  const showAlert = (info) => {
    setPopInfo(info);
    setShowPop(true);
  };

  const hideAlert = () => {
    setPopInfo("");
    setShowPop(false);
  };
  return (
    <>
      <AlertContext.Provider value={{ showAlert, hideAlert }}>
        {children}
        {showPop && <PopoutAlert info={popInfo} />}
      </AlertContext.Provider>
    </>
  );
};
