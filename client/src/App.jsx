import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/Home.jsx";
import Navbar from "./components/Navbar.jsx";
import Footer from "./components/Footer.jsx";
import Register from "./pages/Register.jsx";
import Login from "./pages/Login.jsx";
const App = () => {
  return (
    <BrowserRouter>
      <Navbar />
      <div className=" px-4 sm:px-[5vw] md:px-[7vw] lg:px-[8vw]">
        <Routes>
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/" element={<Home />}></Route>
        </Routes>
      </div>
      <Footer />
    </BrowserRouter>
  );
};

export default App;
