import { useState } from "react";
import "./App.css";
import Header from "./components/Header.jsx";
import Home from "./components/Home.jsx";
import Sidebar from "./components/Sidebar.jsx";
import { Outlet } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  const [sideBarToggle, setSideBarToggle] = useState(false);

  return (
    <>
      {/* header */}
      <Header
        sideBarToggle={sideBarToggle}
        setSideBarToggle={setSideBarToggle}
      />

      <div className="flex h-[calc(100vh-64px)]">
        {/* sidebar  */}
        <Sidebar sideBarToggle={sideBarToggle} />
        <div className=" w-full px-4 py-4 overflow-y-auto">
          {/* changing the content of routes below */}
          <Outlet />
        </div>
        {/* toast container for toast messages */}
        <ToastContainer />
      </div>
    </>
  );
}

export default App;
