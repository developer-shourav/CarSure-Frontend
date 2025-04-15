import { createBrowserRouter } from "react-router-dom";
import Login from "@/pages/Login/Login";
import Register from "@/pages/Register/Register";
import Home from "@/pages/home/Home";
import App from "@/App";
import AllProducts from "@/pages/AllProducts/AllProducts";
import About from "@/pages/About/About";
import ProductDetails from "@/pages/ProductDetails/ProductDetails";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: "/home",
        element: <Home />,
      },
      {
        path: "/cars",
        element: <AllProducts />,
      },
      {
        path: "/cars/:id",
        element: <ProductDetails />,
      },
      {
        path: "/about",
        element: <About />,
      },
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/register",
        element: <Register />,
      },
    ],
  },
]);

export default router;
