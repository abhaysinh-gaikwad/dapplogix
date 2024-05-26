import { Route, Routes } from "react-router-dom";
import Register from "../components/auth/Register";
import Login from "../components/auth/Login";
import Home from "../pages/Home";
import Nabar from "../components/Navbar";
import ProfilePage from "../components/ProfilePage";

const AllRoutes = () => {
  return (
    <div>
      <Nabar />
      <Routes>
      <Route path="/register" element={<Register />} />
      <Route path="/login" element={<Login />} />
      <Route path="/" element={<Home />} />
      <Route path="/profile" element={<ProfilePage />} />

      </Routes>
    </div>
    
  );
};
export default AllRoutes;
