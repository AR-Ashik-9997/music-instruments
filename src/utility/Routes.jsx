import React from "react";
import { createBrowserRouter } from "react-router-dom";
import Root from "./Root";
import Home from "./../components/Home/Home";
import CategoryProducts from './../components/CategoryProduct/CategoryProducts';
import SignUp from "../components/Register/SignUp";
import Login from "../components/Login/Login";
import PrivateRoute from './../components/PrivateRoute/PrivateRoute';
import AddProduct from "../components/AddProduct/AddProduct";
import DashLayout from "../components/DashboardLayout/DashLayout";
import MyProduct from "../components/MyProduct/MyProduct";
import MyBuyers from "../components/MyBuyers/MyBuyers";
import MyOrder from "../components/MyOrder/MyOrder";
import SellerInformation from "../components/Admin/SellerInformation";
import AllBuyerInfo from "../components/Admin/AllBuyerInfo";
import ReportedInfo from "../components/Admin/ReportedInfo";
import Dashboard from "../components/DashboardLayout/Dashboard";

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
      { path: "/dashboard", element: <Dashboard /> },
      { path: "/dashboard/myProduct", element: <MyProduct /> },
      { path: "/dashboard/addProduct", element: <AddProduct /> },
      { path: "/dashboard/myBuyer", element: <MyBuyers /> },
      { path: "/dashboard/myOrder", element: <MyOrder /> },
      { path: "/dashboard/all-seller", element: <SellerInformation /> },
      { path: "/dashboard/all-buyer", element: <AllBuyerInfo /> },
      { path: "/dashboard/reported-info", element: <ReportedInfo /> },
    ],
  },
]);

export default router;
