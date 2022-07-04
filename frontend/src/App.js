import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
// import { ToastContainer } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";
import Header from "./components/Header";
import EmployeeDashboard from "./pages/EmployeeDashboard";
import EmployeeRegister from "./pages/EmployeeRegister";
import ManagerDashboard from "./pages/ManagerDashboard";
import ManagerRegister from "./pages/ManagerRegister";
import LandingPage from "./pages/LandingPage";
import Login from "./pages/Login";
import Register from "./pages/Register";
import { useSelector } from "react-redux";

function App() {
  const { user } = useSelector((state) => state.auth);

  return (
    <>
      <Router>
        <div className="container">
          <Header />
          <Routes>
            <Route
              path="/"
              element={
                !user ? (
                  <LandingPage />
                ) : user.role === "Manager" ? (
                  <ManagerDashboard />
                ) : (
                  <EmployeeDashboard />
                )
              }
            />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/register/employee" element={<EmployeeRegister />} />
            <Route path="/register/manager" element={<ManagerRegister />} />
          </Routes>
        </div>
      </Router>
    </>
  );
}

export default App;
