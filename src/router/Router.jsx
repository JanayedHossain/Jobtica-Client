import { createBrowserRouter } from "react-router";
import RootLayout from "../layout/RootLayout";
import Homepage from "../pages/home/Homepage";
import Register from "../pages/authentication/register/Register";
import Login from "../pages/authentication/login/Login";
import DashobardLayout from "../layout/DashobardLayout";
import DashboardHome from "../pages/dashboard/dashboardHome/DashboardHome";
import WorkSheet from "../pages/dashboard/employeeDashboard/Worksheet";
import EmployeeList from "../pages/dashboard/hrDashboard/EmployeeList";
import EmployeeDetails from "../pages/employee/EmployeeDetails";
import Progress from "../pages/dashboard/hrDashboard/Progress";
import HRRoute from "../routes/HRRoute";
import EmployeeRoute from "../routes/EmployeeRoute";
import PrivateRoute from "../routes/PrivateRoute";
import AllEmployees from "../pages/dashboard/adminDashboard/AllEmployees";
import Payroll from "../pages/dashboard/adminDashboard/Payroll";
import AdminRoute from "../routes/AdminRoute";
import PaymentHistory from "../pages/dashboard/employeeDashboard/PaymentHistory";
import NotFound from "../pages/notfound/NotFound";
import ContactUs from "../pages/contact/ContactUs";
import Messages from "../pages/dashboard/adminDashboard/Messages";
import AllFeatures from "../pages/all-features/AllFeatures";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: RootLayout,
    errorElement:<NotFound/>,
    children: [
      {
        index: true,
        Component: Homepage,
      },
      {
        path: "register",
        Component: Register,
      },
      {
        path: "login",
        Component: Login,
      },
      {
        path: "contact-us",
        Component: ContactUs,
      },
      {
        path: "all-features",
        Component:AllFeatures,
      },
    ],
  },
  {
    path: "/dashboard",
    errorElement:<NotFound/>,
    element: (
      <PrivateRoute>
        <DashobardLayout />
      </PrivateRoute>
    ),
    children: [
      {
        index: true,
        Component: DashboardHome,
      },
      {
        path: "work-sheet",
        element: (
          <EmployeeRoute>
            <WorkSheet />
          </EmployeeRoute>
        ),
      },
      {
        path: "payment-history",
        element: (
          <EmployeeRoute>
            <PaymentHistory />
          </EmployeeRoute>
        ),
      },
      {
        path: "employee-list",
        element: (
          <HRRoute>
            <EmployeeList />
          </HRRoute>
        ),
      },
      {
        path: "progress",
        element: (
          <HRRoute>
            <Progress />
          </HRRoute>
        ),
      },
      {
        path: "details/:id",
        element: (
          <HRRoute>
            <EmployeeDetails />
          </HRRoute>
        ),
      },
      {
        path: "all-employee-list",
        element: (
          <AdminRoute>
            <AllEmployees />
          </AdminRoute>
        ),
      },
      {
        path: "payroll",
        element: (
          <AdminRoute>
            <Payroll />
          </AdminRoute>
        ),
      },
      {
        path: "messages",
        element: (
          <AdminRoute>
            <Messages/>
          </AdminRoute>
        ),
      },
    ],
  },

]);
