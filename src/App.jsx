import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import Error from "./pages/Error";
import { dashboardLoader } from "./Loaders/dashboardLoader";
import Main from "./layouts/Main";
import { mainLoader } from "./Loaders/mainLoader";
import { logoutAction } from "./action/logout";
import { ToastContainer } from "react-toastify";
import { dashboardAction } from "./action/dashboard";

const App = () => {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Main />,
      loader: mainLoader,
      hydrateFallbackElement: <h2 className="text-amber-300">Loading</h2>,
      errorElement: <Error />,
      children: [
        {
          index: true,
          element: <Dashboard />,
          loader: dashboardLoader,
          action: dashboardAction,
          hydrateFallbackElement: <h2 className="text-amber-300">Loading</h2>,
          errorElement: <Error />,
        },
        {
          path: "/logout",
          action: logoutAction,
        },
      ],
    },
  ]);
  return (
    <div className="App">
      <RouterProvider router={router} />
      <ToastContainer />
    </div>
  );
};

export default App;
