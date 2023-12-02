import { light } from "@mui/material/styles/createPalette";
import LeftBar from "./components/leftBar/leftBar";
import NavBar from "./components/navBar/navBar";
import RightBar from "./components/rightBar/rightBar";
import Home from "./pages/home/home";
import Login from "./pages/login/login";
import Profile from "./pages/profile/profile";
import Register from "./pages/register/register";
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
import Page404 from "./pages/page404/page404.jsx";

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
          }}
        >
          <LeftBar />
          <Outlet />
          <RightBar />
        </div>
      </div>
    );
  };

  const Layout404 = () => {
    document.body.className = `theme-${darkMode ? "dark" : "light"}`;

    document.body.style.backgroundColor = darkMode ? "#333" : "#f6f3f3";

    return (
      <div>
        <NavBar />
        <div>
          <Outlet />
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
    {
      path: "*",
      element: <Layout404 />,
      children: [
        {
          path: "*",
          element: <Page404 />,
        },
      ],
    },
  ]);

  return (
    <div>
      <RouterProvider router={router} />
    </div>
  );
};

export default App;
