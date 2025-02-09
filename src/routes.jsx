import { createHashRouter } from "react-router-dom";

import FrontendLayout from "@/layouts/FrontendLayout";
import AdminLayout from "@/layouts/AdminLayout";

import Home from "@/pages/front/Home";
import Product from "@/pages/front/Product";
import SingleProduct from "@/pages/front/SingleProduct";
import Cart from "@/pages/front/Cart";
import Login from "@/pages/front/Login";
import NotFound from "@/pages/front/NotFound";

import AdminProducts from "@/pages/admin/AdminProducts";
import AdminOrders from "@/pages/admin/AdminOrders";

export const router = createHashRouter([
  {
    path: "/",
    element: <FrontendLayout />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: "product",
        element: <Product />,
      },
      {
        path: "product/:id",
        element: <SingleProduct />,
      },
      {
        path: "cart",
        element: <Cart />,
      },
      {
        path: "login",
        element: <Login />,
      },
    ],
  },
  {
    path: "/admin",
    element: <AdminLayout />,
    children: [
      {
        path: "products",
        element: <AdminProducts />,
      },
      {
        path: "orders",
        element: <AdminOrders />,
      },
    ],
  },
  {
    path: "*",
    element: <NotFound />,
  },
]);