import { setTokenInAxios } from "./utils/axios";
import Navbar from "./component/Navbar";

import Login from "./page/Login";
import Home from "./page/Home";
import Register from "./page/Register";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import ImageList from "./component/ImageList";

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
          </Routes>
        </BrowserRouter>
      </div>
      <ImageList/>
    </AuthProvider>
  );
}

export default App;
