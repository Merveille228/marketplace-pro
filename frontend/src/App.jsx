import { Routes, Route } from "react-router-dom";
import MainLayout from "./layouts/MainLayout";
import Home from "./pages/Home";
import Sellers from "./pages/Sellers";
import Categories from "./pages/Categories";
import Contact from "./pages/Contact";
import Login from "./pages/Login";
import SellerProfile from "./pages/SellerProfile";

function App() {
  return (
    <Routes>
      <Route element={<MainLayout />}>
        <Route path="/" element={<Home />} />
        <Route path="/sellers" element={<Sellers />} />
        <Route path="/categories" element={<Categories />} />
        <Route path="/contact" element={<Contact />} />
        
      </Route>
      <Route>
        <Route path="/login" element={<Login />} />
        <Route path="/sellerProfile" element={<SellerProfile/>} />
        </Route>
    
    </Routes>
  );
}

export default App;
