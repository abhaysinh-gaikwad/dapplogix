import { Route, Routes } from "react-router-dom";
import Register from "../components/auth/Register";
// import Logout from "../components/auth/Logout";
import Login from "../components/auth/Login";
import Home from "../pages/Home";
import Nabar from "../components/Navbar";

const AllRoutes = () => {
  return (
    
    <div>
      <Nabar />
      <Routes>
      <Route path="/register" element={<Register />} />
      <Route path="/login" element={<Login />} />
      <Route path="/home" element={<Home />} />

      </Routes>
    </div>
    
  );
};
export default AllRoutes;
