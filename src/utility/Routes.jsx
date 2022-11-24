import React from "react";
import { createBrowserRouter } from "react-router-dom";
import Root from "./Root";
import Home from "./../components/Home/Home";
import CategoryProducts from './../components/CategoryProduct/CategoryProducts';
import BookingModal from "../components/BookingModal/BookingModal";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    children: [
      { path: "/", element: <Home /> },
      {
        path: "/category/:id",
        element: <CategoryProducts />,
        loader: async ({params})=>fetch(`http://localhost:5000/cardProduct/${params.id}`),
      },
      {path: "/modal",element:<BookingModal/>}
    ],
  },
]);

export default router;
