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
import MyOrder from "../components/MyOrder/MyOrder";
import SellerInformation from "../components/Admin/SellerInformation";
import AllBuyerInfo from "../components/Admin/AllBuyerInfo";
import ReportedInfo from "../components/Admin/ReportedInfo";
import Dashboard from "../components/DashboardLayout/Dashboard";
import AdminRoute from "../components/PrivateRoute/AdminRoute";
import SellerRoute from "../components/PrivateRoute/SellerRoute";
import Payment from "../components/Payment/Payment";
import ErrorPage from "./ErrorPage";
import Blogs from "../components/Blog/Blogs";
import AllCategory from "../components/All Category/AllCategory";


const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    errorElement:<ErrorPage/>,
    children: [
      { path: "/", element: <Home /> },
      { path: "/all-category", element: <AllCategory /> },
      {
        path: "/category/:id",
        element: (
          <PrivateRoute>
            <CategoryProducts />
          </PrivateRoute>
        ),
        loader: async ({ params }) =>
          fetch(`https://music-data-six.vercel.app/cardProduct/${params.id}`),
      },
      { path: "/blogs", element: <Blogs /> },
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
    errorElement:<ErrorPage/>,
    children: [
      { path: "/dashboard", element: <Dashboard /> },
      { path: "/dashboard/myProduct", element: <SellerRoute><MyProduct /></SellerRoute>},
      { path: "/dashboard/addProduct", element:<SellerRoute> <AddProduct /></SellerRoute> },      
      { path: "/dashboard/myOrder", element: <MyOrder /> },
      { path: "/dashboard/payment/:id", element: <Payment></Payment>,loader:async ({params})=>fetch(`https://music-data-six.vercel.app/payment/${params.id}`)},
      { path: "/dashboard/all-seller", element: <AdminRoute><SellerInformation /></AdminRoute> },
      { path: "/dashboard/all-buyer", element: <AdminRoute><AllBuyerInfo /></AdminRoute> },
      { path: "/dashboard/reported-info", element: <AdminRoute><ReportedInfo /></AdminRoute> },
      
    ],
  },
]);

export default router;
