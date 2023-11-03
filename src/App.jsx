import { light } from "@mui/material/styles/createPalette";
import LeftBar from "./components/leftBar/LeftBar";
import NavBar from "./components/navbar/Navbar";
import RightBar from "./components/rightBar/RightBar";
import Home from "./pages/home/Home";
import Login from "./pages/login/login";
import Profile from "./pages/profile/Profile";
import Register from "./pages/register/Register";
import "./style.scss";
import {
  createBrowserRouter,
  Navigate,
  Outlet,
  RouterProvider,
} from "react-router-dom";
import { useContext } from "react";
import { DarkModeContext } from "./context/darkModeContext";

function App() {
  const currentUser = true;

  const { darkMode } = useContext(DarkModeContext);

  const Layout = () => {
    return (
      <div className={`theme-${darkMode ? "dark" : "light"}`}>
        <div>
          <NavBar />
          <div style={{ display: "flex" }}>
            <LeftBar />
            <div style={{ flex: 11 }}>
              <Outlet />
            </div>
            <RightBar />
          </div>
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
}

export default App;
