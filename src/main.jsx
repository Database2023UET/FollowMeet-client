import React from "react";
import ReactDOM from "react-dom/client";
import { DarkModeContextProvider } from "./context/darkModeContext";
import { AuthContextProvider } from "./context/authContext";
import App from "./app";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <DarkModeContextProvider>
      <AuthContextProvider>
        <App />
      </AuthContextProvider>
    </DarkModeContextProvider>
  </React.StrictMode>
);
