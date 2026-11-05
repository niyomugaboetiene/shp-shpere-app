import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import Navs from "./pages/Navs.jsx";
import Home from "./pages/Home.jsx";
import FlashSales from "./pages/newProducts.jsx";
import BestSeller from "./pages/BestSeller.jsx";
import LastPage from "./pages/LastPage.jsx";
import Footer from "./pages/Footer.jsx";
import OurProduct from "./pages/AllOurProduct.jsx";
import AddProduct from "./pages/AddProduct.jsx";
import WomenFashion from "./pages/WomenFashion.jsx";
import MenFashion from "./pages/MenFashion.jsx";
import Electronics from "./pages/Electronics.jsx";
import Lifestyle from "./pages/LifeStyle.jsx";
import Toys from "./pages/Toys.jsx";
import Health from "./pages/Health.jsx";
import RegisterAccount from "./pages/Register.jsx";
import LoginAccount from "./pages/Login.jsx";
import UpdateProduct from "./pages/UpdateProduct.jsx";
import SpecificUpdation from "./pages/SpecificUpdate.jsx";
import CartPage from "./pages/Cart.jsx";
import SearchResults from "./pages/SearchBar.jsx";
import AboutUs from "./pages/About.jsx";
import Contact from "./pages/Contact.jsx";
import TermsOfUse from "./pages/TermsOfUse.jsx";
import NotFound from "./pages/NotFound.jsx";

function Layout({ children }) {
  const location = useLocation();

  const hideNavAndFooter = ["/register", "/sign-up"];

  const shouldHide = hideNavAndFooter.includes(location.pathname);

  return (
    <>
      {!shouldHide && <Navs />}
      <div className="pt-32 min-h-screen flex flex-col">{children}</div>
      {!shouldHide && <Footer />}
    </>
  );
}

function App() {
  return (
    <BrowserRouter>
      <Layout>
        <Routes>
          <Route
            path="/"
            element={
              <>
                <Home />
                <FlashSales />
                <BestSeller />
                <OurProduct />
                <LastPage />
              </>
            }
          />
          <Route path="/add" element={<AddProduct />} />
          <Route path="/women" element={<WomenFashion />} />
          <Route path="/men" element={<MenFashion />} />
          <Route path="/electronics" element={<Electronics />} />
          <Route path="/lifestyle" element={<Lifestyle />} />
          <Route path="/toy" element={<Toys />} />
          <Route path="/health" element={<Health />} />
          <Route path="/register" element={<RegisterAccount />} />
          <Route path="/sign-up" element={<LoginAccount />} />
          <Route path="/update/:product_id" element={<UpdateProduct />} />
          <Route path="/updates" element={<SpecificUpdation />} />
          <Route path="/cart" element={<CartPage />} />
          <Route path="/search" element={<SearchResults />} />
          <Route path="/about" element={<AboutUs />} />
          <Route path="/terms" element={<TermsOfUse />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="*" element={<NotFound />} />

        </Routes>
      </Layout>
    </BrowserRouter>
  );
}

export default App;
