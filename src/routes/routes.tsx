import { createBrowserRouter } from "react-router-dom";
import App from "@/App";

// Pages
import Home from "@/pages/home/Home";
import AllProducts from "@/pages/AllProducts/AllProducts";
import ProductDetails from "@/pages/ProductDetails/ProductDetails";
import About from "@/pages/About/About";
import Login from "@/pages/Login/Login";
import Register from "@/pages/Register/Register";
import CartPage from "@/pages/CartPage/CartPage";
import CheckoutPage from "@/pages/CheckoutPage/CheckoutPage";
import VerifyPayment from "@/pages/VerifyPayment/VerifyPayment";

// Auth and Dashboard Layouts
import ProtectedRoutes from "@/components/layout/ProtectedRoutes";
import RoleBasedRoute from "@/components/layout/RoleBasedRoute";
import DashboardLayout from "@/components/layout/DashboardLayout";

// Admin Dashboard Pages
import AdminDashboard from "@/pages/Dashboard/AdminDashboard/AdminDashboard";
import ManageUsers from "@/pages/Dashboard/admin/ManageUsers";
import ManageProducts from "@/pages/Dashboard/admin/ManageProducts";
import ManageOrders from "@/pages/Dashboard/admin/ManageOrders";

// User Dashboard Pages
import UserDashboard from "@/pages/Dashboard/UserDashboard/UserDashboard";
import MyOrders from "@/pages/Dashboard/user/MyOrders";
import ProfileSettings from "@/pages/Dashboard/user/ProfileSettings";
import ChangePassword from "@/pages/Dashboard/user/ChangePassword";
import AddNewProduct from "@/pages/Dashboard/admin/AddNewProduct";
import UpdateProduct from "@/pages/Dashboard/admin/UpdateProduct";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      { index: true, element: <Home /> },
      { path: "home", element: <Home /> },
      { path: "cars", element: <AllProducts /> },
      { path: "cars/:id", element: <ProductDetails /> },
      { path: "about", element: <About /> },
      { path: "login", element: <Login /> },
      { path: "register", element: <Register /> },

      // Protected Routes
      {
        path: "cart",
        element: <ProtectedRoutes />,
        children: [{ index: true, element: <CartPage /> }],
      },
      {
        path: "checkout",
        element: <ProtectedRoutes />,
        children: [{ index: true, element: <CheckoutPage /> }],
      },
      {
        path: "verifyPayment",
        element: <ProtectedRoutes />,
        children: [{ index: true, element: <VerifyPayment /> }],
      },
    ],
  },

  {
    path: "dashboard",
    element: <ProtectedRoutes />,
    children: [
      {
        element: <RoleBasedRoute allowedRoles={["admin", "user"]} />,
        children: [
          {
            path: "",
            element: <DashboardLayout />,
            children: [
              // Admin Routes
              {
                path: "admin",
                element: <RoleBasedRoute allowedRoles={["admin"]} />,
                children: [
                  { index: true, element: <AdminDashboard /> },
                  { path: "users", element: <ManageUsers /> },
                  { path: "addProduct", element: <AddNewProduct /> },
                  { path: "products", element: <ManageProducts /> },
                  { path: "products/:id", element: <UpdateProduct /> },
                  { path: "orders", element: <ManageOrders /> },
                ],
              },
              // User Routes
              {
                path: "user",
                element: <RoleBasedRoute allowedRoles={["user"]} />,
                children: [
                  { index: true, element: <UserDashboard /> },
                  { path: "orders", element: <MyOrders /> },
                  { path: "profile", element: <ProfileSettings /> },
                  { path: "change-password", element: <ChangePassword /> },
                ],
              },
            ],
          },
        ],
      },
    ],
  },
]);

export default router;
