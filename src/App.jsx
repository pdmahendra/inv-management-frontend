import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Home from "./pages/Home";
import People from "./pages/People";
import RawInventory from "./pages/RawInventory";
import ReadyInventory from "./pages/ReadyInventory";
import CuttingInventory from "./pages/CuttingInventory";
import Notifications from "./pages/Notifications";
import Layout from "./components/Layout.jsx";
import { Toaster } from 'react-hot-toast'; 

function App() {
  return (
    <Router>
      <Routes>
        {/* Login Route (no layout) */}
        <Route path="/login" element={<Login />} />

        {/* Routes with Layout */}
        <Route element={<Layout />}>
          <Route path="/" element={<Home />} />
          <Route path="/notifications" element={<Notifications />} />
          <Route path="/people" element={<People />} />
          <Route path="/inventory/raw" element={<RawInventory />} />
          <Route path="/inventory/cutting" element={<CuttingInventory />} />
          <Route path="/inventory/ready" element={<ReadyInventory />} />
        </Route>
      </Routes>
      <Toaster position="top-center" />
    </Router>
  );
}

export default App;
