import React, { useState } from "react";
import "./SearchRecipeByRegion.css";
import { FaSearch } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import ImageCard from "../ImageCard";

const SearchRecipeByRegion = () => {
  const navigate = useNavigate("");
  const [searchTerm, setSearchTerm] = useState("");

  const handleSearchRecipe = async (e) => {
    e.preventDefault();
    navigate(`/recipebySubregion/${searchTerm}`);
  };
  const SearchByRegion = (region) => {
    navigate(`/recipebyRegion/${region}`);
  };
  return (
    <div
      className="search-recipe-container"
      style={{ backgroundColor: "white" }}
    >
      <h2 className="subregion-heading">
        Wanna try something from a different place
      </h2>
      <div className="search-bar-container">
        <input
          type="text"
          className="search-input"
          placeholder="Search by Category..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <FaSearch
          className="search-icon"
          style={{
            fontSize: "26px",
            marginLeft: "12px",
            cursor: "pointer",
          }}
          onClick={(e) => handleSearchRecipe(e)}
        />
      </div>
      <div>
        {" "}
        <h2
          style={{ textAlign: "left", marginLeft: "90px", marginTop: "30px" }}
        >
          Regions{" "}
        </h2>
      </div>

      {/* Integrate Image Cards */}
      <div className="image-cards-container">
        <ImageCard
          imageSrc="https://www.blueosa.com/wp-content/uploads/2020/01/the-best-top-10-indian-dishes.jpg"
          title="Indian Delight"
          description="Curry tales and samosa delights – a spice-infused journey."
          onClick={() => SearchByRegion("Indian")}
        />
        <ImageCard
          imageSrc="https://voicesfromthekitchen.org/wp-content/uploads/2021/10/Chinese-Cuisine-1.jpg"
          title="Chinese Fusion"
          description="Dumpling dances and stir-fry wonders – sweet meets savory."
          onClick={() => SearchByRegion("Chinese")}
        />
        <ImageCard
          imageSrc="https://adventures.com/media/19161/canadian-poutine-food-dish.jpg"
          title="Canadian Treat"
          description="Poutine perfection – fries, curds, and savory gravy unite."
          onClick={() => SearchByRegion("Canadian")}
        />
        <ImageCard
          imageSrc="https://www.willflyforfood.net/wp-content/uploads/2021/09/irish-food-full-irish-breakfast.jpg.webp"
          title="Irish Comfort"
          description="Hearty stew, colcannon warmth – an Emerald Isle embrace."
          onClick={() => SearchByRegion("Irish")}
        />
        <ImageCard
          imageSrc="https://imgs.search.brave.com/mUsRCwU_beffbDOAjSWrkqkQsGgFEkffKLxMnO2XOLM/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly90My5m/dGNkbi5uZXQvanBn/LzA4LzY2Lzk4Lzgy/LzM2MF9GXzg2Njk4/ODI2NF9scXZHRkdl/ZTVCRE5Yb0w5dHA3/ZXVxUnJaQ1lSZmxS/MS5qcGc"
          title="Mexican Flavors"
          description="Taco tales, salsa swirls – Mexico's fiesta of flavors."
          onClick={() => SearchByRegion("Mexican")}
        />
        <ImageCard
          imageSrc="https://imgs.search.brave.com/Y4wWDn7P0VQ1qVTOblM-odo19v7wBz42TFZEhAhFVuM/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9wcmV2/aWV3LnJlZGQuaXQv/c29tZS1mb29kLXBp/Y3R1cmVzLWZyb20t/bXktcmVjZW50LWph/cGFuLXRyaXAtdjAt/aDRtZWJqNmRwcjRk/MS5qcGc_d2lkdGg9/NjQwJmNyb3A9c21h/cnQmYXV0bz13ZWJw/JnM9Zjc2NDVlOTQx/MjdjMTRlZjg1N2Ri/MTBmZWRlODIyY2Vk/NDJiNjFiZQ"
          title="Zen on a Plate"
          description="Sushi serenity, ramen richness – Japan's artful flavors."
          onClick={() => SearchByRegion("Japanese")}
        />
        <ImageCard
          imageSrc="https://imgs.search.brave.com/YpZ4ErjxjS8_QCzNE6emTNGwQJKbj6u9mClJBpqDU4w/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9tZWRp/YS5nZXR0eWltYWdl/cy5jb20vaWQvMTE4/MTAyNTU1MC9waG90/by9jaGFyY3V0ZXJp/ZS1ib2FyZC5qcGc_/cz02MTJ4NjEyJnc9/MCZrPTIwJmM9RThf/RU5lNXNXUVlNdnp0/YldyOUkzVVJDdmYw/cmNMQ0dPXzZxU1Fm/VG1MVT0"
          title="Bon Appétit"
          description="Baguettes, brie, and beyond – France's gourmet elegance."
          onClick={() => SearchByRegion("French")}
        />
        <ImageCard
          imageSrc="https://imgs.search.brave.com/Pa4wBqhA4XNpAzFk5JEUoc3ytZOF3x9dK0pPqsRHfQY/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9tZWRp/YS5pc3RvY2twaG90/by5jb20vaWQvNjY4/ODkxNzk4L3Bob3Rv/L2l0YWxpYW4tcmVz/dGF1cmFudC1jb3Vy/c2UtbWVhbC5qcGc_/cz02MTJ4NjEyJnc9/MCZrPTIwJmM9Qmdt/MF9mMGcwZndfd0Rp/OGNaQlVKajNUY3dy/d0ZPVHh1RkQ3bzdy/OVBhTT0"
          title="Italian Elegance"
          description="Pasta simplicity, pizza perfection – la dolce vita on a plate."
          onClick={() => SearchByRegion("Italian")}
        />
      </div>
    </div>
  );
};

export default SearchRecipeByRegion;
