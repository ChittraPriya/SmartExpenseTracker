import React from "react";
import { Outlet, useLoaderData } from "react-router-dom";
import Navbar from "../components/Navbar";

const Main = () => {
  const { userName } = useLoaderData();
  return (
    <div>
      <Navbar userName={userName} />
      <main>
        <Outlet />
      </main>
    </div>
  );
};

export default Main;
