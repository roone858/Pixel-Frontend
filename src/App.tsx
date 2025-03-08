import Navbar from "./component/Navbar";
import Login from "./page/Login";
import Home from "./page/Home";
import Register from "./page/Register";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import Search from "./page/Search";
import { useEffect, useState } from "react";
import Plans from "./page/Plans";
import PlanDetails from "./page/PlanDetails";
import Gallery from "./component/Gallery";
import FileUpload from "./component/FileUplode";
import AuthCallback from "./component/AuthCallback";
import axios from "./utils/axios";
import { ImageType } from "./types";

function App() {
  const [images, setImages] = useState<ImageType[]>([]);

  useEffect(() => {
    const fetchImages = async () => {
      try {
        const response = await axios.get("http://localhost:3000/resource");
        console.log(response.data);
        setImages(response.data);
      } catch (error) {
        console.error("Error fetching images:", error);
      }
    };

    fetchImages();
  }, []);
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
                  <Home images={images} />
                </div>
              }
            />
            <Route path="/auth/callback" element={<AuthCallback />} />
            <Route path="/gallery" element={<Gallery images={images} />} />
            <Route path="/upload" element={<FileUpload />} />
            <Route path="/register" element={<Register />} />
            <Route path="/plans" element={<Plans />}></Route>
            <Route path="/plans/:id" element={<PlanDetails />} />

            <Route path="/login" element={<Login />} />
            <Route path="/search" element={<Search />} />
          </Routes>
        </BrowserRouter>
      </div>
    </AuthProvider>
  );
}

export default App;
