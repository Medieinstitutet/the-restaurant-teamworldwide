
import {
  createBrowserRouter,
} from "react-router-dom";
import Layout from "../Layout/Layout";
import ErrorPage from "../pages/ErrorPage";
import HomePage from "../pages/HomePage";
import AdminPage from "../pages/AdminPage";
import ContactPage from "../pages/ContactPage";
import GalleryPage from "../pages/GalleryPage";
import AuthRoute from "../components/AuthRoute";
import Login from "../pages/Login";
import DateTimeInfo from "../pages/DateTimeInfo";
import UserContactInfo from "../pages/UserContactInfo";


export const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "/",
        element: <HomePage />,
        index: true
      },
      {
        path: "/booking",
        element: <DateTimeInfo />,
      },
      {
        path: "/contactinfo",
        element: <UserContactInfo />,
    },
      {
        path: "/contact",
        element: <ContactPage />
      },
      {
        path: "/admin",
        element:
          <AuthRoute>
            <AdminPage />
          </AuthRoute>
      },
      {
        path: "/login",
        element: <Login />
      },
      {
        path: "/gallery",
        element: <GalleryPage />
      }
    ]
  }
])