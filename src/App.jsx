import { light } from "@mui/material/styles/createPalette";
import LeftBar from "./components/leftBar/leftBar.jsx";
import NavBar from "./components/navBar/navBar.jsx";
import RightBar from "./components/rightBar/rightBar.jsx";
import Home from "./pages/home/home.jsx";
import Login from "./pages/login/login.jsx";
import Profile from "./pages/profile/profile.jsx";
import Register from "./pages/register/register.jsx";
import "./style.scss";
import {
  createBrowserRouter,
  Navigate,
  Outlet,
  RouterProvider,
} from "react-router-dom";
import { useContext, useEffect } from "react";
import { DarkModeContext } from "./context/darkModeContext.jsx";
import { AuthContext } from "./context/authContext.jsx";

const App = () => {
  const { currentUser } = useContext(AuthContext);

  const { darkMode } = useContext(DarkModeContext);

  const Layout = () => {
    document.body.className = `theme-${darkMode ? "dark" : "light"}`;

    document.body.style.backgroundColor = darkMode ? "#333" : "#f6f3f3";

    return (
      <div>
        <NavBar />
        <div
          style={{
            display: "flex",
            paddingTop: "4.748rem",
            overflow: "hidden",
          }}
        >
          <LeftBar />
          <div style={{ flex: 10 }}>
            <Outlet />
          </div>
          <RightBar />
        </div>
      </div>
    );
  };

  const ProtectedRoute = ({ children }) => {
    if (!currentUser) {
      return <Navigate to="/login" />;
    }
    return children;
  };

  const router = createBrowserRouter([
    {
      path: "/",
      element: (
        <ProtectedRoute>
          <Layout />
        </ProtectedRoute>
      ),
      children: [
        {
          path: "/",
          element: <Home />,
        },
        {
          path: "/profile/:id",
          element: <Profile />,
        },
      ],
    },
    {
      path: "/login",
      element: <Login />,
    },
    {
      path: "/register",
      element: <Register />,
    },
  ]);

  return (
    <div>
      <RouterProvider router={router} />
    </div>
  );
};

export default App;
