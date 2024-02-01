import { setTokenInAxios } from "./utils/axios";
import Navbar from "./component/Navbar";

import Login from "./page/Login";
import Home from "./page/Home";
import Register from "./page/Register";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";

import Search from "./page/Search";
import ImageGrid from "./component/ImageGrid";
import { useEffect, useState } from "react";
import PaymentForm from "./component/PaymentForm";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
const stripePromise = loadStripe(
  "pk_test_51OM8bHDLQcvajEnuuNf6qIKGtgejp1tBjhQzN5NlcjErrePK9prFIVrJNiSuJ39RhrFtZo1EU1gy1WLqLL9TORWT00hoBBBcZ5"
);
function App() {
  // setTokenInAxios("");
  const [images, setImages] = useState([]);
  useEffect(() => {
    const fetchImages = async () => {
      try {
        const response = await fetch("http://localhost:3000/resource");
        const images = await response.json();

        setImages(images);
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

                  <Home />
                  {/* <ImageGrid images={images} /> */}
                  {/* <Elements stripe={stripePromise}>
                    <PaymentForm />
                  </Elements> */}
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
