import { Routes, Route } from "react-router-dom";
import MainLayout from "./layouts/MainLayout";
import Home from "./pages/Home";
import Sellers from "./pages/Sellers";
import SellerProfile from "./pages/SellerProfile";
import Login from "./pages/Login";
import Register from "./pages/Register";


function App() {
  return (
    <Routes>
      <Route element={<MainLayout />}>
        <Route path="/" element={<Home />} />
        <Route path="/sellers" element={<Sellers />} />
        <Route path="/sellers/:id" element={<SellerProfile />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Route>

    
    </Routes>
  );
}

export default App;
