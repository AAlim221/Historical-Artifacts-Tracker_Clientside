import React from "react";
import { Outlet } from "react-router-dom";

import Navbar from "../pages/shared/Navbar";
import Footer from "../pages/shared/Footer";

const MainLayout = () => {
  return (
    <div className="bg-[#f8f4ec] min-h-screen mb-8 ">

      {/* Navbar Full Width */}
      <Navbar />

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 min-h-[calc(100vh-300px)]">
        <Outlet />
      </main>

      {/* Footer Full Width */}
      <Footer />
    </div>
  );
};

export default MainLayout;