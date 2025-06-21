import React from "react";
import {
  BrowserRouter,
  Routes,
  Route,
  useNavigationType,
  useLocation,
} from "react-router-dom";
import Users from "./components/Users";
import Home from "./components/Home";
import Nav from "./components/Nav";
import Contact from "./components/Contact/Contact";
import Footer from "./components/Footer";
import RecipeProfile from "./components/RecipeProfile";
import Ingredients from "./components/Ingredients/Ingredients";
import SearchRecipeByRegion from "./components/RecipeByRegion/SearchRecipeByRegion";
import SubRegion from "./components/SubRegion";
import RecipeByRegion from "./components/RecipeByRegion";
import Favorites from "./components/Favourites";
import Cart from "./components/cart";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  return (
    <div className="full-container">
      <ToastContainer />
      <BrowserRouter>
        <Nav />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Users />} />
          <Route path="/signup" element={<Users />} />
          <Route path="/contactus" element={<Contact />} />
          <Route path="/ingredients" element={<Ingredients />} />
          <Route path="/favourites" element={<Favorites />} />
          <Route path="/cart" element={<Cart />} />
          {/* <Route path="/similar/:id" element={<SimilarRecipes />} /> */}
          <Route path="/recipe" element={<SearchRecipeByRegion />} />
          <Route path="/recipe/:id" element={<RecipeProfile />} />
          <Route path="/recipeIns/:id" element={<Ingredients />} />
          <Route path="/recipebySubregion/:category" element={<SubRegion />} />
          <Route path="/recipebyRegion/:Region" element={<RecipeByRegion />} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </div>
  );
}

export default App;
