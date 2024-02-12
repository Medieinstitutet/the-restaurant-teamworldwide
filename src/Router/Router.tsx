
import {
  createBrowserRouter,
} from "react-router-dom";
import Layout from "../Layout/Layout";

import ErrorPage from "../pages/ErrorPage";
import HomePage from "../pages/HomePage";
import BookingPage from "../pages/BookingPage";
import AdminPage from "../pages/AdminPage";
import ContactPage from "../pages/ContactPage";
import GalleryPage from "../pages/GalleryPage";

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
        element: <BookingPage />,
      },
      {
        path: "/contact",
        element: <ContactPage />
      },
      {
        path: "/admin",
        element: <AdminPage />
      },
      {
        path: "/gallery",
        element: <GalleryPage />
      }
    ]
  }
])