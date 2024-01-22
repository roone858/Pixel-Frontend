import { setTokenInAxios } from "./utils/axios";
import Navbar from "./component/Navbar";

import Login from "./page/Login";
import Home from "./page/Home";
import Register from "./page/Register";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import { useEffect, useState } from "react";
import ImageGrid from "./component/ImageGrid";
import Search from "./page/Search";

function App() {
  setTokenInAxios("");


  return (
    <AuthProvider>
      <div className="light">
        <BrowserRouter>
          <Routes>
            <Route
              path="/"
              element={
                <div className="h-screen flex flex-col">
                  <Navbar />
                  <Home />
                </div>
              }
            />
            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<Login />} />
            <Route path="/search" element={<Search />} />
          </Routes>
        </BrowserRouter>
      </div>
    </AuthProvider>
  );
}

export default App;
