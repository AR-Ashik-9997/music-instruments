import React from "react";
import { createBrowserRouter } from "react-router-dom";
import Root from "./Root";
import Home from "./../components/Home/Home";
import CategoryProducts from './../components/CategoryProduct/CategoryProducts';
import SignUp from "../components/Register/SignUp";
import Login from "../components/Login/Login";
import PrivateRoute from './../components/PrivateRoute/PrivateRoute';
import AddProduct from "../components/AddProduct/AddProduct";
import Dashboard from "../components/Dashboard/Dashboard";
import DashLayout from "../components/DashboardLayout/DashLayout";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    children: [
      { path: "/", element: <Home /> },
      {
        path: "/category/:id",
        element: (
          <PrivateRoute>
            <CategoryProducts />
          </PrivateRoute>
        ),
        loader: async ({ params }) =>
          fetch(`http://localhost:5000/cardProduct/${params.id}`),
      },
      { path: "/addProduct", element: <AddProduct /> },
      { path: "/signup", element: <SignUp /> },
      { path: "/signIn", element: <Login /> },
    ],
  },
  {
    path: "/dashboard",
    element: (
      <PrivateRoute>
        <DashLayout />
      </PrivateRoute>
    ),
    children: [
      { path: "/dashboard/myProduct",element:<Dashboard/> }
    ],
  },
]);

export default router;
