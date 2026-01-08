import { Routes, Route } from "react-router-dom";
import MainLayout from "./layouts/MainLayout";
import Home from "./pages/Home";
import Sellers from "./pages/Sellers";
import SellerProfile from "./pages/SellerProfile";
import Categories from "./pages/Categories";
import About from "./pages/About";
import Contact from "./pages/Contact";


function App() {
  return (
    <Routes>
      <Route element={<MainLayout />}>
        <Route path="/" element={<Home />} />
        <Route path="/sellers" element={<Sellers />} />
        <Route path="/sellers/:id" element={<SellerProfile />} />
        <Route path="/categories" element={<Categories />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
      </Route>

    
    </Routes>
  );
}

export default App;
