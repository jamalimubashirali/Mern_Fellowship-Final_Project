import {
  Login,
  Registration,
  Dashboard,
  Tasks,
  Leads,
  Customer,
  Deals,
} from "./components";
import { createBrowserRouter, Route, RouterProvider } from "react-router-dom";
import Layout from "./Layout";
import { getCustomers } from "./components/Customers/Customer";
import { leadsData } from "./components/Lead Management/Leads";
import { taskLoader } from "./components/Task Management/Tasks";
const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      { path: "", element: <Dashboard /> },
      {
        path: "/customers",
        element: <Customer />,
        loader : getCustomers
      },
      { path: "/tasks", element: <Tasks /> , loader : taskLoader },
      { path: "/leads", element: <Leads /> ,
        loader : leadsData
      },
      { path: "/deals", element: <Deals /> },
    ],
  },
  { path: "/login", element: <Login /> },
  { path: "/register", element: <Registration /> },
]);

function App() {
  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

export default App;
