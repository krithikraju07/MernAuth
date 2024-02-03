import "./App.css";
import React from "react";
import { useSelector } from "react-redux";
import Header from "./components/Header";
import Login from "./components/Login.js";
import Signup from "./components/Signup.js";
import Welcome from "./components/Welcome.js";
import { Routes, Route } from "react-router-dom";

function App() {
  const isLoggedIn = useSelector((state) => state.isLoggedIn);
  console.log(isLoggedIn);
  return (
    <React.Fragment>
      <header>
        <Header />
      </header>
      <main>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          {isLoggedIn && <Route path="/user" element={<Welcome />} />}{" "}
        </Routes>
      </main>
    </React.Fragment>
  );
}

export default App;
