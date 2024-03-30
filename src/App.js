import React from "react";
import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Details from "./components/Details";
import NavBar from "./components/NavBar";
import Home from "./components/Home";
import Login from "./components/login";
import SignUp from "./components/signup";

import Cart from "./components/Cart";
import Orders from "./components/Orders";
import Paymentunsuccessful from "./components/paymentunsuccessful";
import Paymentsuccessfull from "./components/paymentSuccessfull";
import ProfilePage from "./components/profilePage";
import Modal from "./components/modal";

function App() {
  return (
    <div className="content">
      <BrowserRouter>
        <NavBar />
        <Routes>
          <Route path={`/details`} element={<Details />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/orders" element={<Orders />} />
          <Route path="/" element={<Home />} />
          <Route path="/paymentfailed" element={<Paymentunsuccessful />} />
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/modal" element={<Modal />} />
          <Route path="/paymentsuccessfull" element={<Paymentsuccessfull />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}
export default App;
