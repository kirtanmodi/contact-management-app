import { useState } from "react";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import "./App.css";
import Sidebar from "./components/Sidebar";
import Titlebar from "./components/Titlebar";

import ContactsPage from "./pages/ContactsPage";
import ChartsAndMaps from "./pages/ChartsAndMaps";

export default function App() {
  const [isCollapsed, setIsCollapsed] = useState(false);

  return (
    <>
      <Titlebar
        title="Contact App"
        isCollapsed={isCollapsed}
        setIsCollapsed={setIsCollapsed}
      />

      <div className="flex flex-row w-screen h-screen bg-gray-800 text-white ">
        <Router>
          <Sidebar isCollapsed={isCollapsed} setIsCollapsed={setIsCollapsed} />
          <Routes>
            <Route path="/" element={<ContactsPage />} />
            <Route path="/charts-and-map" element={<ChartsAndMaps />} />
          </Routes>
        </Router>
      </div>
    </>
  );
}
