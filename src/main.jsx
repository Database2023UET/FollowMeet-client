import React from "react";
import ReactDOM from "react-dom/client";
import { DarkModeContextProvider } from "./context/darkModeContext";
import { AuthContextProvider } from "./context/authContext";
import App from "./app";
import { AlertContextProvider } from "./context/alertContext";
import { CloudinaryContextProvider } from "./context/cloudinaryContext";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <DarkModeContextProvider>
      <AlertContextProvider>
        <AuthContextProvider>
          <CloudinaryContextProvider>
            <App />
          </CloudinaryContextProvider>
        </AuthContextProvider>
      </AlertContextProvider>
    </DarkModeContextProvider>
  </React.StrictMode>
);
