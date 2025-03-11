import Navbar from "./component/Navbar";
import Login from "./page/Login";
import HeroSection from "./page/HeroSection";
import Register from "./page/Register";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import Search from "./page/Search";
import Plans from "./page/Plans";
import PlanDetails from "./page/PlanDetails";
import Gallery from "./component/Gallery";
import FileUpload from "./component/FileUplode";
import AuthCallback from "./component/AuthCallback";
import Footer from "./component/Footer";
import Settings from "./page/ProfileSetting";
import Dashboard from "./page/Dashboard";
import Sidebar from "./component/Profile";
import { StoreProvider } from "./context/AuthContext copy";

function App() {
  // useEffect(() => {
  //   const fetchImages = async () => {
  //     try {
  //       const response = await axios.get("http://localhost:3000/resource");
  //       setImages(response.data);
  //     } catch (error) {
  //       console.error("Error fetching images:", error);
  //     }
  //   };

  //   fetchImages();
  // }, []);
  return (
    <AuthProvider>
      <StoreProvider>
        <div className="light">
          <BrowserRouter>
            <Routes>
              <Route
                path="/"
                element={
                  <div className=" flex flex-col">
                    <Navbar />
                    <HeroSection />
                    <Gallery />
                    <Footer />
                  </div>
                }
              />
              <Route path="/auth/callback" element={<AuthCallback />} />
              <Route path="/gallery" element={<Gallery />} />
              <Route path="/upload" element={<FileUpload />} />
              <Route path="/register" element={<Register />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/setting" element={<Settings />} />
              <Route path="/plans" element={<Plans />}></Route>
              <Route path="/plans/:id" element={<PlanDetails />} />
              <Route path="/profile" element={<Sidebar />} />

              <Route path="/login" element={<Login />} />
              <Route path="/search" element={<Search />} />
            </Routes>
          </BrowserRouter>
        </div>
      </StoreProvider>
    </AuthProvider>
  );
}

export default App;
